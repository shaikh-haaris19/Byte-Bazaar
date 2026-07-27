import mongoose from "mongoose";

const ForgotPassSchema = new mongoose.Schema({

    email: { type: String, required: true },
    token: { type: String, required: true },

}, { timestamps: true })

const userModel = mongoose.models.forgotPass || mongoose.model('forgotPass', ForgotPassSchema)
export default userModel;