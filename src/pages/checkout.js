import React from 'react'

const CheckOut = () => {
  return (
    <div className='container m-auto'>

      <h1 className='font-bold text-3xl text-center my-10 underline'>CheckOut</h1>
      <h2 className='font-bold text-2xl my-5'>1.Delivery Details</h2>
      <div className='flex gap-3 mx-auto'>

        {/* Name  */}
        <div className="w-1/2">
          <div class="mb-4">
            <label for="name" class="leading-7 text-sm text-gray-600">Name</label>
            <input type="text" id="name" name="name" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>

        {/* Email  */}
        <div className="w-1/2">
          <div class="mb-4">
            <label for="name" class="leading-7 text-sm text-gray-600">Email</label>
            <input type="email" id="email" name="email" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>

      </div>

      {/* Addres  */}
      <div className="w-full">
        <div class="mb-4">
          <label for="name" class="leading-7 text-sm text-gray-600">Address</label>
          <textarea type="text" id="name" name="name" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder='Enter your full address including street, city, and zip code' />
        </div>
      </div>


    </div>
  )
}

export default CheckOut
