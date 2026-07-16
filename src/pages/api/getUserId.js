// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import jwt from 'jsonwebtoken'
import userModel from "../../../Models/UserModel";
import connectDB from '../../../MiddleWare/connectDB';

const handler = async (req, res) => {

    if (req.method == 'POST') {

        let { token } = req.body
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        let email = decodeToken.email
        const user = await userModel.find({ email })

        res.status(200).json({ userId: user[0]._id });
    }
}

export default connectDB(handler);