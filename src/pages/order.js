import React, { useEffect } from 'react'
import orderModel from '../../Models/OrderModel'
import mongoose from 'mongoose'

const Order = ({ UserOrder }) => {

  return (

    <section className="text-gray-600 body-font overflow-hidden">

      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">

          <div className="md:w-2/3 w-full pr-2 mb-10 md:mb-0">

            <h2 className="text-sm title-font text-gray-500 tracking-widest">Byte-Bazaar</h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mt-2">Order Id : #{UserOrder.orderId}</h1>

            <p className="leading-relaxed">Your Order Have Been Placed SuccessFully !</p>
            <p className="leading-relaxed text-sm"> <span className='font-semibold'>Payment Status</span> : {UserOrder.payment === true ? 'Paid' : 'Pending'}</p>

            <p className="leading-relaxed text-sm mb-4"> <span className='font-semibold'>Order Status</span> : {UserOrder.status}</p>

            <div className="grid grid-cols-[2fr_1fr_1fr] mb-4">
              <a className="py-2 text-center text-lg px-1">Items</a>
              <a className="py-2 text-center text-lg">Quantity</a>
              <a className="py-2 text-center text-lg">Price</a>
            </div>

            {
              UserOrder.items.map(item => Object.keys(item).map(key => (

                <div key={key} className="grid grid-cols-[2fr_1fr_1fr] border-t border-gray-200 py-2">
                  <div className="text-gray-500 text-sm">
                    {item[key].name} ({item[key].color}/{item[key].size})
                  </div>
                  <div className="text-gray-900 text-center">{item[key].qty}</div>
                  <div className="text-gray-900 text-center">₹{item[key].price}</div>
                </div>

              )))

            }
            <p className='flex justify-end text-xl mr-10 mt-3 underline font-bold'>SubTotal : ₹{UserOrder.amount} </p>
          </div>

          <img alt="ecommerce" className="w-181.25 md:w-1/3 rounded" src="/OrderPlacedImg.jpg" />

        </div>
      </div>
    </section>

  )
}

export async function getServerSideProps(context) {

  if (!mongoose.connection.readyState) {
    await mongoose.connect(process.env.MONGODB_URI)
  }

  let { id } = context.query
  let UserOrder = await orderModel.findById(id)

  return {
    props: { UserOrder: JSON.parse(JSON.stringify(UserOrder)) }
  }
}

export default Order
