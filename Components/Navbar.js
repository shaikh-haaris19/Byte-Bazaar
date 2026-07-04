import React, { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from "next/router";
import { FiShoppingCart } from "react-icons/fi";
import { MdCancel } from "react-icons/md";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { FaShoppingBag, FaArrowRight, FaTrashAlt } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = ({ cart, addToCart, clearCart, removeFromCart, subTotal }) => {

    const ref = useRef()
    const [visible, setVisible] = useState(false)
    const router = useRouter()

    const handleSideCart = () => {
        if (ref.current.classList.contains('translate-x-full')) {
            ref.current.classList.remove('translate-x-full')
            ref.current.classList.add('translate-x')
        }
        else if (!ref.current.classList.contains('translate-x-full')) {
            ref.current.classList.remove('translate-x')
            ref.current.classList.add('translate-x-full')
        }
    }

    return (
        <div className='flex justify-between py-3 items-center lg:flex-row shadow'>
            <div className="logo mx-2">
                <Link href={'/'} className='cursor-pointer'>
                    <Image width={90} height={90} src={'/Logo.png'} alt='HeroImage'></Image>
                </Link>
            </div>
            <div className='nav hidden lg:block'>
                <ul className='flex space-x-2 text-sm md:space-x-6 md:text-lg my-4 font-bold'>
                    <Link href={'/topwear'} className='cursor-pointer hover:underline'><li className=''>TopWear</li></Link>
                    <Link href={'/bottomwear'} className='cursor-pointer hover:underline'><li className=''>BottomWear</li></Link>
                    <Link href={'/winterwear'} className='cursor-pointer hover:underline'><li className=''>WinterWear</li></Link>
                    <Link href={'/footwear'} className='cursor-pointer hover:underline'><li className=''>FootWear</li></Link>
                </ul>
            </div>
            <div className='flex gap-2 items-center'>
                <div onClick={handleSideCart} className="mx-3">
                    <FiShoppingCart className='text-3xl cursor-pointer' />
                </div>

                {/* Hamburger  */}
                <div onClick={() => setVisible(true)} className='lg:hidden mr-5 text-2xl cursor-pointer'>
                    <GiHamburgerMenu />
                </div>
            </div>

            {/* Humburger Side Menu  */}
            <div className={`z-20 absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
                <div className='flex flex-col text-gray-600'>

                    <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                        <FaArrowRight className='h-4 rotate-180' alt="" />
                        <p>Back</p>
                    </div>

                    <Link onClick={() => setVisible(false)} className={`py-3 pl-6 border ${router.pathname === '/' ? 'active' : ''}`} href='/'>Home</Link>
                    <Link onClick={() => setVisible(false)} className={`py-3 pl-6 border ${router.pathname === '/topwear' ? 'active' : ''}`} href='/topwear'>TopWear</Link>
                    <Link onClick={() => setVisible(false)} className={`py-3 pl-6 border ${router.pathname === '/bottomwear' ? 'active' : ''}`} href='/bottomwear'>BottomWear</Link>
                    <Link onClick={() => setVisible(false)} className={`py-3 pl-6 border ${router.pathname === '/winterwear' ? 'active' : ''}`} href='/winterwear'>WinterWear</Link>
                    <Link onClick={() => setVisible(false)} className={`py-3 pl-6 border ${router.pathname === '/footwear' ? 'active' : ''}`} href='/footwear'>FootWear</Link>

                </div>
            </div>


            {/* Side Cart  */}
            <div ref={ref} className="cart absolute top-0 right-0  bg-[#E5B25D] py-10 px-8 text-blue-950 shadow-xl transform transition-transform translate-x-full z-10 h-full text-xl lg:text-lg prata-regular">

                <h2 className='font-bold text-3xl relative -top-1.5 text-center'>Shopping Cart</h2>
                <span onClick={handleSideCart} className='absolute right-3 top-2 text-2xl cursor-pointer'><MdCancel /></span>
                <hr />
                <ol className='list-decimal my-10'>
                    <div className='flex'>
                        <h3 className='w-2/3 text-xl font-bold'>Items</h3>
                        <h3 className='w-1/3 text-xl font-bold'>Quantity</h3>
                    </div>

                    {/* Items  */}
                    {
                        Object.keys(cart).length === 0 && <div className='my-4 text-balance'>No Items To Display</div>
                    }

                    {
                        Object.keys(cart).map(id => {
                            return (
                                <li key={id}>
                                    <div className='flex text-left'>
                                        <div className='w-2/3'>
                                            <div>{cart[id].name}</div>
                                        </div>
                                        <div className='w-1/3 text-center text-xl'>
                                            <div className='flex items-center gap-x-2.5'>
                                                <AiFillMinusCircle onClick={() => removeFromCart(id, 1, cart[id].price, cart[id].name, 'M')} className='cursor-pointer' />
                                                <span className='text-xl'>{cart[id].qty}</span>
                                                <AiFillPlusCircle onClick={() => addToCart(id, 1, cart[id].price, cart[id].name, 'M')} className='cursor-pointer' />
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ol>

                {/* Checkout & ClearCart  */}
                <div className="flex">
                    <button className="flex items-center gap-2 mx-2 mt-5 text-white bg-yellow-800 border-0 py-2 px-3 focus:outline-none hover:bg-yellow-700 rounded lg:text-md w-full cursor-pointer transform transition-transform duration-100 hover:scale-110">CheckOut <FaShoppingBag /></button>

                    <button onClick={() => clearCart()} className="flex items-center gap-2 mx-2 mt-5 text-white bg-yellow-800 border-0 py-2 px-3 focus:outline-none hover:bg-yellow-700 rounded text-md w-full cursor-pointer transform transition-transform duration-100 hover:scale-110">ClearCart <FaTrashAlt /></button>
                </div>

            </div>
        </div>
    )
}

export default Navbar
