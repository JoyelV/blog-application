import ConnectDB from "@/lib/config/db";
import EmailModel from "@/lib/models/EmailModel";
import { NextResponse } from "next/server";

const LoadDB = async () => {
    return ConnectDB();
}

LoadDB();

import { z } from "zod";

const EmailSchema = z.object({
    email: z.string().email("Invalid email address"),
});

//API End point to save email subscriptions
export async function POST(request) {
    const formData = await request.formData();
    const email = formData.get('email');

    const result = EmailSchema.safeParse({ email });
    if (!result.success) {
        return NextResponse.json({ success: false, msg: "Invalid email" }, { status: 400 });
    }

    const emailData = {
        email: result.data.email,
        date: new Date()
    }

    try {
        await EmailModel.create(emailData);
        return NextResponse.json({ success: true, msg: "Email Subscription saved" });
    } catch (error) {
        if (error.code === 11000) {
            return NextResponse.json({ success: false, msg: "Email already exists" }, { status: 400 });
        }
        return NextResponse.json({ success: false, msg: "Error saving subscription" }, { status: 500 });
    }
}

//API end point to get email subscriptions
export async function GET(request) {
    const page = parseInt(request.nextUrl.searchParams.get("page")) || 1;
    const limit = parseInt(request.nextUrl.searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    const emails = await EmailModel.find({})
        .sort({ date: -1 })
        .skip(skip)
        .limit(limit);

    return NextResponse.json({ emails });
}

//API endpoint to delete Email subscriptions
export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await EmailModel.findByIdAndDelete(id);
    return NextResponse.json({ success: true, msg: "Email deleted" })
}