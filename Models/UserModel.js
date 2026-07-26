import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, default: '' },
    phone: { type: String, default: '' },
    zipcode: { type: String, default: '' },

}, { timestamps: true })

const userModel = mongoose.models.user || mongoose.model('user', userSchema)
export default userModel;