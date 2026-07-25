import React from 'react';
import Link from 'next/link';

const ErrorPage = () => {
    return (
        <div className='flex flex-col justify-center items-center h-[80vh]'>
            <h1 className='text-2xl font-bold'>404 | This Page Could Not Be Found!</h1>
            <Link href="/" className='text-blue-800 text-md underline'>
                Go back home
            </Link>
        </div>
    )
}

export default ErrorPage;
