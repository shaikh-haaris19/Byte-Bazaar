import "@/styles/globals.css";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {

  const [cart, setCart] = useState({})
  const [subTotal, setSubTotal] = useState(0)


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

  }, [])

  const saveCart = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart))

    let subAmt = 0;
    let keys = Object.keys(cart)

    for (let i = 0; i < keys.length; i++) {
      subAmt += cart[keys[i]].qty * cart[keys[i]].price
    }
    setSubTotal(subAmt)
  }

  const addToCart = (id, qty, price, name, size) => {

    let newCart = { ...cart };

    if (id in cart) {
      newCart[id].qty += qty
    }
    else {
      newCart[id] = { qty: 1, price, name, size }
    }
    setCart(newCart)
    saveCart(newCart)

  }

  const removeFromCart = (id, qty, price, name, size) => {

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

  return <>
    <Navbar cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} />
    <Component cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} {...pageProps} />
    <Footer />
  </>
}
