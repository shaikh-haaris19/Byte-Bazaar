import orderModel from "../../../Models/OrderModel";

export default async function handler(req, res) {

  const { orderId, success } = req.body;

  try {

    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      return res.json({ success: true });

    } else {
      await orderModel.findByIdAndDelete(orderId);
      return res.json({ success: false });
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
}
