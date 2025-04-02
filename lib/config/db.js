import mongoose from "mongoose";

const ConnectDB = async ()=>{
    await mongoose.connect('mongodb+srv://quickChatUser:WJjTpoNqTLbHb5l5@cluster0.9xjky.mongodb.net/blog-app');
    console.log("Connected Database");
}

export default ConnectDB;