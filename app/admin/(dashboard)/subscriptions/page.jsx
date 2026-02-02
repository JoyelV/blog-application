'use client'
import SubsTableitem from '@/app/Components/AdminComponents/SubsTableitem'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const page = () => {
  const [emails, setEmails] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const containerRef = React.useRef(null);

  const fetchEmails = async (pageNum = 1) => {
    setLoading(true);
    try {
      const response = await axios.get('/api/email', {
        params: { page: pageNum, limit: 10 }
      });

      if (response.data.emails && response.data.emails.length > 0) {
        if (pageNum === 1) {
          setEmails(response.data.emails);
        } else {
          setEmails(prev => [...prev, ...response.data.emails]);
        }

        if (response.data.emails.length < 10) setHasMore(false);
      } else {
        if (pageNum === 1) setEmails([]);
        setHasMore(false);
      }
    } catch (error) {
      toast.error("Error fetching (subscriptions)");
    } finally {
      setLoading(false);
    }
  }

  const deleteEmails = async (mongoId) => {
    const response = await axios.delete('/api/email', {
      params: {
        id: mongoId,
      }
    });
    if (response.data.success) {
      toast.success(response.data.msg);
      // Optimistic update for UI
      setEmails(prev => prev.filter(email => email._id !== mongoId));
    } else {
      toast.error("Error");
    }
  }

  // Initial load
  useEffect(() => {
    fetchEmails(1);
  }, []);

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 50 && hasMore && !loading) {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchEmails(nextPage);
      }
    }
  }

  useEffect(() => {
    const currentRef = containerRef.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('scroll', handleScroll);
      }
    }
  }, [loading, hasMore, page]);

  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
      <h1>All Subscriptions</h1>
      <div
        ref={containerRef}
        className='relative max-w-[600px] h-[80vh] overflow-x-auto overflow-y-auto mt-4 border border-gray-400 scrollbar-hidden'
      >
        <table className='w-full text-sm text-gray-500'>
          <thead className='text-xs text-left text-gray-700 uppercase bg-gray-200 sticky top-0 bg-white z-10'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                Email Subscription
              </th>
              <th scope='col' className='hidden sm:block px-6 py-3'>
                Date
              </th>
              <th scope='col' className='px-6 py-3'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {emails.map((item, index) => {
              return <SubsTableitem key={index} mongoId={item._id} email={item.email} date={item.date} deleteEmails={deleteEmails} />
            })}
          </tbody>
        </table>
        {loading && <div className="text-center py-4">Loading more...</div>}
      </div>
    </div>
  )
}

export default page
