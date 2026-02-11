"use client"
import React from 'react'
import BlogItem from './BlogItem'
import { Button } from './ui/button';
import { useRouter, useSearchParams } from 'next/navigation';

const BlogList = ({ blogs, initialCategory = 'All' }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategoryChange = (category) => {
    const params = new URLSearchParams(searchParams);
    if (category === 'All') {
      params.delete('category');
    } else {
      params.set('category', category);
    }
    router.replace(`/?${params.toString()}`, { scroll: false });
  };

  const currentCategory = searchParams.get('category') || 'All';

  return (
    <div className="container mx-auto px-4 py-8">
      <div className='flex justify-center gap-4 my-10 overflow-x-auto pb-4 sm:pb-0'>
        {['All', 'Technology', 'Startup', 'Lifestyle'].map((category) => (
          <Button
            key={category}
            onClick={() => handleCategoryChange(category)}
            variant={currentCategory === category ? 'default' : 'outline'}
            className="rounded-full px-6 transition-all duration-300"
          >
            {category}
          </Button>
        ))}
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16'>
        {blogs.map((item, index) => {
          return <BlogItem
            id={item._id}
            key={index}
            image={item.image}
            title={item.title}
            description={item.description}
            category={item.category}
            date={item.date}
          />
        })}
      </div>
    </div>
  )
}

export default BlogList
