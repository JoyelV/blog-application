const cloudinary = require('cloudinary').v2;
require('dotenv').config({ path: '.env.local' });
require('dotenv').config({ path: '.env' });

console.log("Checking Cloudinary Config...");
console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME ? "Found" : "Missing");
console.log("API Key:", process.env.CLOUDINARY_API_KEY ? "Found" : "Missing");
console.log("API Secret:", process.env.CLOUDINARY_API_SECRET ? "Found" : "Missing");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

async function testUpload() {
    try {
        console.log("Attempting test upload...");
        // simple 1x1 base64 transparent gif
        const base64Image = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
        const result = await cloudinary.uploader.upload(base64Image, {
            folder: "test_verification"
        });
        console.log("✅ Upload Successful!");
        console.log("URL:", result.secure_url);

        // Clean up
        await cloudinary.uploader.destroy(result.public_id);
        console.log("✅ Cleanup Successful!");
    } catch (error) {
        console.error("❌ Upload Failed:", error.message);
        if (error.error) console.error("Details:", error.error);
    }
}

testUpload();
