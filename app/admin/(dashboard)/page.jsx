import React from 'react'
import AdminDashboard from '@/app/Components/AdminComponents/AdminDashboard'
import { getBlogs } from '@/lib/services/blog-service'

const page = async () => {
  const { blogs } = await getBlogs();
  return (
    <AdminDashboard blogs={blogs} />
  )
}

export default page
