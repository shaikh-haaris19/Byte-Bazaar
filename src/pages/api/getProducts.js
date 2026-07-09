import connectDB from "../../../MiddleWare/connectDB.js";
import productModel from "../../../Models/ProductModel.js";

const handler = async (req, res) => {

    let products = await productModel.find()
    res.status(200).json({ products });
}

export default connectDB(handler)