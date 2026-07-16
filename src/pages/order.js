import React from 'react'

const Order = () => {
  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">Byte-Bazaar</h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mt-2">Order Id : #251825</h1>
            <p className="leading-relaxed mb-4">Your Order Have Been Placed SuccessFully !</p>
            <div className="flex mb-4 justify-between">
              <a className="py-2 text-lg px-1">Items</a>
              <a className="py-2 text-lg pl-20 md:pl-30">Quantity</a>
              <a className="py-2 text-lg px-1">Price</a>
            </div>
            <div className="flex border-t border-gray-200 py-2 justify-between">
              <div className="text-gray-500 md:text-base text-xs">Winter Jacket For Men</div>
              <div className="ml-auto text-gray-900 text-center">1</div>
              <div className="ml-auto text-gray-900">₹499</div>
            </div>
            <div className="flex border-t border-gray-200 py-2">
              <div className="text-gray-500 md:text-base text-xs">Winter Jacket For Men</div>
              <div className="ml-auto text-gray-900">1</div>
              <div className="ml-auto text-gray-900">₹499</div>
            </div>
            <div className="flex border-t border-b mb-6 border-gray-200 py-2">
              <div className="text-gray-500 md:text-base text-xs">Winter Jacket For Men</div>
              <div className="ml-auto text-gray-900">1</div>
              <div className="ml-auto text-gray-900">₹499</div>
            </div>
            <div className="flex">
              <div className="title-font font-medium text-2xl text-gray-900">SubTotal : ₹58.00</div>
              <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Track Order</button>
            </div>
          </div>
          <img alt="ecommerce" className="w-181.25 lg:w-1/2 h-95 rounded" src="/OrderPlacedImg.webp"/>
        </div>
      </div>
    </section>
  )
}

export default Order
