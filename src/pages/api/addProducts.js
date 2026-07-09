import connectDB from "../../../MiddleWare/connectDB.js";
import productModel from "../../../Models/ProductModel.js";

const handler = async (req, res) => {

    if (req.method == 'POST') {

        for (let i = 0; i < req.body.length; i++) {

            let newProduct = new productModel({

                title: req.body[i].title,
                slug: req.body[i].slug,
                description: req.body[i].description,
                image: req.body[i].image,
                category: req.body[i].category,
                sizes: req.body[i].sizes,
                color: req.body[i].color,
                price: req.body[i].price,
                availableQty: req.body[i].availableQty

            })
            await newProduct.save();
        }

        res.status(200).json({ success: true, message: "Product Added SuccessFully !" });

    } else {

        res.status(400).json({ message: "Wrong Method !" });

    }

}

export default connectDB(handler)