import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const myaccount = () => {

    const router = useRouter()

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            router.push('/')
        }

        fetchUser()
    }, [])


    const [formData, setFormData] = useState({
        email: '',
        fullName: '',
        fullAddress: '',
        phone: '',
        zipcode: '',
        password: '',
        confirmPassword: ''
    })

    const [newPassword, setNewPassword] = useState({
        oldpassword: '',
        password: '',
        confirmPassword: ''
    })

    //Fetch User Data Inital And Set Form Data To DB User Data
    const fetchUser = async () => {

        const token = localStorage.getItem('token');

        const getUserId = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/getUserId`, { token });
        const userData = getUserId.data.user;

        setFormData(prev => ({
            ...prev,
            fullName: userData.name,
            fullAddress: userData.address,
            phone: userData.phone,
            zipcode: userData.zipcode,
        }))

    }

    // Handle Form Data Change 
    const onChangeHandler = (e) => {

        const name = e.target.name
        const value = e.target.value

        setFormData(data => ({ ...data, [name]: value }))
    }

    //Handle Password Change
    const onPasswordChange = (e) => {

        const name = e.target.name
        const value = e.target.value

        setNewPassword(data => ({ ...data, [name]: value }))
    }

    //Get User Email And Set Form Data Email To User Email
    const getUserEmail = () => {

        let token = localStorage.getItem('token')
        const decodeToken = jwtDecode(token);
        let email = decodeToken.email
        setFormData(prev => ({
            ...prev,
            email: email
        }))

    }

    //Calls getUserEmail()
    useEffect(() => {
        getUserEmail()
    }, [])

    // Handles UserInfo Change 
    const onSubmitHandler = async (e) => {

        e.preventDefault();

        const token = localStorage.getItem('token');

        //Gets UserId From DB
        const getUserId = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/getUserId`, { token });
        const userId = getUserId.data.userId;

        //Gets Update The UserInfo
        const updateUser = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/updateUser`, { userId, userInfo: formData });

        if (updateUser.data.success) {
            toast.success(updateUser.data.message)
        }
    }

    // Handles Password Change Of User
    const PasswordChangeHandler = async (e) => {

        e.preventDefault();

        try {

            if (newPassword.password !== newPassword.confirmPassword) {
                return toast.error("New Password & Confirm Password Doesn't Match")
            }

            const token = localStorage.getItem('token');

            //Gets UserId From DB
            const getUserId = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/getUserId`, { token });
            const userId = getUserId.data.userId;

            //Gets Update The Password Of User
            const updateUserPass = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/updateUserPassword`, { userId, newPass: newPassword });

            if (updateUserPass.data.success) {
                toast.success(updateUserPass.data.message)
                setNewPassword({
                    oldpassword: '',
                    password: '',
                    confirmPassword: '',
                })
            }

        } catch (error) {
            toast.error(error.response.data.message)
        }

    }


    return (
        <>
            <Head>
                <title>MyAccount - ByteBazaar.com</title>
            </Head>

            {/* Account Details  */}
            <h1 className='text-3xl text-center font-bold pt-15'>Account Detail's</h1>
            <div className="my-10 max-w-3xl border px-4 shadow-xl sm:mx-4 sm:rounded-xl sm:px-4 sm:py-4 md:mx-auto">
                <div className="flex flex-col border-b py-4 sm:flex-row sm:items-start">
                    <div className="shrink-0 mr-auto sm:py-3">
                        <p className="font-semibold">Account Details</p>
                        <p className="text-sm text-gray-600">Edit your account details</p>
                    </div>
                    <button onClick={onSubmitHandler} type='submit' className="cursor-pointer hidden rounded-lg border-2 border-transparent bg-blue-600 px-4 py-2 font-medium text-white sm:inline focus:outline-none focus:ring hover:bg-blue-700">Save</button>
                </div>

                {/* Name  */}
                <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
                    <p className="shrink-0 w-32 font-medium">Name</p>
                    <input onChange={onChangeHandler} name='fullName' value={formData.fullName} placeholder="Full Name" className="mb-2 w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 sm:mr-4 sm:mb-0 focus:ring-1" />
                </div>

                {/* Email  */}
                <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
                    <p className="shrink-0 w-32 font-medium">Email (ReadOnly)</p>
                    <input readOnly onChange={onChangeHandler} name='email' value={formData.email} placeholder="your.email@domain.com" className="mb-2 w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 sm:mr-4 sm:mb-0 focus:ring-1" />
                </div>

                {/* Address  */}
                <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
                    <p className="shrink-0 w-32 font-medium">Address</p>
                    <textarea onChange={onChangeHandler} name='fullAddress' value={formData.fullAddress} placeholder="Enter your full address including street, city, and zip code" className="resize-none mb-2 w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 sm:mr-4 sm:mb-0 focus:ring-1" />
                </div>

                {/* Phone & Pincode  */}
                <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
                    <p className="shrink-0 w-32 pt-2 font-medium">Phone Number</p>
                    <input onChange={onChangeHandler} name='phone' value={formData.phone} placeholder="Phone Number" className="mb-2 w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 sm:mr-4 sm:mb-0 focus:ring-1" />
                    <p className="shrink-0 w-32 text-center pt-2 font-medium">ZipCode</p>
                    <input onChange={onChangeHandler} name='zipcode' value={formData.zipcode} placeholder="Zipcode" className="mb-2 w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 sm:mr-4 sm:mb-0 focus:ring-1" />
                </div>

                <div className="flex justify-end py-4 sm:hidden">
                    <button onClick={PasswordChangeHandler} className="cursor-pointer rounded-lg border-2 border-transparent bg-blue-600 px-4 py-2 font-medium text-white focus:outline-none focus:ring hover:bg-blue-700">Save</button>
                </div>
            </div>

            {/* Security  */}
            <h1 className='text-3xl text-center font-bold pt-2'>Security</h1>
            <div className="my-10 max-w-3xl border px-4 shadow-xl sm:mx-4 sm:rounded-xl sm:px-4 sm:py-4 md:mx-auto">
                <div className="flex flex-col border-b py-4 sm:flex-row sm:items-start">
                    <div className="shrink-0 mr-auto sm:py-3">
                        <p className="font-semibold">Change Password</p>
                    </div>
                    <button onClick={PasswordChangeHandler} className="cursor-pointer hidden rounded-lg border-2 border-transparent bg-blue-600 px-4 py-2 font-medium text-white sm:inline focus:outline-none focus:ring hover:bg-blue-700">Save</button>
                </div>

                {/* New Password  */}
                <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
                    <p className="shrink-0 w-35 pt-2 font-medium">Previous Password</p>
                    <input type='password' onChange={onPasswordChange} name='oldpassword' value={newPassword.oldpassword} placeholder="Enter Your Previous Password" className="mb-2 w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 sm:mr-4 sm:mb-0 focus:ring-1" />
                </div>

                {/* New Password  */}
                <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
                    <p className="shrink-0 w-35 pt-2 font-medium">New Password</p>
                    <input type='password' onChange={onPasswordChange} name='password' value={newPassword.password} placeholder="Enter Your New Password" className="mb-2 w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 sm:mr-4 sm:mb-0 focus:ring-1" />
                </div>

                {/* Confirm Password  */}
                <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
                    <p className="shrink-0 w-35 pt-2 font-medium">Confirm Password</p>
                    <input type='password' onChange={onPasswordChange} name='confirmPassword' value={newPassword.confirmPassword} placeholder="Confirm Your New Password" className="mb-2 w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 sm:mr-4 sm:mb-0 focus:ring-1" />
                </div>

                <div className="flex justify-end py-4 sm:hidden">
                    <button onClick={PasswordChangeHandler} className="cursor-pointer rounded-lg border-2 border-transparent bg-blue-600 px-4 py-2 font-medium text-white focus:outline-none focus:ring hover:bg-blue-700">Save</button>
                </div>
            </div>

        </>
    )
}

export default myaccount