import connectDB from "../../../MiddleWare/connectDB.js";
import productModel from "../../../Models/ProductModel.js";

const handler = async (req, res) => {

    if (req.method == 'POST') {

        for (let i = 0; i < req.body.length; i++) {

            let newProduct = await productModel.findByIdAndUpdate(req.body[i]._id, req.body[i])

        }


        res.status(200).json({ success: true, message: "Product Updated SuccessFully !" });

    } else {

        res.status(400).json({ message: "Wrong Method !" });

    }

}

export default connectDB(handler)