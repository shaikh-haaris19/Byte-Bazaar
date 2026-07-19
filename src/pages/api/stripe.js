// pages/api/stripe.js
import Stripe from 'stripe';
import orderModel from "../../../Models/OrderModel";
import productModel from '../../../Models/ProductModel';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { userId, items, amount, address } = req.body;

    //Check If Cart Is Tempered 
    let sumTotal = 0;
    let product;
    for (let item in items) {

      product = await productModel.findOne({ slug: item })

      if (!product) {
        return res.status(400).json({ success: false, message: "Invalid product" });
      }

      sumTotal += items[item].price * items[item].qty
      if (items[item].price !== product.price) {
        return res.status(400).json({ success: false, message: "Something Went Wrong! Try Again" })
      }

      //Out Of Stock
      if (product.availableQty < items[item].qty) {
        return res.status(400).json({ success: false, message: `Product : '${item}' Is Out Of Stock !` })
      }
    }

    //No Product In Cart
    if (sumTotal === 0) {
      return res.status(400).json({ success: false, message: "No Product In The Cart" })
    }

    //Product Amount Tempered
    if (sumTotal !== amount) {
      return res.status(400).json({ success: false, message: "Something Went Wrong! Try Again" })
    }

    //Check If Details Are Valid 
    if (address.phone.length !== 10) {
      return res.status(400).json({ success: false, message: "Please Enter 10 Digit Phone Number !" })
    }
    if (address.zipcode.length !== 6 || !Number.isInteger(Number(address.zipcode))) {
      return res.status(400).json({ success: false, message: "Invalid Pincode !" })
    }


    const newOrder = await orderModel.create({
      userId,
      orderId: Math.floor(Date.now() * Math.random()),
      items,
      amount,
      address,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    });

    // Build line items for Stripe
    const line_items = Object.keys(items).map((item) => ({
      price_data: {
        currency: "inr",
        product_data: { name: items[item].name },
        unit_amount: items[item].price * 100, // paise
      },
      quantity: items[item].qty,
    }));

    // Optional delivery charge
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: { name: "Delivery Charges" },
        unit_amount: 5000, // e.g. ₹50
      },
      quantity: 1,
    });

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      success_url: `${process.env.NEXT_PUBLIC_HOST}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_HOST}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
}
