import React, { useState } from 'react'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

const Login = () => {

  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (e) => {

    e.preventDefault();

    const userCredentials = {
      email,
      password
    }

    let res = await fetch("http://localhost:3000/api/login", {

      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(userCredentials)
    })

    let parsedRes = await res.json();

    if (parsedRes.success) {
      localStorage.setItem('token', parsedRes.token)

      toast.success(parsedRes.message, {
        position: "top-left",
        autoClose: 5000,
        theme: "dark",
      })

      router.push('/')

    } else {
      toast.error('Some Error Occured ! Please Try Again',{
        position: "top-left",
        autoClose: 5000,
        theme: "dark",
      });
    }

    setEmail('')
    setPassword('')

  }

  return (
    <section>
      <div className="flex flex-col items-center justify-start px-6 py-8 mx-auto md:h-screen lg:pt-8">

        {/* Logo  */}
        <Link href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
          <img className="w-40 h-20 mr-2" src="/Logo.png" alt="logo" />
        </Link>

        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">

            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>

            {/* Form  */}
            <form onSubmit={onSubmitHandler} className="space-y-4 md:space-y-6">

              {/* User Email  */}
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
                <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
              </div>

              {/* User PassWord  */}
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Password</label>
                <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
              </div>

              <div className="flex items-center justify-end">
                <Link href="/forgot" className="text-sm font-medium text-blue-600 hover:underline dark:text-primary-500">Forgot password?</Link>
              </div>

              <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
              <p className="text-sm font-light text-center text-gray-500 dark:text-gray-400">
                Don’t have an account yet? <Link href="/signUp" className="font-medium text-blue-600 hover:underline dark:text-primary-500">Sign up</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login
