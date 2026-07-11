import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    image: { type: Array, required: true },
    category: { type: String, required: true },
    size: { type: String, required: true },
    color: { type: String },
    price: { type: Number, required: true },
    availableQty: { type: Number, required: true }

}, { timestamps: true })

const productModel = mongoose.models.product || mongoose.model('product', productSchema)
export default productModel;
