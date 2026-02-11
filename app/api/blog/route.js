import ConnectDB from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import AdminModel from "@/lib/models/AdminModel";
import { UploadImage, DeleteImage, GetPublicIdFromUrl } from "@/lib/config/cloudinary";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { z } from "zod";

// Load DB
const LoadDB = async () => {
    await ConnectDB();
}
LoadDB();

// Schema
const BlogSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    category: z.string().min(1),
    author: z.string().min(1),
    authorImg: z.string().optional(),
});

export async function POST(request) {
    const session = await auth();
    console.log("Blog POST Session:", session?.user?.email); // Debug log

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    console.log("Blog POST FormData keys:", Array.from(formData.keys())); // Debug log

    const image = formData.get("image");
    if (!image) {
        return NextResponse.json({ error: "No image uploaded" }, { status: 400 });
    }

    // Validate Input
    const payload = {
        title: formData.get("title"),
        description: formData.get("description"),
        category: formData.get("category"),
        author: formData.get("author"),
        authorImg: formData.get("authorImg"),
    };

    const validation = BlogSchema.safeParse(payload);
    if (!validation.success) {
        console.log("Validation Error:", validation.error.flatten()); // Debug log
        return NextResponse.json({ error: validation.error.flatten() }, { status: 400 });
    }

    // Upload to Cloudinary
    let imgUrl = "";
    try {
        const imageByteData = await image.arrayBuffer();
        const buffer = Buffer.from(imageByteData);
        const result = await UploadImage(buffer);
        imgUrl = result.secure_url;
        console.log("Image uploaded:", imgUrl); // Debug log
    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        return NextResponse.json({ error: "Image upload failed: " + error.message }, { status: 500 });
    }

    // Fetch current admin user to get latest name/image
    const user = await AdminModel.findById(session.user.id);
    const authorName = user ? user.name : (formData.get("author") || "Admin");
    const authorImage = user ? user.image : (formData.get("authorImg") || "/author_img.png");

    const blogData = {
        ...payload,
        author: authorName,
        authorImg: authorImage,
        image: imgUrl,
    }

    const newBlog = await BlogModel.create(blogData);

    // Send email notification to subscribers
    try {
        const emailList = await import("@/lib/models/EmailModel").then(mod => mod.default.find({}));
        if (emailList.length > 0) {
            const { sendEmail } = await import("@/lib/email");
            const emails = emailList.map(sub => sub.email);
            const emailSubject = `New Blog Post: ${payload.title}`;
            const blogUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/blogs/${newBlog._id}`;
            const emailHtml = `
                <h1>New Blog Post Alert!</h1>
                <p>A new blog post titled "<strong>${payload.title}</strong>" has been published.</p>
                <p>${payload.description}</p>
                <div style="margin-top: 20px;">
                    <a href="${blogUrl}" style="background-color: #000; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Read More</a>
                </div>
                <p style="margin-top: 20px; font-size: 12px; color: #666;">Or copy this link: ${blogUrl}</p>
            `;
            // Sending individually or as bcc to avoid exposing emails
            // For simplicity/demo: Loop or Single BCC
            // Creating a promise array for better performance
            await Promise.all(emails.map(email => sendEmail(email, emailSubject, emailHtml)));
            console.log("Emails sent to subscribers");
        }
    } catch (emailError) {
        console.error("Error sending subscription emails:", emailError);
        // Not failing the blog creation if email fails
    }

    // Revalidate cache
    try {
        const { revalidateTag } = await import('next/cache');
        revalidateTag('blogs');
    } catch (err) {
        console.log("Error revalidating cache", err);
    }

    return NextResponse.json({ success: true, msg: "Blog data saved successfully" });
}

//API End point to get all blogs
export async function GET(request) {
    const blogId = request.nextUrl.searchParams.get("id");
    const page = parseInt(request.nextUrl.searchParams.get("page")) || 1;
    const limit = parseInt(request.nextUrl.searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    if (blogId) {
        const blogs = await BlogModel.findById(blogId);
        return NextResponse.json({ blogs });
    } else {
        const blogs = await BlogModel.find({})
            .sort({ date: -1 }) // Sort by date descending
            .skip(skip)
            .limit(limit);
        const total = await BlogModel.countDocuments({});

        return NextResponse.json({
            blogs,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        });
    }
}

export async function PUT(request) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const blogId = request.nextUrl.searchParams.get("id");

    if (!blogId) {
        return NextResponse.json({ error: "Blog ID required" }, { status: 400 });
    }

    const blog = await BlogModel.findById(blogId);
    if (!blog) {
        return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    const title = formData.get("title");
    const description = formData.get("description");
    const category = formData.get("category");
    const author = formData.get("author");
    const authorImg = formData.get("authorImg");
    const image = formData.get("image");

    const updateData = {
        title: title || blog.title,
        description: description || blog.description,
        category: category || blog.category,
        author: author || blog.author,
        authorImg: authorImg || blog.authorImg,
    };

    if (image && typeof image !== 'string') {
        // New image uploaded
        try {
            const imageByteData = await image.arrayBuffer();
            const buffer = Buffer.from(imageByteData);
            const result = await UploadImage(buffer);

            updateData.image = result.secure_url;

            // Delete old image if it's a Cloudinary image
            if (blog.image) {
                const publicId = GetPublicIdFromUrl(blog.image);
                if (publicId) {
                    await DeleteImage(publicId);
                }
            }
        } catch (error) {
            console.log("Error uploading new image", error);
            // Could return error, but proceeding with update might be better UX if other fields changed
        }
    }

    await BlogModel.findByIdAndUpdate(blogId, updateData);

    // Send email notification if critical fields updated
    try {
        const emailList = await import("@/lib/models/EmailModel").then(mod => mod.default.find({}));
        if (emailList.length > 0) {
            const { sendEmail } = await import("@/lib/email");
            const emails = emailList.map(sub => sub.email);
            const emailSubject = `Blog Updated: ${updateData.title}`;
            const blogUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/blogs/${blogId}`;
            const emailHtml = `
                <h1>Blog Post Updated</h1>
                <p>The blog post "<strong>${updateData.title}</strong>" has been updated.</p>
                <p>${updateData.description || 'Check out the new changes!'}</p>
                <div style="margin-top: 20px;">
                    <a href="${blogUrl}" style="background-color: #000; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Read More</a>
                </div>
                <p style="margin-top: 20px; font-size: 12px; color: #666;">Or copy this link: ${blogUrl}</p>
            `;
            await Promise.all(emails.map(email => sendEmail(email, emailSubject, emailHtml)));
            console.log("Update emails sent");
        }
    } catch (emailError) {
        console.error("Error sending update emails:", emailError);
    }

    // Revalidate cache
    try {
        const { revalidateTag } = await import('next/cache');
        revalidateTag('blogs');
    } catch (err) {
        console.log("Error revalidating cache", err);
    }

    return NextResponse.json({ success: true, msg: "Blog updated successfully" });
}

export async function DELETE(request) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const id = request.nextUrl.searchParams.get("id");
    const blog = await BlogModel.findById(id);

    if (blog && blog.image) {
        const publicId = GetPublicIdFromUrl(blog.image);
        if (publicId) {
            try {
                await DeleteImage(publicId);
            } catch (error) {
                console.error("Failed to delete image:", error);
            }
        }
    }

    await BlogModel.findByIdAndDelete(id);

    // Revalidate cache
    try {
        const { revalidateTag } = await import('next/cache');
        revalidateTag('blogs');
    } catch (err) {
        console.log("Error revalidating cache", err);
    }

    return NextResponse.json({ success: true, msg: "Blog deleted" });
}