const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' }); // Try .env.local first
require('dotenv').config({ path: '.env' }); // Fallback to .env

const MONGODB_URI = process.env.MONGO_URI;

if (!MONGODB_URI) {
    console.error("Please define the MONGO_URI environment variable");
    process.exit(1);
}

const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "admin" },
    image: { type: String, default: "" },
}, { timestamps: true });

const AdminModel = mongoose.models.admin || mongoose.model("admin", adminSchema);

async function seedAdmin() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to DB");

        const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
        const adminPassword = process.env.ADMIN_PASSWORD || "securepassword123";

        const existingAdmin = await AdminModel.findOne({ email: adminEmail });
        if (existingAdmin) {
            console.log("Admin already exists");
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash(adminPassword, 10);

        await AdminModel.create({
            name: "Admin User",
            email: adminEmail,
            password: hashedPassword,
            role: "admin",
            image: "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg" // Default image
        });

        console.log("Admin created successfully");
        process.exit(0);
    } catch (error) {
        console.error("Error seeding admin:", error);
        process.exit(1);
    }
}

seedAdmin();
