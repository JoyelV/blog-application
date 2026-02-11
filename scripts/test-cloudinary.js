require('dotenv').config({ path: '.env' });
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const testUpload = async () => {
    console.log("Testing Cloudinary Upload...");
    console.log(`Cloud Name: ${process.env.CLOUDINARY_CLOUD_NAME}`);

    // Create a simple text file buffer to upload as a raw file or image simulation
    const buffer = Buffer.from("Test file content", 'utf-8');

    try {
        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { resource_type: 'auto', public_id: 'test_upload_' + Date.now() },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            uploadStream.end(buffer);
        });

        console.log("Upload successful!");
        console.log("URL:", result.secure_url);

        // Clean up
        await cloudinary.uploader.destroy(result.public_id);
        console.log("Test file deleted.");

    } catch (error) {
        console.error("Upload failed:", error);
    }
};

testUpload();
