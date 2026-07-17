import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'

const Orders = () => {

    const [userOrders, setUserOrders] = useState([])

    const fetchOrders = async () => {

        let token = localStorage.getItem('token')

        const res = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/getUserId`, { token });
        const userId = res.data.userId;

        const allOrders = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/getAllOrders`, { userId });
        setUserOrders(allOrders.data.allOrders)

    }

    useEffect(() => {
        fetchOrders()
    }, [])

    return (
        <div className='container mx-auto min-h-screen'>
            <h1 className='font-bold text-3xl py-8'>Your Order's : </h1>
            <div className="bg-neutral-primary-soft shadow-xs rounded-base border border-default">
                <div className="w-full text-sm text-body">

                    {/* Header row */}
                    <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
                        <div className="px-6 py-3 font-semibold text-xl">OrderId</div>
                        <div className="px-6 py-3 font-semibold text-xl text-center">Payment Method</div>
                        <div className="px-6 py-3 font-semibold text-xl text-center">Amount</div>
                        <div className="px-6 py-3 font-semibold text-xl text-center">Date</div>
                        <div className="px-6 py-3 font-semibold text-xl text-center">Details</div>
                    </div>

                    {/* Body rows */}
                    {userOrders.map((product) => (
                        <div
                            key={product._id}
                            className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] bg-neutral-primary border-b border-default"
                        >
                            <div className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                                #{product.orderId}
                            </div>
                            <div className="px-6 py-4 text-center">{product.paymentMethod}</div>
                            <div className="px-6 py-4 text-center">${product.amount}</div>
                            <div className="px-6 py-4 text-center">
                                {new Date(product.createdAt).toLocaleDateString("en-US", {
                                    year: "2-digit",
                                    month: "numeric",
                                    day: "numeric",
                                })}
                            </div>
                            <div className="px-6 py-4 text-center">
                                <Link className="text-blue-800 underline cursor-pointer" href={"/order?id=" + product._id}>
                                    Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

        </div>
    )
}

export default Orders
