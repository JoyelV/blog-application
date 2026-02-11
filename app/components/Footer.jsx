"use client"
import Link from 'next/link';
import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Facebook, Twitter, Chrome } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = React.useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!email) return;
    try {
      const formData = new FormData();
      formData.append("email", email);
      const response = await axios.post('/api/email', formData);
      if (response.data.success) {
        toast.success(response.data.msg);
        setEmail("");
      } else {
        toast.error(response.data.msg || "Error subscribing");
      }
    } catch (error) {
      toast.error(error.response?.data?.msg || "Something went wrong");
    }
  }

  return (
    <div className='flex justify-around flex-col gap-2 sm:gap-0 sm:flex-row bg-black py-10 items-center border-t border-zinc-800'>
      <div className='text-white font-bold text-xl tracking-tight'>
        Blogger<span className='text-zinc-500'>.</span>
      </div>

      <div className='flex flex-col items-center gap-2'>
        <p className='text-sm text-zinc-400'>&copy; {new Date().getFullYear()} Blogger. All rights reserved.</p>
        <form onSubmit={onSubmitHandler} className="flex gap-2">
          <input
            type="email"
            placeholder="Subscribe to newsletter"
            className="bg-zinc-900 text-zinc-200 text-xs px-3 py-1 rounded-sm border border-zinc-700 outline-none focus:border-zinc-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="bg-primary text-primary-foreground text-xs px-3 py-1 rounded-sm font-medium hover:bg-primary/90 transition-colors">
            Submit
          </button>
        </form>
      </div>

      <div className='flex gap-4 text-white'>
        <Link href="#" className="hover:text-zinc-400 transition-colors">
          <Twitter size={20} />
        </Link>
        <Link href="#" className="hover:text-zinc-400 transition-colors">
          <Facebook size={20} />
        </Link>
        <Link href="#" className="hover:text-zinc-400 transition-colors">
          <Chrome size={20} />
        </Link>
      </div>
    </div>
  )
}

export default Footer
