import ConnectDB from "@/lib/config/db";
import EmailModel from "@/lib/models/EmailModel";
import { NextResponse } from "next/server";

const LoadDB = async ()=>{
    return ConnectDB();
}

LoadDB();

//API End point to save email subscriptions
export async function POST(request){
    const formData = await request.formData();
    const emailData = {
        email : `${formData.get('email')}`,
    }
    await EmailModel.create(emailData);
    return NextResponse.json({success:true, msg:"Email Subscription saved"});
}