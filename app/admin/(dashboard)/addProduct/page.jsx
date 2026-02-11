'use client'
import React from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import BlogForm from '@/app/components/AdminComponents/BlogForm'

const page = () => {
  const onSubmitHandler = async (formData) => {
    try {
      const response = await axios.post('/api/blog', formData);
      if (response.data.success) {
        toast.success(response.data.msg);
        // Simple way to reset form is key change or just reload, 
        // but for now we rely on Toast and manual reset if needed or just let user navigate.
        // Ideally, we reset the form state in BlogForm or pass a reset trigger.
        // For this MVP refactor, we'll force a reload or just clear fields by re-mounting.
        window.location.reload();
      } else {
        toast.error("Error uploading");
      }
    } catch (error) {
      toast.error("Error uploading");
      console.error(error);
    }
  }

  return (
    <>
      <BlogForm onSubmit={onSubmitHandler} />
    </>
  )
}

export default page
