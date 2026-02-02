'use client'
import { assets } from '@/Assets/assets'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'

const DEFAULT_DATA = {
    title: "",
    description: "",
    category: "Startup",
    author: "Alex Bennett",
    authorImg: "/author_img.png",
};

const BlogForm = ({
    initialData = DEFAULT_DATA,
    onSubmit,
    isEditMode = false,
    buttonText = "ADD BLOG"
}) => {
    const [data, setData] = useState(initialData);
    const [image, setImage] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);

    useEffect(() => {
        // If in edit mode and initial data has an image (string URL), set it as preview
        if (isEditMode && initialData.image) {
            setPreviewUrl(initialData.image);
        }
        // Update data if initialData changes (for async fetch in Edit)
        setData(initialData);
    }, [initialData, isEditMode]);

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    }

    const onImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("category", data.category);
        formData.append("author", data.author);
        formData.append("authorImg", data.authorImg);
        // Only append image if a new file is selected
        if (image) {
            formData.append("image", image);
        }
        onSubmit(formData);
    }

    return (
        <form onSubmit={handleSubmit} className="pt-5 px-5 sm:pt-12 sm:pl-16">
            <p className='text-2xl'>Upload Thumbnail</p>
            <label htmlFor="image">
                <Image
                    className='mt-4 object-cover'
                    src={previewUrl || assets.upload_area}
                    width={140}
                    height={70}
                    alt=''
                />
            </label>
            <input onChange={onImageChange} type="file" id='image' hidden required={!isEditMode} />

            <p className='text-xl mt-4'>Blog Title</p>
            <input name='title' onChange={onChangeHandler} value={data.title} className='w-full sm:w-[500px] mt-4 px-4 py-3 border' type="text" placeholder='Type here' required />

            <p className='text-xl mt-4'>Blog Description</p>
            <textarea name='description' onChange={onChangeHandler} value={data.description} className='w-full sm:w-[500px] mt-4 px-4 py-3 border' type="text" placeholder='Type Content here' required rows={6} />

            <p className='text-xl mt-4'>Blog Category</p>
            <select name="category" onChange={onChangeHandler} value={data.category} className='w-40 mt-4 px-4 py-3 border text-gray-500'>
                <option value="Startup">Startup</option>
                <option value="Technology">Technology</option>
                <option value="Lifestyle">Lifestyle</option>
            </select>
            <br />
            <button type='submit' className='mt-8 w-40 h-12 bg-black text-white' >{buttonText}</button>
        </form>
    )
}

export default BlogForm
