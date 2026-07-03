import React, { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FiShoppingCart } from "react-icons/fi";
import { MdCancel } from "react-icons/md";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { FaShoppingBag } from "react-icons/fa";

const Navbar = () => {

    const ref = useRef()

    const handleSideCart = () => {
        if (ref.current.classList.contains('translate-x-full')) {
            ref.current.classList.remove('translate-x-full')
            ref.current.classList.add('translate-x-[-6px]')
        }
        else if (!ref.current.classList.contains('translate-x-full')) {
            ref.current.classList.remove('translate-x-[-6px]')
            ref.current.classList.add('translate-x-full')
        }
    }

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
                    <Link href={'/bottomwear'} className='cursor-pointer hover:underline'><li className=''>BottomWear</li></Link>
                    <Link href={'/winterwear'} className='cursor-pointer hover:underline'><li className=''>WinterWear</li></Link>
                    <Link href={'/footwear'} className='cursor-pointer hover:underline'><li className=''>FootWear</li></Link>
                </ul>
            </div>
            <div onClick={handleSideCart} className="cart login mx-3">
                <FiShoppingCart className='text-3xl cursor-pointer' />
            </div>

            <div ref={ref} className="cart absolute top-0 right-0  bg-amber-400 py-10 px-15 text-blue-950 text-shadow-black transform transition-transform translate-x-full z-10 h-full">

                <h2 className='font-bold text-2xl relative -top-1.5 text-center'>Shopping Cart</h2>
                <span onClick={handleSideCart} className='absolute right-3 top-2 text-2xl cursor-pointer'><MdCancel /></span>
                <hr />
                <ol className='list-decimal my-10'>
                    <div className='flex'>
                        <h3 className='w-2/3 font-bold'>Items</h3>
                        <h3 className='w-1/3 font-bold'>Quantity</h3>
                    </div>

                    {/* Items  */}
                    <li>
                        <div className='flex text-left'>
                            <div className='w-2/3'>
                                <div>T-Shirt</div>
                            </div>
                            <div className='w-1/3 text-center text-xl'>
                                <div className='flex items-center gap-x-2.5'>
                                    <AiFillMinusCircle className='cursor-pointer' />
                                    <span className='text-base'>1</span>
                                    <AiFillPlusCircle className='cursor-pointer' />
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className='flex text-left'>
                            <div className='w-2/3'>
                                <div>T-Shirt</div>
                            </div>
                            <div className='w-1/3 text-center text-xl'>
                                <div className='flex items-center gap-x-2.5'>
                                    <AiFillMinusCircle className='cursor-pointer' />
                                    <span className='text-base'>1</span>
                                    <AiFillPlusCircle className='cursor-pointer' />
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className='flex text-left'>
                            <div className='w-2/3'>
                                <div>T-Shirt</div>
                            </div>
                            <div className='w-1/3 text-center text-xl'>
                                <div className='flex items-center gap-x-2.5'>
                                    <AiFillMinusCircle className='cursor-pointer' />
                                    <span className='text-base'>1</span>
                                    <AiFillPlusCircle className='cursor-pointer' />
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className='flex text-left'>
                            <div className='w-2/3'>
                                <div>T-Shirt</div>
                            </div>
                            <div className='w-1/3 text-center text-xl'>
                                <div className='flex items-center gap-x-2.5'>
                                    <AiFillMinusCircle className='cursor-pointer' />
                                    <span className='text-base'>1</span>
                                    <AiFillPlusCircle className='cursor-pointer' />
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className='flex text-left'>
                            <div className='w-2/3'>
                                <div>T-Shirt</div>
                            </div>
                            <div className='w-1/3 text-center text-xl'>
                                <div className='flex items-center gap-x-2.5'>
                                    <AiFillMinusCircle className='cursor-pointer' />
                                    <span className='text-base'>1</span>
                                    <AiFillPlusCircle className='cursor-pointer' />
                                </div>
                            </div>
                        </div>
                    </li>
                </ol>

                
                <button className="flex items-center gap-2 mx-auto mt-16 text-white bg-yellow-800 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-700 rounded text-lg w-full">CheckOut <FaShoppingBag /></button>

            </div>
        </div>
    )
}

export default Navbar
