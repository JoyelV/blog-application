'use client'
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-toastify'
import BlogForm from '@/app/components/AdminComponents/BlogForm'

const EditBlog = () => {
    const params = useParams();
    const router = useRouter();
    const [blogData, setBlogData] = useState(null);

    const fetchBlogData = async () => {
        try {
            const response = await axios.get('/api/blog', {
                params: {
                    id: params.id
                }
            });
            if (response.data.blogs) {
                setBlogData(response.data.blogs);
            }
        } catch (error) {
            toast.error("Error fetching blog data");
            console.error(error);
        }
    }

    useEffect(() => {
        fetchBlogData();
    }, [params.id]);

    const onSubmitHandler = async (formData) => {
        try {
            const response = await axios.put(`/api/blog?id=${params.id}`, formData);
            if (response.data.success) {
                toast.success(response.data.msg);
                router.push('/admin/blogList');
                router.refresh();
            } else {
                toast.error("Error updating blog");
            }
        } catch (error) {
            toast.error("Error updating blog");
            console.error(error);
        }
    }

    return (
        <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
            <h1>Edit Blog</h1>
            {blogData ? (
                <BlogForm
                    initialData={blogData}
                    onSubmit={onSubmitHandler}
                    isEditMode={true}
                    buttonText="UPDATE BLOG"
                />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}

export default EditBlog
