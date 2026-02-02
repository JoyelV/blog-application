"use client"
import { assets } from '@/Assets/assets'
import Image from 'next/image'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import React from 'react'

const Sidebar = () => {
  return (
    <div className='flex flex-col bg-slate-100'>
      <div className='px-2 sm:pl-14 py-3 border border-black'>
        <Image src={assets.logo} width={120} alt='' />
      </div>
      <div className='w-28 sm:w-80 h-[100vh] relative py-12 border border-black'>
        <div className='w-[50%] sm:w-[80%] absolute right-0'>
          <Link href={'/admin/addProduct'} className='flex items-center border border-black gap-3 px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000]'>
            <Image src={assets.add_icon} width={28} alt='' /><p>Add Blogs</p>
          </Link>
          <Link href={'/admin/blogList'} className='mt-5 flex items-center border border-black gap-3 px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000]'>
            <Image src={assets.blog_icon} width={28} alt='' /><p>Blog List</p>
          </Link>
          <Link href={'/admin/subscriptions'} className='mt-5 flex items-center border border-black gap-3 px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000]'>
            <Image src={assets.email_icon} width={28} alt='' /><p>Subscriptions</p>
          </Link>
        </div>
        <div className='absolute bottom-20 left-0 w-full flex justify-end pr-[10%] sm:pr-[20%]'>
          <button
            onClick={() => signOut()}
            className='flex items-center border border-black gap-3 px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000] hover:bg-gray-50 transition-colors'
          >
            <p className='font-medium'>Logout</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
