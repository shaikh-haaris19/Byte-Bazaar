import "@/styles/globals.css";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer } from 'react-toastify';

export default function App({ Component, pageProps }) {

  const router = useRouter()

  const [cart, setCart] = useState({})
  const [subTotal, setSubTotal] = useState(0)
  const [user, setUser] = useState({ value: null })


  useEffect(() => {

    try {

      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")))
        saveCart(JSON.parse(localStorage.getItem("cart")))
      }

    } catch (error) {
      console.log(error)
      localStorage.clear()
    }

    let token = localStorage.getItem('token')
    if (token) {
      setUser({ value: token })
    }

  }, [router.query])

  const saveCart = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart))

    let subAmt = 0;
    let keys = Object.keys(cart)

    for (let i = 0; i < keys.length; i++) {
      subAmt += cart[keys[i]].qty * cart[keys[i]].price
    }
    setSubTotal(subAmt)
  }

  const addToCart = (id, qty, price, name, size, color) => {

    let newCart = { ...cart };

    if (id in cart) {
      newCart[id].qty += qty
    }
    else {
      newCart[id] = { qty: 1, price, name, size, color }
    }
    setCart(newCart)
    saveCart(newCart)

  }

  const BuyNow = (id, qty, price, name, size, color) => {

    let newCart = {}
    newCart[id] = { qty: 1, price, name, size, color }

    setCart(newCart)
    saveCart(newCart)

    router.push('/checkout')

  }

  const removeFromCart = (id, qty, price, name, size, color) => {

    let newCart = { ...cart };

    if (id in newCart) {
      newCart[id].qty -= qty
    }
    if (newCart[id].qty <= 0) {
      delete newCart[id]
    }

    setCart(newCart)
    saveCart(newCart)
  }

  const clearCart = () => {
    setCart({})
    saveCart({})
  }

  const LogOut = () => {
    localStorage.removeItem('token')
    setUser({ value: null })
  }

  return <>
    <Navbar user={user} LogOut={LogOut} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} />
    <ToastContainer autoClose={3000} theme="dark" />
    <Component cart={cart} BuyNow={BuyNow} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} {...pageProps} />
    <Footer />
  </>
}
