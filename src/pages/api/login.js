import connectDB from "../../../MiddleWare/connectDB.js";
import userModel from "../../../Models/UserModel.js";
import CryptoJS from 'crypto-js'

const handler = async (req, res) => {

    if (req.method == 'POST') {

        const { email, password } = req.body
        let user = await userModel.findOne({ email })

        //User Not Found
        if (!user) {
            res.status(401).json({ success: false, message: "Invalid Credential's !" });
        }

        //Invalid Password
        let bytes  = CryptoJS.AES.decrypt(user.password, process.env.CRYPTOJS_SECRET_KEY);
        let decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
        
        if (decryptedPassword !== password) {
            res.status(401).json({ success: false, message: "Invalid Credential's !" });
        }

        //Authenticated User
        res.status(200).json({ success: true, message: `Welcome ! ${user.name} ` });

    } else {

        res.status(400).json({ message: "Wrong Method !" });

    }

}

export default connectDB(handler)