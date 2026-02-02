import ConnectDB from "@/lib/config/db";
import CommentModel from "@/lib/models/CommentModel";
import { NextResponse } from "next/server";
import { z } from "zod";

const CommentSchema = z.object({
    blogId: z.string().min(1, "Blog ID is required"),
    author: z.string().min(1, "Name is required"),
    text: z.string().min(1, "Comment text is required"),
});

export async function POST(request) {
    try {
        await ConnectDB();
        const body = await request.json();

        const result = CommentSchema.safeParse(body);
        if (!result.success) {
            return NextResponse.json({ success: false, errors: result.error.flatten() }, { status: 400 });
        }

        await CommentModel.create(result.data);
        return NextResponse.json({ success: true, msg: "Comment added successfully" });
    } catch (error) {
        return NextResponse.json({ success: false, msg: "Error adding comment" }, { status: 500 });
    }
}

export async function GET(request) {
    try {
        await ConnectDB();
        const blogId = request.nextUrl.searchParams.get("blogId");

        if (!blogId) {
            return NextResponse.json({ success: false, msg: "Blog ID required" }, { status: 400 });
        }

        const comments = await CommentModel.find({ blogId }).sort({ date: -1 });
        return NextResponse.json({ success: true, comments });
    } catch (error) {
        return NextResponse.json({ success: false, msg: "Error fetching comments" }, { status: 500 });
    }
}
