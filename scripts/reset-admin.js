require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define Schema locally
const Schema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "admin" },
    image: { type: String, default: "" },
}, { minimize: false, timestamps: true });

const AdminModel = mongoose.models.admin || mongoose.model("admin", Schema);

const checkPassword = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const admin = await AdminModel.findOne({ email: "admin@example.com" });

        if (admin) {
            console.log("Admin found.");
            const isMatch = await bcrypt.compare("password", admin.password);
            console.log(`Password match for 'password': ${isMatch}`);

            if (!isMatch) {
                console.log("Updating password to 'password'...");
                const hashedPassword = await bcrypt.hash("password", 10);
                admin.password = hashedPassword;
                await admin.save();
                console.log("Password updated.");
            }
        } else {
            console.log("Admin not found.");
        }
    } catch (error) {
        console.error("Error:", error);
    } finally {
        mongoose.disconnect();
    }
};

checkPassword();
