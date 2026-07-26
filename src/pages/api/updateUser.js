// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import userModel from "../../../Models/UserModel";
import connectDB from '../../../MiddleWare/connectDB';

const handler = async (req, res) => {

    if (req.method == 'POST') {

        let { userId, userInfo } = req.body
        await userModel.findByIdAndUpdate(userId, { name: userInfo.fullName, address: userInfo.fullAddress, phone: userInfo.phone, zipcode: userInfo.zipcode })

        res.status(200).json({ success: true, message: "User Updated SuccessFully!" });
    }
}

export default connectDB(handler);