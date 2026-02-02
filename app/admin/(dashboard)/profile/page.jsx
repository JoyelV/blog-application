'use client'
import { assets } from '@/Assets/assets'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import { toast } from 'react-toastify'

const Profile = () => {
    const { data: session, update } = useSession();
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        password: "",
        currentImage: ""
    });

    useEffect(() => {
        if (session?.user) {
            setData(prev => ({
                ...prev,
                name: session.user.name || "",
                currentImage: session.user.image || assets.profile_icon
            }));
        }
    }, [session]);

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData(data => ({ ...data, [name]: value }));
    }

    const onImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setData(data => ({ ...data, currentImage: URL.createObjectURL(file) }));
        }
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name);
        if (data.password) {
            formData.append("password", data.password);
        }
        if (image) {
            formData.append("image", image);
        }

        try {
            const response = await axios.put('/api/admin', formData);
            if (response.data.success) {
                toast.success(response.data.msg);
                // Update session to reflect new name/image immediately without re-login
                await update({
                    ...session,
                    user: {
                        ...session?.user,
                        name: data.name,
                        image: response.data.image || session.user.image // Ideally API should return new image URL
                    }
                });
                setImage(false);
                setData(prev => ({ ...prev, password: "" }));
            } else {
                toast.error("Error updating profile");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error updating profile");
        }
    }

    return (
        <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
            <h1 className='text-2xl font-semibold mb-6'>Admin Profile</h1>
            <form onSubmit={onSubmitHandler} className='bg-white p-8 border border-gray-200 shadow-sm max-w-md'>
                <div className='flex flex-col items-center'>
                    <label htmlFor="image">
                        <Image
                            src={data.currentImage || assets.profile_icon}
                            width={100}
                            height={100}
                            alt="Profile"
                            className='rounded-full border-4 border-gray-100 mb-4 cursor-pointer object-cover h-[100px] w-[100px]'
                        />
                    </label>
                    <input onChange={onImageChange} type="file" id="image" hidden />

                    <h2 className='text-xl font-medium'>{session?.user?.name || "Admin"}</h2>
                    <p className='text-gray-500 mb-6'>{session?.user?.role || "Administrator"}</p>

                    <div className='w-full space-y-4'>
                        <div className='border-t pt-4'>
                            <p className='text-sm text-gray-500'>Name</p>
                            <input
                                name="name"
                                type="text"
                                value={data.name}
                                onChange={onChangeHandler}
                                className='w-full border px-3 py-2 mt-1 rounded'
                            />
                        </div>
                        <div className='pt-2'>
                            <p className='text-sm text-gray-500'>New Password (Optional)</p>
                            <input
                                name="password"
                                type="password"
                                value={data.password}
                                onChange={onChangeHandler}
                                placeholder="Leave blank to keep current"
                                className='w-full border px-3 py-2 mt-1 rounded'
                            />
                        </div>
                        <div className='pt-2'>
                            <p className='text-sm text-gray-500'>Email</p>
                            <p className='font-medium bg-gray-50 px-3 py-2 rounded'>{session?.user?.email}</p>
                        </div>
                    </div>

                    <button type="submit" className='mt-8 px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors w-full'>
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Profile
