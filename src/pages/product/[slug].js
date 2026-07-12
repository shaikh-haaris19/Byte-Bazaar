import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import mongoose from 'mongoose'
import productModel from '../../../Models/ProductModel'
import { toast } from 'react-toastify'

const Slug = ({ cart, addToCart, clearCart, removeFromCart, subTotal, product, variants, BuyNow }) => {

    const router = useRouter()
    const { slug } = router.query
    const [pin, setPin] = useState([]);
    const [serviceability, setServiceability] = useState(null);
    const [size, setSize] = useState(product.size)
    const [color, setColor] = useState(product.color)

    const checkServiceability = async () => {

        let pins = await fetch('http://localhost:3000/api/pincode');
        let parsedPins = await pins.json();

        if (parsedPins.includes(Number(pin))) {
            setServiceability(true);
            toast.success('Yay ! PinCode Serviceable')
        } else {
            setServiceability(false)
            toast.error('Sorry ! PinCode Not UnServiceable')
        }
    }

    const onChange = (e) => {
        setPin(e.target.value)
    }

    const colorClasses = {
        White: "bg-white",
        Black: "bg-black",
        Blue: "bg-blue-700",
        Green: "bg-green-700",
        Brown: "bg-yellow-700",
        Red: "bg-red-700"
    };

    const refreshPage = (newSize, newColor) => {

        let url = `http://localhost:3000/product/${variants[newColor][newSize]['slug']}`
        window.location.href = url

    }

    return (
        <div>
            <section className="text-gray-600 body-font overflow-hidden">
                <div className="container px-5 py-15 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">

                        {/* Product Image */}
                        <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-full px-10 lg:px-24 object-cover object-top rounded" src={product.image[0]} />
                        <div className="lg:w-1/2 w-full mt-6 lg:mt-0">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest">BYTE-BAZAAR</h2>

                            {/* Product Title  */}
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.slug} ({product.size}/{product.color})</h1>
                            <div className="flex mb-4">

                                {/* Review Star's  */}
                                <span className="flex items-center">
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <span className="text-gray-600 ml-3">4 Reviews</span>
                                </span>

                                {/* FaceBook , Twitter & WatsApp Icon  */}
                                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                                    <a className="text-gray-500">
                                        <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                        </svg>
                                    </a>
                                    <a className="text-gray-500">
                                        <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                                        </svg>
                                    </a>
                                    <a className="text-gray-500">
                                        <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                                        </svg>
                                    </a>
                                </span>

                            </div>

                            {/* Product Description  */}
                            <p className="leading-relaxed">Experience comfort and style with our Classic Cotton T‑Shirt. Made from 100% premium cotton, it offers a soft touch, breathable fabric, and a perfect fit for everyday wear. Designed with durability in mind, this versatile tee pairs effortlessly with jeans, shorts, or layered under jackets.</p>

                            {/* Colors & Sizes  */}
                            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                                <div className="flex">
                                    <span className="mr-3">Colors : </span>

                                    {/* Color  */}
                                    <div className="flex">

                                        {
                                            Object.keys(variants).map(clr => (
                                                Object.keys(variants[clr]).includes(size) &&
                                                <button key={clr} onClick={() => refreshPage(size, clr)} className={`border-b-amber-100 cursor-pointer border-2 border-gray-300 ml-1 ${colorClasses[clr]} rounded-full w-6 h-6 focus:outline-none ${color === clr ? 'border-black' : 'border-gray-300'}`}></button>
                                            ))
                                        }
                                    </div>

                                </div>

                                {/* Sizes  */}
                                <div className="flex ml-6 items-center">
                                    <span className="mr-3">Size</span>
                                    <div className="relative">
                                        <select value={size} onChange={(e) => { refreshPage(e.target.value, color) }} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:border-yellow-500 text-base pl-3 pr-10">

                                            {Object.keys(variants[color]).includes('S') && <option value={'S'}>S</option>}
                                            {Object.keys(variants[color]).includes('M') && <option value={'M'}>M</option>}
                                            {Object.keys(variants[color]).includes('L') && <option value={'L'}>L</option>}
                                            {Object.keys(variants[color]).includes('XL') && <option value={'XL'}>XL</option>}
                                            {Object.keys(variants[color]).includes('XXL') && <option value={'XXL'}>XXL</option>}


                                        </select>
                                        <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                                                <path d="M6 9l6 6 6-6"></path>
                                            </svg>
                                        </span>
                                    </div>
                                </div>

                            </div>

                            {/* BuyNow & AddToCart Button   */}
                            <div className="flex">
                                <span className="title-font font-medium text-2xl text-gray-900">₹{product.price}</span>

                                <button onClick={() => BuyNow(product.slug, 1, product.price, product.title, product.size, product.color)} className="flex ml-auto text-white bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded">Buy Now</button>

                                <button onClick={() => { toast.success('Product Added SuccessFully !'); addToCart(product.slug, 1, product.price, product.title, product.size, product.color) }} className="flex ml-3 text-white bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded">Add To Cart</button>
                            </div>

                            {/* Pincode Availability  */}
                            <div className="flex mx-4 mt-8 space-x-2 text-sm">
                                <input onChange={onChange} type="text" placeholder='Enter Your PinCode' className='p-2 border-2 rounded border-amber-300 outline-amber-300 my-1' />
                                <button onClick={checkServiceability} className='text-white bg-yellow-500 border-0 py-2 px-3 focus:outline-none hover:bg-yellow-600 rounded my-1'>Check Availability</button>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export async function getServerSideProps(context) {

    if (!mongoose.connection.readyState) {
        await mongoose.connect(process.env.MONGODB_URI)
    }

    let Product = await productModel.findOne({ slug: context.query.slug })
    let Variants = await productModel.find({ title: Product.title, category: Product.category })

    let colorSizeSlug = {}  // Example : { red : { XL : { slug :  'OverSized-Tshirt' } } }

    for (let item of Variants) {

        if (Object.keys(colorSizeSlug).includes(item.color)) {
            colorSizeSlug[item.color][item.size] = { slug: item.slug }
        } else {
            colorSizeSlug[item.color] = {}
            colorSizeSlug[item.color][item.size] = { slug: item.slug }
        }
    }

    return {
        props:
        {
            product: JSON.parse(JSON.stringify(Product)),
            variants: JSON.parse(JSON.stringify(colorSizeSlug))
        }
    }
}

export default Slug
