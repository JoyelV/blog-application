import Footer from '@/app/components/Footer';
import { assets } from '@/Assets/assets';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { getBlogById } from '@/lib/services/blog-service';
import { notFound } from 'next/navigation';
import Comments from '@/app/components/Comments';
import { Button } from '@/app/components/ui/button';
import { ArrowRight } from 'lucide-react';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const blog = await getBlogById(resolvedParams.id);
  if (!blog) return { title: 'Blog Not Found' };

  return {
    title: blog.title,
    description: blog.description.substring(0, 150), // Basic truncation for meta description
    openGraph: {
      title: blog.title,
      description: blog.description.substring(0, 150),
      images: [blog.image],
    },
  };
}


const page = async ({ params }) => {
  const resolvedParams = await params;
  const data = await getBlogById(resolvedParams.id);

  if (!data) {
    return notFound();
  }

  return (
    <>
      <div className='bg-gray-200 py-5 px-5 md:px-12 lg:px-28'>
        <div className='flex justify-between items-center'>
          <Link href='/'>
            <div className='w-[130px] sm:w-[180px] font-bold text-2xl tracking-tight text-black'>
              Blogger<span className='text-blue-600'>.</span>
            </div>
          </Link>
          <Button variant="outline" className="gap-2 shadow-sm rounded-full">
            Get started <ArrowRight size={16} />
          </Button>
        </div>
        <div className='text-center my-24'>
          <h1 className='text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto'>{data.title}</h1>
          <Image className='mx-auto mt-6 border border-white rounded-full' src={data.authorImg && data.authorImg !== '/author_img.png' ? data.authorImg : assets.profile_icon} width={60} height={60} alt='' />
          <p className='mt-1 pb-2 text-lg max-w-[740px] mx-auto'>{data.author}</p>
        </div>
      </div>
      <div className='mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10'>
        <Image className='border-4 border-white' src={data.image} width={1280} height={720} alt='' />
        <div className='blog-content' dangerouslySetInnerHTML={{ __html: data.description }}></div>

        <div className='my-24'>
          <p className='text-black font font-semibold my-4'>Share this article on social media</p>
          <div className='flex'>
            <Image src={assets.facebook_icon} width={50} alt='' />
            <Image src={assets.twitter_icon} width={50} alt='' />
            <Image src={assets.googleplus_icon} width={50} alt='' />
          </div>
        </div>
        <Comments blogId={data._id} />
      </div>
      <Footer />
    </>
  )
}

export default page
