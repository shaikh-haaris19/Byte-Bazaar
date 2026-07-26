// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import userModel from "../../../Models/UserModel";
import connectDB from '../../../MiddleWare/connectDB';
import CryptoJS from 'crypto-js'

const handler = async (req, res) => {

    if (req.method == 'POST') {

        let { userId, newPass } = req.body

        let user = await userModel.findById(userId)

        let bytes = CryptoJS.AES.decrypt(user.password, process.env.CRYPTOJS_SECRET_KEY);
        let decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);

        if (newPass.oldpassword === decryptedPassword) {

            await userModel.findByIdAndUpdate(userId, { password: CryptoJS.AES.encrypt(newPass.confirmPassword, process.env.CRYPTOJS_SECRET_KEY).toString() })

            res.status(200).json({ success: true, message: "User Password Changed SuccessFully!" });
        }
        else {
            res.status(400).json({ success: false, message: "Old Password Doesn't Match!" });
        }
    }
}

export default connectDB(handler);