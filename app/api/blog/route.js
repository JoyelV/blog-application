import ConnectDB from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import {writeFile} from 'fs/promises';

const { NextResponse } = require("next/server");

const loadDB = async ()=>{
    await ConnectDB();
}

loadDB();

export async function POST(request){
    const formData = await request.formData();
    const timestamp = Date.now();

    const image = formData.get("image");
    if (!image) {
        return Response.json({ error: "No image uploaded" }, { status: 400 });
    }
    //convert image to buffer
    const imageBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(imageBuffer);
    const path = `./public/${timestamp}/${image.name}`;
    await writeFile(path,buffer);
    const imgUrl = `${timestamp}/${image.name}`;
    console.log(imgUrl);

    const blogData = {
        title : `${formData.get("title")}`,
        description : `${formData.get("description")}`,
        category : `${formData.get("category")}`,
        author : `${formData.get("author")}`,
        img : `${imgUrl}`,
        authorImg : `${formData.get("authorImg")}`,
    }

    await BlogModel.create(blogData);

    return NextResponse.json({success:true,msg:"Blog data saved successfully"});
}

export async function GET(request){
    return NextResponse.json({msg:"API Working"});
}