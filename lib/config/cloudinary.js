import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const UploadImage = async (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { resource_type: 'auto' },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );
        uploadStream.end(fileBuffer);
    });
};

export const DeleteImage = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        return result;
    } catch (error) {
        throw error;
    }
};

// Helper to extract public ID from a Cloudinary URL
export const GetPublicIdFromUrl = (url) => {
    try {
        if (!url || !url.includes('cloudinary.com')) return null;

        // Example URL: https://res.cloudinary.com/demo/image/upload/v1570979139/folder/sample.jpg
        // Split by '/'
        const parts = url.split('/');

        // Find the index of 'upload'
        const uploadIndex = parts.indexOf('upload');
        if (uploadIndex === -1) return null;

        // Get contents after 'upload' and version (if present)
        // Public ID is everything after version until file extension
        // This is a simplified extraction and might need adjustment based on folder structure

        // Better approach: Join everything after 'upload'
        const pathParts = parts.slice(uploadIndex + 1);

        // Skip version if present (starts with 'v')
        let publicIdParts = pathParts;
        if (pathParts.length > 0 && pathParts[0].startsWith('v') && !isNaN(parseInt(pathParts[0].substring(1)))) {
            publicIdParts = pathParts.slice(1);
        }

        const publicIdWithExt = publicIdParts.join('/');
        const publicId = publicIdWithExt.split('.')[0];

        return publicId;
    } catch (error) {
        console.error("Error parsing Cloudinary URL", error);
        return null;
    }
}
