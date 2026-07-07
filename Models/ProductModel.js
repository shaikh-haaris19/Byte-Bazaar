import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    image: { type: Array, required: true },
    category: { type: String, required: true },
    sizes: { type: Array, required: true },
    color: { type: String },
    price: { type: Number, required: true },
    availableQty: { type: Number, required: true }
    
}, { timestamps: true })

const productModel = mongoose.model.product || mongoose.model('product', productSchema)
export default productModel;
