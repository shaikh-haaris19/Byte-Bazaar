import mongoose from 'mongoose'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import productModel from '../../Models/ProductModel'

const topwear = ({ allProducts }) => {

    useEffect(() => {
        console.log(allProducts)
    }, [])

    return (
        <div>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-wrap -m-4 justify-center">

                        {
                            Object.keys(allProducts).map(product => {

                                return (
                                    <div key={allProducts[product]._id} className="lg:w-1/5 md:w-1/2 p-4 w-full border m-7 shadow-md">
                                        <Link href={`/product/${product.slug}`} className="block relative rounded overflow-hidden cursor-pointer">
                                            <img alt="ecommerce" className="h-[40vh] md:h-[36vh] block m-auto" src={allProducts[product].image} />
                                        </Link>
                                        <div className="mt-4 text-center">
                                            <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{allProducts[product].slug}</h3>
                                            <h2 className="text-gray-900 title-font text-lg font-bold">{allProducts[product].title}</h2>
                                            <p className="mt-1 font-semibold">₹{allProducts[product].price}</p>
                                            <div className="mt-1 text-gray-600"> <span className='text-md'>Sizes:</span> 
                                                {allProducts[product].sizes.includes('S') && <span className='text-sm mx-1'>S</span>}
                                                {allProducts[product].sizes.includes('M') && <span className='text-sm mx-1'>M</span>}
                                                {allProducts[product].sizes.includes('L') && <span className='text-sm mx-1'>L</span>}
                                                {allProducts[product].sizes.includes('XL') && <span className='text-sm mx-1'>XL</span>}
                                                {allProducts[product].sizes.includes('XXL') && <span className='text-sm mx-1'>XXL</span>}
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

    let allProducts = await productModel.find({ category: 'topwear' })
    console.log(allProducts)
    let topwear = {};

    for (let item of allProducts) {

        if (item.title in topwear) {

            if (item.availableQty > 0) {
                for (let color of item.colors) {
                    if (!topwear[item.title].colors.includes(color)) {
                        topwear[item.title].colors.push(color)
                    }
                }

                for (let size of item.sizes) {
                    if (!topwear[item.title].sizes.includes(size)) {
                        topwear[item.title].sizes.push(size)
                    }
                }
            }

        } else {
            topwear[item.title] = JSON.parse(JSON.stringify(item))
        }

    }
    return { props: { allProducts: JSON.parse(JSON.stringify(topwear)) } }
}

export default topwear
