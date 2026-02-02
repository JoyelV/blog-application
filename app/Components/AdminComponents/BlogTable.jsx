'use client'
import React, { useState, useEffect, useRef } from 'react'
import BlogTableItem from '@/app/Components/AdminComponents/BlogTableItem'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const BlogTable = ({ initialBlogs }) => {
    const [blogs, setBlogs] = useState(initialBlogs);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const containerRef = useRef(null);
    const router = useRouter();

    // Update local state if props change (e.g. after router.refresh())
    useEffect(() => {
        setBlogs(initialBlogs);
        setPage(1);
        setHasMore(true);
    }, [initialBlogs]);

    const fetchMoreBlogs = async () => {
        if (loading || !hasMore) return;
        setLoading(true);
        try {
            const nextPage = page + 1;
            const response = await axios.get('/api/blog', {
                params: { page: nextPage, limit: 10 }
            });
            if (response.data.blogs && response.data.blogs.length > 0) {
                setBlogs(prev => [...prev, ...response.data.blogs]);
                setPage(nextPage);
                if (response.data.blogs.length < 10) setHasMore(false);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error("Error fetching more blogs:", error);
        } finally {
            setLoading(false);
        }
    }

    const handleScroll = () => {
        if (containerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
            if (scrollTop + clientHeight >= scrollHeight - 50) {
                fetchMoreBlogs();
            }
        }
    }

    useEffect(() => {
        const currentRef = containerRef.current;
        if (currentRef) {
            currentRef.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (currentRef) {
                currentRef.removeEventListener('scroll', handleScroll);
            }
        }
    }, [loading, hasMore]); // Re-bind if loading state changes (to capture correct state via closure or just depend on refs) 
    // Actually best to just check loading in function, but function depends on state variables.
    // Better to use a clean useEffect or useCallback, but for simple scroll this works if deps are correct.

    const deleteBlog = async (mongoId) => {
        try {
            const response = await axios.delete('/api/blog', {
                params: {
                    id: mongoId,
                }
            });
            if (response.data.success) {
                toast.success(response.data.msg);
                // Optimistic update
                setBlogs(prev => prev.filter(blog => blog._id !== mongoId));
                // Refresh server data
                router.refresh();
            } else {
                toast.error("Error deleting blog");
            }
        } catch (error) {
            toast.error("Error deleting blog");
        }
    }

    return (
        <div
            ref={containerRef}
            className='relative h-[80vh] max-w-[850px] overflow-x-auto overflow-y-auto mt-4 border border-gray scrollbar-hidden'
        >
            <table className='w-full text-sm text-gray-500'>
                <thead className='text-sm text-gray-700 text-left uppercase bg-gray-50 sticky top-0 bg-white shadow-sm z-10'>
                    <tr>
                        <th scope='col' className='hidden sm:block px-6 py-3'>
                            Author name
                        </th>
                        <th scope='col' className='px-6 py-3'>
                            Block Title
                        </th>
                        <th scope='col' className='px-6 py-3'>
                            Category
                        </th>
                        <th scope='col' className='px-6 py-3'>
                            Date
                        </th>
                        <th scope='col' className='px-6 py-3'>
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {blogs.map((item, index) => {
                        return <BlogTableItem
                            key={index}
                            mongoId={item._id}
                            title={item.title}
                            author={item.author}
                            authorImg={item.authorImg}
                            date={item.date}
                            category={item.category}
                            deleteBlog={deleteBlog}
                        />
                    })}
                </tbody>
            </table>
            {loading && <div className="text-center py-4">Loading more...</div>}
        </div>
    )
}

export default BlogTable
