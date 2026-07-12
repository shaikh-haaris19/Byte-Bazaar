import mongoose from 'mongoose'
import Link from 'next/link'
import React from 'react'
import productModel from '../../Models/ProductModel'

const bottomwear = ({ allProducts }) => {

    
    return (
        <div>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-wrap -m-4 justify-center">

                        {
                            Object.keys(allProducts).map(product => {
                                console.log(allProducts[product])

                                return (
                                    <div key={allProducts[product]._id} className="lg:w-1/4 md:w-3/4 p-4 w-3/2 border m-7 shadow-md">
                                        <Link href={`/product/${allProducts[product].slug}`} className="block relative rounded overflow-hidden cursor-pointer">
                                            <img alt="ecommerce" className="h-[40vh] md:h-[36vh] block m-auto" src={allProducts[product].image} />
                                        </Link>
                                        <div className="mt-4 text-center">
                                            <h2 className="text-gray-900 title-font text-lg font-bold">{allProducts[product].title}</h2>
                                            <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{allProducts[product].description}</h3>
                                            <p className="mt-1 font-semibold">₹{allProducts[product].price}</p>

                                            {/* Sizes  */}
                                            <div className="mt-1 text-gray-600"> <span className='text-md'>Sizes:</span>
                                                {allProducts[product].size.includes('S') && <span className='cursor-pointer text-sm mx-1 border px-2 py-1 rounded-xl text-black'>S</span>}
                                                {allProducts[product].size.includes('M') && <span className='cursor-pointer text-sm mx-1 border px-2 py-1 rounded-xl text-black'>M</span>}
                                                {allProducts[product].size.includes('L') && <span className='cursor-pointer text-sm mx-1 border px-2 py-1 rounded-xl text-black'>L</span>}
                                                {allProducts[product].size.includes('XL') && <span className='cursor-pointer text-sm mx-1 border px-2 py-1 rounded-xl text-black'>XL</span>}
                                                {allProducts[product].size.includes('XXL') && <span className='cursor-pointer text-sm mx-1 border px-2 py-1 rounded-xl text-black'>XXL</span>}
                                            </div>

                                            {/* Color  */}
                                            <div className="mt-1.5 text-gray-600 flex items-center justify-center"> <span className='text-md'>Colors:</span>

                                                {allProducts[product].color.includes('White') && <button className="cursor-pointer border-2 border-gray-300 ml-1 bg-white rounded-full w-6 h-6 focus:outline-none"></button>}
                                                {allProducts[product].color.includes('Black') && <button className="cursor-pointer border-2 border-gray-300 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button>}
                                                {allProducts[product].color.includes('Blue') && <button className="cursor-pointer border-2 border-gray-300 ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                                                {allProducts[product].color.includes('Green') && <button className="cursor-pointer border-2 border-gray-300 ml-1 bg-green-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                                                {allProducts[product].color.includes('Brown') && <button className="cursor-pointer border-2 border-gray-300 ml-1 bg-yellow-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                                                {allProducts[product].color.includes('Red') && <button className="cursor-pointer border-2 border-gray-300 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none"></button>}

                                            </div>

                                        </div>
                                    </div>
                                )

                            })
                        }

                    </div>
                </div>
            </section>
        </div>
    )
}

export async function getServerSideProps() {

    if (!mongoose.connection.readyState) {
        await mongoose.connect(process.env.MONGODB_URI)
    }

    let allProducts = await productModel.find({ category: 'bottomwear' })
    let bottomwear = {};

    for (let item of allProducts) {

        if (item.title in bottomwear) {

            if (item.availableQty > 0) {
                if (!bottomwear[item.title].color.includes(item.color)) {
                    bottomwear[item.title].color.push(item.color)
                }


                if (!bottomwear[item.title].size.includes(item.size)) {
                    bottomwear[item.title].size.push(item.size)
                }
            }

        } else {
            bottomwear[item.title] = JSON.parse(JSON.stringify(item))
            if (item.availableQty > 0) {
                bottomwear[item.title].color = [item.color]
                bottomwear[item.title].size = [item.size]
            }
        }

    }
    return { props: { allProducts: JSON.parse(JSON.stringify(bottomwear)) } }
}

export default bottomwear
