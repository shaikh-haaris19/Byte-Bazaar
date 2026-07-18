import orderModel from "../../../Models/OrderModel";
import productModel from "../../../Models/ProductModel";

export default async function handler(req, res) {

  const { orderId, success } = req.body;

  try {

    if (success === "true") {
      let userOrder = await orderModel.findByIdAndUpdate(orderId, { payment: true });

      //Update Product Inventory
      let userCart = userOrder.items
      for (let item in userCart) {
        await productModel.findOneAndUpdate({ slug: item }, { $inc: { "availableQty": -userCart[item].qty } })
      }

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
