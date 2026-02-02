import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "admin",
    },
    image: {
        type: String,
        default: "",
    },
}, { minimize: false, timestamps: true });

const AdminModel = mongoose.models.admin || mongoose.model("admin", Schema);
export default AdminModel;
