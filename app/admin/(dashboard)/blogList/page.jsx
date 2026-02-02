import React from 'react'
import { getBlogs } from '@/lib/services/blog-service'
import BlogTable from '@/app/Components/AdminComponents/BlogTable';

const page = async () => {
  // Fetch data directly on the server
  const { blogs } = await getBlogs();

  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
      <h1>All Blogs</h1>
      <BlogTable initialBlogs={blogs} />
    </div>
  )
}

export default page
