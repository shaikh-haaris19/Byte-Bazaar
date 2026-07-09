import mongoose from 'mongoose'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import productModel from '../../Models/ProductModel'

const topwear = ({ allProducts }) => {

    return (
        <div>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-wrap -m-4 justify-center">

                        {
                            allProducts.map(product => {

                                return (
                                    <div key={product._id} className="lg:w-1/5 md:w-1/2 p-4 w-full border m-7 shadow-md">
                                        <Link href={`/product/${product.slug}`} className="block relative rounded overflow-hidden cursor-pointer">
                                            <img alt="ecommerce" className="h-[40vh] md:h-[36vh] block m-auto" src={product.image} />
                                        </Link>
                                        <div className="mt-4 text-center">
                                            <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{product.slug}</h3>
                                            <h2 className="text-gray-900 title-font text-lg font-bold">{product.title}</h2>
                                            <p className="mt-1 font-semibold">₹{product.price}</p>
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

    return { props: { allProducts: JSON.parse(JSON.stringify(allProducts)) } }
}

export default topwear
