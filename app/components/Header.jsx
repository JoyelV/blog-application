"use client"
import { assets } from '@/Assets/assets'
import axios from 'axios';
import Image from 'next/image'
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("email", email);
      const response = await axios.post('/api/email', formData);
      if (response.data.success) {
        toast.success(response.data.msg);
        setEmail("");
      } else {
        toast.error("Error subscribing");
      }
    } catch (error) {
      toast.error("Unable to subscribe. Please ensure your email is valid");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='py-5 px-5 md:px-12 lg:px-28 bg-white'>
      <div className='flex justify-between items-center'>
        <div className='w-[130px] sm:w-[180px] font-bold text-2xl tracking-tight'>
          Blogger<span className='text-primary'>.</span>
        </div>
        <Button variant="outline" className="gap-2 shadow-sm rounded-full">
          Get started <ArrowRight size={16} />
        </Button>
      </div>

      <div className='text-center my-16'>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='text-3xl sm:text-5xl font-bold tracking-tight text-primary leading-tight'
        >
          Latest Blogs & <span className='text-muted-foreground'>Insights</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className='mt-6 max-w-[600px] mx-auto text-muted-foreground text-sm sm:text-base'
        >
          Discover the latest trends in technology, startup culture, and lifestyle. Subscribe to our newsletter to stay updated.
        </motion.p>

        <motion.form
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          onSubmit={onSubmitHandler}
          className='flex gap-2 max-w-[500px] mx-auto mt-10'
        >
          <Input
            onChange={(event) => setEmail(event.target.value)}
            value={email}
            type="email"
            placeholder='Enter your email'
            className='rounded-full pl-5 border-primary/20 shadow-sm'
          />
          <Button type='submit' size="default" disabled={loading} className='rounded-full px-8'>
            {loading ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </motion.form>
      </div>
    </div>
  )
}

export default Header
