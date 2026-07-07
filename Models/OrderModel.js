import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

    userId: { type: String, required: true },
    products: [{
        productId: { type: String },
        quantity: { type: Number, default: 1 },
    }],
    address: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, required: true, default: 'Order Placed' }
    
}, { timestamps: true })

const orderModel = mongoose.model.order || mongoose.model('order', orderSchema)
export default orderModel;
