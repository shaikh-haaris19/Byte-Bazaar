import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Head from 'next/head'
import axios from 'axios'
import { toast } from 'react-toastify'

const forgot = () => {

    const router = useRouter()

    // If User If Already LoggedIn 
    useEffect(() => {
        if (localStorage.getItem('token')) {
            router.push('/')
        }
    }, [])

    const [userEmail, setUserEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [cnewPassword, setcNewPassword] = useState('')

    //Reset Password -> Sent Email To Reset Password
    const sendResetPasswordEmail = async (e) => {

        e.preventDefault()

        let data = {
            email: userEmail,
            sendMail: true
        }

        const res = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/forgotPass`, data);

        if (res.data.success) {
            toast.success("Please Check Your Email To Reset Password!")
        }

    }

    const resetPassword = async (e) => {

        e.preventDefault()

        let data = {
            newPassword,
            sendMail: false,
            token: router.query.token
        }

        const res = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/forgotPass`, data);

        if (res.data.success) {
            toast.success(`Password Has Been SuccessFully Changed!`)
            router.push('/')
        } else {
            toast.error('Some Error Occured! Please Try Again')
        }

    }

    return (
        <>
            <Head>
                <title>ForgotPassword - ByteBazaar.com</title>
            </Head>
            <section>
                <div className="flex flex-col items-center justify-start px-6 py-8 mx-auto md:h-screen lg:pt-15">
                    <Link href="/" className="flex items-center mb-2 text-2xl font-semibold text-gray-900">
                        <img className="w-40 h-20 mr-2" src="/Logo.png" alt="logo" />
                    </Link>
                    <p className="text-sm mb-5 font-light text-center text-gray-500 dark:text-gray-400">
                        Don’t have an account yet? <Link href="/signUp" className="font-medium text-blue-600 hover:underline dark:text-primary-500">Sign up</Link>
                    </p>
                    {
                        router.query.token && <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    Create New Password
                                </h1>
                                <form className="space-y-4 md:space-y-4" action="#">
                                    <div>
                                        <label htmlFor="nPass" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">New Password</label>
                                        <input onChange={(e) => setNewPassword(e.target.value)} value={newPassword} type="password" name="nPass" id="nPass" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                    </div>
                                    <div>
                                        <label htmlFor="cnPass" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Confirm New Password</label>
                                        <input onChange={(e) => setcNewPassword(e.target.value)} value={cnewPassword} type="password" name="cnPass" id="cnPass" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                    </div>
                                    <div>
                                        <button disabled={newPassword.length < 6 && newPassword !== cnewPassword} onClick={resetPassword} type="submit" className="cursor-pointer w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 disabled:hover:bg-blue-600 dark:focus:ring-primary-800 disabled:opacity-30">Continue</button>
                                        {
                                            newPassword.length > 0 && newPassword.length < 6 &&
                                            <p className='text-red-500 text-xs mt-2 mx-2 text-center'>Password must be at least 6 characters</p>
                                        }
                                        {
                                            newPassword && cnewPassword && newPassword !== cnewPassword &&
                                            <p className='text-red-500 text-xs mt-2 mx-2 text-center'>Passwords do not match</p>
                                        }
                                    </div>
                                </form>
                            </div>
                        </div>
                    }
                    {
                        !router.query.token &&
                        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    Forgot Password ?
                                </h1>
                                <form className="space-y-4 md:space-y-6" action="#">
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
                                        <input onChange={(e) => setUserEmail(e.target.value)} value={userEmail} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                    </div>
                                    <button onClick={sendResetPasswordEmail} type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Continue</button>
                                </form>
                            </div>
                        </div>
                    }
                </div>
            </section >
        </>
    )
}

export default forgot
