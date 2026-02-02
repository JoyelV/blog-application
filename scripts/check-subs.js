const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGO_URI;

if (!MONGODB_URI) {
    console.error("Please define the MONGO_URI environment variable");
    process.exit(1);
}

const emailSchema = new mongoose.Schema({
    email: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

const EmailModel = mongoose.models.email || mongoose.model("email", emailSchema);

async function checkSubscribers() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to DB");
        const count = await EmailModel.countDocuments({});
        console.log(`Total Subscribers: ${count}`);
        if (count > 0) {
            const subs = await EmailModel.find({});
            console.log("Subscribers:", subs.map(s => s.email));
        }
    } catch (error) {
        console.error("Error:", error);
    } finally {
        await mongoose.disconnect();
    }
}

checkSubscribers();
