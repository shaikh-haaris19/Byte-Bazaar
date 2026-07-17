// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectDB from '../../../MiddleWare/connectDB';
import orderModel from '../../../Models/OrderModel';

const handler = async (req, res) => {

    if (req.method == 'POST') {

        let { userId } = req.body
        let allOrders = await orderModel.find({ userId })

        res.status(200).json({ allOrders });
    }
}

export default connectDB(handler);