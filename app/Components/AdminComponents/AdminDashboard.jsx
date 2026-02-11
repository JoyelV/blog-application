"use client"
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AdminDashboard = ({ blogs }) => {
    // Calculate simple stats
    const totalBlogs = blogs.length;

    // Group by category
    const categoryData = blogs.reduce((acc, blog) => {
        acc[blog.category] = (acc[blog.category] || 0) + 1;
        return acc;
    }, {});

    const chartData = Object.keys(categoryData).map(key => ({
        name: key,
        blogs: categoryData[key]
    }));

    return (
        <div className='p-6 w-full'>
            <h2 className="text-3xl font-bold mb-8">Dashboard Overview</h2>

            <div className="grid gap-4 md:grid-cols-3 mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Blogs</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalBlogs}</div>
                    </CardContent>
                </Card>
                {/* Add more metric cards here (e.g. Total Views, Subscribers if we had data) */}
            </div>

            <Card className="col-span-4">
                <CardHeader>
                    <CardTitle>Blogs by Category</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                    <ResponsiveContainer width="100%" height={350}>
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis
                                dataKey="name"
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `${value}`}
                            />
                            <Tooltip
                                cursor={{ fill: 'transparent' }}
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                            />
                            <Bar dataKey="blogs" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    )
}

export default AdminDashboard
