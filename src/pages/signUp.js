import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

const SignUp = () => {

  const router = useRouter()

  // If User If Already LoggedIn 
    useEffect(()=>{
    if(localStorage.getItem('token')){
      router.push('/')
    }
  },[])
  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const onSubmitHandler = async (e) => {

    e.preventDefault();

    const userCredentials = {
      name,
      email,
      password
    }

    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signUp`, {

      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(userCredentials)
    })

    let parsedRes = await res.json();

    if (parsedRes.success) {
      toast.success(parsedRes.message, {
        position: "top-left",
        autoClose: 5000,
        theme: "dark",
      })
    } else {
      toast.error('Some Error Occured !, Please Try Again',{
        position: "top-left",
        autoClose: 5000,
        theme: "dark",
      });
    }

    setName('')
    setEmail('')
    setPassword('')

  }

  return (
    <section>
      <div className="flex flex-col items-center justify-start px-6 py-8 mx-auto md:h-screen">

        {/* Logo  */}
        <Link href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
          <img className="w-40 h-20 mr-2" src="/Logo.png" alt="logo" />
        </Link>

        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">

            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign Up to your account
            </h1>

            {/* Form  */}
            <form onSubmit={onSubmitHandler} method='POST' className="space-y-4 md:space-y-3" action="#">

              {/* User Name  */}
              <div>
                <label htmlFor="userName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">UserName</label>
                <input onChange={(e) => setName(e.target.value)} value={name} type="text" name="userName" id="userName" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
              </div>

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

              {/* SignIn Button  */}
              <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm mt-3 px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>

              <p className="text-sm font-light text-gray-500 text-center dark:text-gray-400">
                Already Have An Account? <Link href="/login" className="font-medium text-blue-600 hover:underline dark:text-primary-500">Sign In</Link>
              </p>
            </form>

          </div>
        </div>
      </div>
    </section>
  )
}

export default SignUp
