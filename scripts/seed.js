const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://quickChatUser:WJjTpoNqTLbHb5l5@cluster0.9xjky.mongodb.net/blog-app";

if (!MONGODB_URI) {
    console.error('Please define the MONGODB_URI environment variable inside .env.local');
    process.exit(1);
}

const BlogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    date: { type: Date, default: Date.now },
    category: { type: String, required: true },
    author: { type: String, required: true },
    authorImg: { type: String, required: true },
});

const BlogModel = mongoose.models.blog || mongoose.model('blog', BlogSchema);

const blogs = [
    {
        title: "The Future of AI in 2025",
        description: "<p>Artificial Intelligence is rapidly evolving. From LLMs to autonomous agents, the landscape is shifting...</p>",
        image: "/blog-pic-1.png", 
        category: "Technology",
        author: "Alex Bennett",
        authorImg: "/profile_icon.png",
        date: new Date('2025-01-15')
    },
    {
        title: "Startup Survival Guide",
        description: "<p>Navigating the early stages of a startup can be treacherous. Here are 5 key tips...</p>",
        image: "/blog-pic-2.png",
        category: "Startup",
        author: "Sarah Johnson",
        authorImg: "/profile_icon.png",
        date: new Date('2025-02-01')
    },
    {
        title: "Minimalism in Web Design",
        description: "<p>Less is more. User interfaces are becoming cleaner, faster, and more intuitive...</p>",
        image: "/blog-pic-3.png",
        category: "Technology",
        author: "Alex Bennett",
        authorImg: "/profile_icon.png",
        date: new Date('2025-02-10')
    },
    {
        title: "Healthy Work-Life Balance",
        description: "<p>In a remote-first world, separating work from life is harder than ever...</p>",
        image: "/blog-pic-4.png",
        category: "Lifestyle",
        author: "Emily Davis",
        authorImg: "/profile_icon.png",
        date: new Date('2025-02-20')
    },
    {
        title: "The Rise of No-Code",
        description: "<p>Building software without writing code is the new democratizing force in tech...</p>",
        image: "/blog-pic-5.png",
        category: "Technology",
        author: "Mark Smith",
        authorImg: "/profile_icon.png",
        date: new Date('2025-03-05')
    },
    {
        title: "Sustainable Living Tips",
        description: "<p>Small changes in our daily lives can have a massive impact on the environment...</p>",
        image: "/blog-pic-6.png",
        category: "Lifestyle",
        author: "Jessica Brown",
        authorImg: "/profile_icon.png",
        date: new Date('2025-03-12')
    }
];

async function seed() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        await BlogModel.deleteMany({});
        console.log('Cleared existing blogs');

        await BlogModel.insertMany(blogs);
        console.log(`Seeded ${blogs.length} blogs`);

        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seed();
