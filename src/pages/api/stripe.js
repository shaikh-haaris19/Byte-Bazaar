// pages/api/stripe.js
import Stripe from 'stripe';
import orderModel from "../../../Models/OrderModel";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { userId, items, amount, address } = req.body;

    //Check If Cart Is Tempered -- Pending

    //Check If Details Are Valid -- Pending


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
