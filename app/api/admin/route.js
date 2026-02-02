import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import AdminModel from "@/lib/models/AdminModel";
import BlogModel from "@/lib/models/BlogModel";
import ConnectDB from "@/lib/config/db";
import { UploadImage } from "@/lib/config/cloudinary";
import bcrypt from "bcryptjs";

// Load DB - moved inside handler to ensure connection
// const LoadDB = async () => {
//     await ConnectDB();
// }
// LoadDB();

export async function PUT(request) {
    await ConnectDB(); // Ensure DB is connected
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const name = formData.get("name");
    const password = formData.get("password");
    const image = formData.get("image");

    const adminId = session.user.id;
    const admin = await AdminModel.findById(adminId);

    if (!admin) {
        return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }

    const updateData = {};
    if (name) {
        updateData.name = name;
        // Sync author name in all blogs
        try {
            await BlogModel.updateMany({}, { author: name });
        } catch (error) {
            console.error("Error syncing author name:", error);
            // Not failing the request, just logging
        }
    }
    if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updateData.password = hashedPassword;
    }

    if (image && typeof image !== 'string') {
        try {
            const imageByteData = await image.arrayBuffer();
            const buffer = Buffer.from(imageByteData);
            const result = await UploadImage(buffer);
            updateData.image = result.secure_url;

            // Sync author image in all blogs
            await BlogModel.updateMany({}, { authorImg: result.secure_url });
        } catch (error) {
            console.error("Profile Update Error (Image/Sync):", error);
            // Return the specific error message for debugging
            return NextResponse.json({ error: error.message || "Image upload failed" }, { status: 500 });
        }
    }

    try {
        const updatedAdmin = await AdminModel.findByIdAndUpdate(adminId, updateData, { new: true });
        if (!updatedAdmin) {
            return NextResponse.json({ error: "Admin not found during update" }, { status: 404 });
        }
    } catch (error) {
        console.error("Profile Update Error (DB config):", error);
        return NextResponse.json({ error: "Database update failed" }, { status: 500 });
    }

    return NextResponse.json({
        success: true,
        msg: "Profile updated successfully",
        image: updateData.image,
        name: updateData.name
    });
}
