import connectDB from "../../../MiddleWare/connectDB.js";
import userModel from "../../../Models/UserModel.js";
import CryptoJS from 'crypto-js'

const handler = async (req, res) => {

    if (req.method == 'POST') {

        const { name, email, password } = req.body
        let newUser = new userModel({
            name,
            email,
            password: CryptoJS.AES.encrypt(password, process.env.CRYPTOJS_SECRET_KEY).toString() 
        })

        await newUser.save()
        res.status(200).json({ success: true, message: "Account Created SuccessFully !" });

    } else {

        res.status(400).json({ message: "Wrong Method !" });

    }

}

export default connectDB(handler)