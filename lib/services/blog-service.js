import BlogModel from "@/lib/models/BlogModel";
import ConnectDB from "@/lib/config/db";

import { unstable_cache } from 'next/cache';

export const getBlogs = unstable_cache(
    async (query = {}) => {
        await ConnectDB();

        const { category, search, page = 1, limit = 10 } = query;
        const skip = (page - 1) * limit;

        const filter = {};
        if (category && category !== 'All') {
            filter.category = category;
        }
        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } }
            ];
        }

        const blogs = await BlogModel.find(filter)
            .sort({ date: -1 })
            .skip(skip)
            .limit(limit);

        const total = await BlogModel.countDocuments(filter);

        return {
            blogs: JSON.parse(JSON.stringify(blogs)),
            pagination: {
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(total / limit)
            }
        };
    },
    ['blogs-list'],
    { revalidate: 60, tags: ['blogs'] }
);

export const getBlogById = async (id) => {
    await ConnectDB();
    const blog = await BlogModel.findById(id);
    if (!blog) return null;
    return JSON.parse(JSON.stringify(blog));
};
