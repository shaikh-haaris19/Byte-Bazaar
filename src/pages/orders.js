import React, { useEffect } from 'react'
import orderModel from '../../Models/OrderModel'
import mongoose from 'mongoose'

const Orders = ({ Orders }) => {

    useEffect(() => {
        console.log(Orders)
    }, [])

    return (
        <div className='container mx-auto'>
            <h1 className='font-bold text-3xl py-8'>Your Order's : </h1>
            <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
                <table className="w-full text-sm text-left rtl:text-right text-body">


                    <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
                        <tr>
                            <th scope="col" className="px-6 py-3 font-semibold text-xl">
                                Product name
                            </th>
                            <th scope="col" className="px-6 py-3 font-semibold text-xl">
                                Color
                            </th>
                            <th scope="col" className="px-6 py-3 font-semibold text-xl">
                                Category
                            </th>
                            <th scope="col" className="px-6 py-3 font-semibold text-xl">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3 font-semibold text-xl">
                                Status
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr className="bg-neutral-primary border-b border-default">
                            <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                                Apple MacBook Pro 17"
                            </th>
                            <td className="px-6 py-4">
                                Silver
                            </td>
                            <td className="px-6 py-4">
                                Laptop
                            </td>
                            <td className="px-6 py-4">
                                $2999
                            </td>
                            <td className="px-6 py-4">
                                231
                            </td>
                        </tr>
                        <tr className="bg-neutral-primary border-b border-default">
                            <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                                Microsoft Surface Pro
                            </th>
                            <td className="px-6 py-4">
                                White
                            </td>
                            <td className="px-6 py-4">
                                Laptop PC
                            </td>
                            <td className="px-6 py-4">
                                $1999
                            </td>
                            <td className="px-6 py-4">
                                423
                            </td>
                        </tr>
                        <tr className="bg-neutral-primary">
                            <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                                Magic Mouse 2
                            </th>
                            <td className="px-6 py-4">
                                Black
                            </td>
                            <td className="px-6 py-4">
                                Accessories
                            </td>
                            <td className="px-6 py-4">
                                $99
                            </td>
                            <td className="px-6 py-4">
                                121
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export async function getServerSideProps(context) {

    if (!mongoose.connection.readyState) {
        await mongoose.connect(process.env.MONGODB_URI)
    }

    let Orders = await orderModel.find({})

    return {
        props: { Orders: JSON.parse(JSON.stringify(Orders)) }
    }
}

export default Orders
