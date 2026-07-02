import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FiShoppingCart } from "react-icons/fi";

const Navbar = () => {
    return (
        <div className='flex flex-col justify-center py-3 items-center md:flex-row md:justify-between shadow'>
            <div className="logo mx-2">
                <Link href={'/'} className='cursor-pointer'>
                    <Image width={90} height={90} src={'/Logo.png'} alt='HeroImage'></Image>
                </Link>
            </div>
            <div className='nav'>
                <ul className='flex space-x-2 text-sm md:space-x-6 md:text-lg my-4 font-bold'>
                    <Link href={'/topwear'} className='cursor-pointer hover:underline'><li className=''>TopWear</li></Link>
                    <Link href={'/'} className='cursor-pointer hover:underline'><li className=''>BottomWear</li></Link>
                    <Link href={'/'} className='cursor-pointer hover:underline'><li className=''>WinterWear</li></Link>
                    <Link href={'/'} className='cursor-pointer hover:underline'><li className=''>Jackets</li></Link>
                </ul>
            </div>
            <div className="cart login mx-3">
                <FiShoppingCart className='text-3xl cursor-pointer' />
            </div>
        </div>
    )
}

export default Navbar
