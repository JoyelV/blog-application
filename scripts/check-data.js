const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });
require('dotenv').config({ path: '.env' });

const MONGODB_URI = process.env.MONGO_URI;

if (!MONGODB_URI) {
    console.error("Please define the MONGO_URI environment variable");
    process.exit(1);
}

const blogSchema = new mongoose.Schema({
    title: String,
    category: String,
}, { strict: false }); // Strict false to see all fields if possible

const BlogModel = mongoose.models.blog || mongoose.model("blog", blogSchema);

async function checkData() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to DB");

        const blogs = await BlogModel.find({}).limit(5);
        console.log("Found Blogs:", blogs.length);

        blogs.forEach(blog => {
            console.log(`ID: ${blog._id}`);
            console.log(`Title: ${blog.title}`);
            console.log(`Category: ${blog.category}`); // Check this value
            console.log("---");
        });

    } catch (error) {
        console.error("Error:", error);
    } finally {
        await mongoose.disconnect();
    }
}

checkData();
