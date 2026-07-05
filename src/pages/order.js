import React from 'react'

const Order = () => {
  return (
    <section class="text-gray-600 body-font overflow-hidden">
      <div class="container px-5 py-24 mx-auto">
        <div class="lg:w-4/5 mx-auto flex flex-wrap">
          <div class="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            <h2 class="text-sm title-font text-gray-500 tracking-widest">Byte-Bazaar</h2>
            <h1 class="text-gray-900 text-3xl title-font font-medium mt-2">Order Id : #251825</h1>
            <p class="leading-relaxed mb-4">Your Order Have Been Placed SuccessFully !</p>
            <div class="flex mb-4 justify-between">
              <a class="py-2 text-lg px-1">Items</a>
              <a class="py-2 text-lg pl-20 md:pl-30">Quantity</a>
              <a class="py-2 text-lg px-1">Price</a>
            </div>
            <div class="flex border-t border-gray-200 py-2 justify-between">
              <div class="text-gray-500 md:text-base text-xs">Winter Jacket For Men</div>
              <div class="ml-auto text-gray-900 text-center">1</div>
              <div class="ml-auto text-gray-900">₹499</div>
            </div>
            <div class="flex border-t border-gray-200 py-2">
              <div class="text-gray-500 md:text-base text-xs">Winter Jacket For Men</div>
              <div class="ml-auto text-gray-900">1</div>
              <div class="ml-auto text-gray-900">₹499</div>
            </div>
            <div class="flex border-t border-b mb-6 border-gray-200 py-2">
              <div class="text-gray-500 md:text-base text-xs">Winter Jacket For Men</div>
              <div class="ml-auto text-gray-900">1</div>
              <div class="ml-auto text-gray-900">₹499</div>
            </div>
            <div class="flex">
              <div class="title-font font-medium text-2xl text-gray-900">SubTotal : ₹58.00</div>
              <button class="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Track Order</button>
            </div>
          </div>
          <img alt="ecommerce" class="w-181.25 lg:w-1/2 h-95 rounded" src="/OrderPlacedImg.webp"/>
        </div>
      </div>
    </section>
  )
}

export default Order
