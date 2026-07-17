import React, { useEffect, useState } from 'react'
import { MdCancel } from "react-icons/md";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { FaShoppingBag, FaTrashAlt } from "react-icons/fa";
import Link from 'next/link';
import axios from 'axios';
import { toast } from 'react-toastify';

const CheckOut = ({ cart, addToCart, clearCart, removeFromCart, subTotal }) => {

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    fullAddress: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  })

  const onChangeHandler = (e) => {

    const name = e.target.name
    const value = e.target.value

    setFormData(data => ({ ...data, [name]: value }))

  }

  const initiatePayment = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error("User not authenticated");
        return;
      }

      const res = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/getUserId`, { token });
      const userId = res.data.userId;

      let orderData = {
        userId,
        items: cart,
        amount: subTotal,
        address: formData
      };

      const responseStripe = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/stripe`, orderData);
      console.log(responseStripe)

      if (responseStripe.data.success) {
        const { session_url } = responseStripe.data;
        window.location.replace(session_url);
      } else {
        toast.error("Payment initiation failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong during payment");
    }
  }

  return (
    <>

      <div className='container m-auto'>

        <h1 className='font-bold text-3xl text-center my-10 underline'>CheckOut</h1>

        {/* Form Details  */}
        <div className='m-3 p-3'>
          <h2 className='font-bold text-2xl my-5'>1.Delivery Details</h2>

          {/* Name & Email  */}
          <div className='flex gap-3 mx-auto'>

            {/* Name  */}
            <div className="w-1/2">
              <div className="mb-4">
                <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                <input onChange={onChangeHandler} name='fullName' value={formData.fullName} type="text" id="name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              </div>
            </div>

            {/* Email  */}
            <div className="w-1/2">
              <div className="mb-4">
                <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                <input onChange={onChangeHandler} name='email' value={formData.email} type="email" id="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              </div>
            </div>

          </div>

          {/* Address  */}
          <div className="w-full">
            <div className="mb-4">
              <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
              <textarea onChange={onChangeHandler} name='fullAddress' value={formData.fullAddress} type="text" id="address" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder='Enter your full address including street, city, and zip code' />
            </div>
          </div>

          {/* Phone & City  */}
          <div className='flex gap-3 mx-auto'>

            {/* Phone  */}
            <div className="w-1/2">
              <div className="mb-4">
                <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
                <input onChange={onChangeHandler} name='phone' value={formData.phone} type="phone" id="phone" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              </div>
            </div>

            {/* City  */}
            <div className="w-1/2">
              <div className="mb-4">
                <label htmlFor="city" className="leading-7 text-sm text-gray-600">City</label>
                <input onChange={onChangeHandler} name='city' value={formData.city} type="text" id="city" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              </div>
            </div>

          </div>

          {/* State & PinCode  */}
          <div className='flex gap-3 mx-auto'>

            {/* State  */}
            <div className="w-1/2">
              <div className="mb-4">
                <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
                <input onChange={onChangeHandler} name='state' value={formData.state} type="text" id="state" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              </div>
            </div>

            {/* PinCode  */}
            <div className="w-1/2">
              <div className="mb-4">
                <label htmlFor="pinCode" className="leading-7 text-sm text-gray-600">PinCode</label>
                <input onChange={onChangeHandler} name='zipcode' value={formData.zipcode} type="text" id="pinCode" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              </div>
            </div>

          </div>
        </div>

        {/* Cart Details  */}
        <div className='m-3 p-3'>
          <h2 className='font-bold text-2xl my-5'>2.Cart Details</h2>
          <div className="cart py-8 px-8 text-blue-950 border text-xl lg:text-lg prata-regular m-3">

            <h2 className='font-bold text-3xl relative -top-1.5 text-center'>Your Cart</h2>
            <span className='absolute right-3 top-2 text-2xl cursor-pointer'><MdCancel /></span>
            <hr />
            <ol className='list-decimal ml-6 my-10'>
              <div className='flex'>
                <h3 className='w-2/3 text-xl font-bold'>Items</h3>
                <h3 className='w-1/3 text-xl font-bold text-end '>Quantity</h3>
              </div>

              {/* Items  */}
              {
                Object.keys(cart).length === 0 && <div className='my-4 text-balance'>No Items To Display</div>
              }

              {
                Object.keys(cart).map(id => {
                  return (
                    <li key={id}>
                      <div className='flex text-left'>
                        <div className='w-2/3'>
                          <div>{cart[id].name} ({cart[id].color}/{cart[id].size})</div>
                        </div>
                        <div className='w-1/3 text-center text-xl'>
                          <div className='flex items-center gap-x-2.5 justify-end'>
                            <AiFillMinusCircle onClick={() => removeFromCart(id, 1, cart[id].price, cart[id].name, 'M')} className='cursor-pointer' />
                            <span className='text-xl'>{cart[id].qty}</span>
                            <AiFillPlusCircle onClick={() => addToCart(id, 1, cart[id].price, cart[id].name, 'M')} className='cursor-pointer' />
                          </div>
                        </div>
                      </div>
                    </li>
                  )
                })
              }
            </ol>

            <div className="flex items-center flex-col md:flex-row md:justify-end">
              <span className='text-center mt-5 mx-2 md:mx-6 font-semibold text-xl md:text-2xl underline'>Sub-Total : ₹{subTotal}</span>
              <Link href={'/checkout'}>
                <button onClick={initiatePayment} className="flex items-center gap-2 mx-2 mt-1 md:mt-5 text-white bg-green-600 border-0 py-2 px-6 md:px-10 focus:outline-none hover:bg-green-800 rounded text-sm md :text-xl w-full cursor-pointer transform transition-transform duration-100 hover:scale-110 prata-regular">Pay<FaShoppingBag />
                </button>
              </Link>
            </div>

          </div>
        </div>
      </div>

    </>

  )
}

export default CheckOut
