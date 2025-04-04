import { assets } from '@/Assets/assets'
import Image from 'next/image'
import React from 'react'

const BlogTableitem = ({ authorImg, title, author, date, deleteBlog, mongoId }) => {
  const BlogDate = new Date(date);

  return (
    <tr className='bg-white border-b'>
      <td className='hidden sm:table-cell px-6 py-4 font-medium whitespace-nowrap'>
        <div className='flex items-center gap-3'>
          <Image width={40} height={40} src={authorImg || assets.profile_icon} alt='Author' className='rounded-full' />
          <p>{author || "No author"}</p>
        </div>
      </td>

      <td className='px-6 py-4'>
        {title || "No title"}
      </td>

      <td className='px-6 py-4'>
        {BlogDate.toDateString()}
      </td>

      <td className='px-6 py-4 text-red-500 cursor-pointer' onClick={() => deleteBlog(mongoId)}>
        ✕
      </td>
    </tr>
  )
}

export default BlogTableitem;
