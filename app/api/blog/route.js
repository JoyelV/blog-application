import ConnectDB from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import {writeFile} from 'fs/promises';
const { NextResponse } = require("next/server");
const fs = require("fs");

const LoadDB = async ()=>{
    await ConnectDB();
}

LoadDB();

//API End point to uploading blogs
export async function POST(request){
    const formData = await request.formData();
    const timestamp = Date.now();

    const image = formData.get("image");
    if (!image) {
        return Response.json({ error: "No image uploaded" }, { status: 400 });
    }
    //convert image to buffer
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);
    const path = `./public/${timestamp}_${image.name}`;
    await writeFile(path,buffer);
    const imgUrl = `/${timestamp}_${image.name}`;
    console.log(imgUrl);

    const blogData = {
        title : `${formData.get("title")}`,
        description : `${formData.get("description")}`,
        category : `${formData.get("category")}`,
        author : `${formData.get("author")}`,
        image : `${imgUrl}`,
        authorImg : `${formData.get("authorImg")}`,
    }

    await BlogModel.create(blogData);

    return NextResponse.json({success:true,msg:"Blog data saved successfully"});
}

//API End point to get all blogs
export async function GET(request){
    const blogId = await request.nextUrl.searchParams.get("id");
    if(blogId){
        const blogs = await BlogModel.findById(blogId);
        return NextResponse.json({blogs});
    }else{
        const blogs = await BlogModel.find({});
        return NextResponse.json({blogs});
    }
}

export async function DELETE(request){
    const id = await request.nextUrl.searchParams.get("id");
    const blog = await BlogModel.findById(id);
    fs.unlink(`./public${blog.image}`,()=>{

    });
    await BlogModel.findByIdAndDelete(id);
    return NextResponse.json({success:true,msg:"Blog deleted"});
}