"use client"
import React from 'react';
import { Button } from './ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ pagination }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { page, totalPages } = pagination;

    const handlePageChange = (newPage) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', newPage);
        router.replace(`/?${params.toString()}`, { scroll: false });
    };

    if (totalPages <= 1) return null;

    return (
        <div className='flex justify-center items-center gap-4 my-12'>
            <Button
                variant="outline"
                size="sm"
                disabled={page <= 1}
                onClick={() => handlePageChange(page - 1)}
            >
                <ChevronLeft className="h-4 w-4 mr-2" /> Previous
            </Button>
            <span className="text-sm font-medium">Page {page} of {totalPages}</span>
            <Button
                variant="outline"
                size="sm"
                disabled={page >= totalPages}
                onClick={() => handlePageChange(page + 1)}
            >
                Next <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
        </div>
    )
}

export default Pagination
