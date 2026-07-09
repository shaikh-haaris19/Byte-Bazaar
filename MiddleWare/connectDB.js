import mongoose from "mongoose";

const connectDB = (handler) => async (req, res) => {

    mongoose.connection.on('connected', () => {
        console.log('DB CONNECTED SUCCESSFULLY');
    })

    await mongoose.connect(process.env.MONGODB_URI)

    return handler(req, res);

}

export default connectDB;