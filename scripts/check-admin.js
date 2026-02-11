require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define Schema locally to avoid import issues outside Next.js
const Schema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "admin" },
    image: { type: String, default: "" },
}, { minimize: false, timestamps: true });

const AdminModel = mongoose.models.admin || mongoose.model("admin", Schema);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB Connected");
    } catch (error) {
        console.error("DB Connection Error:", error);
        process.exit(1);
    }
};

const checkAdmin = async () => {
    await connectDB();

    try {
        const admins = await AdminModel.find({});
        console.log(`Found ${admins.length} admin(s).`);

        if (admins.length > 0) {
            admins.forEach(admin => {
                console.log(`- Email: ${admin.email}, Role: ${admin.role}`);
            });
        } else {
            console.log("No admin found. Creating default admin...");
            const hashedPassword = await bcrypt.hash("password", 10);
            const newAdmin = await AdminModel.create({
                name: "Admin User",
                email: "admin@example.com",
                password: hashedPassword,
                role: "admin",
                image: "/profile_icon.png"
            });
            console.log("Default admin created:");
            console.log(`Email: ${newAdmin.email}`);
            console.log(`Password: password`);
        }

    } catch (error) {
        console.error("Error:", error);
    } finally {
        mongoose.disconnect();
    }
};

checkAdmin();
