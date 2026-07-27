import connectDB from "../../../MiddleWare/connectDB.js";
import userModel from "../../../Models/UserModel.js";
import ForgotPassModel from "../../../Models/ForgotPassModel.js"
import jwt from 'jsonwebtoken'
import CryptoJS from 'crypto-js'
import nodemailer from 'nodemailer'

const handler = async (req, res) => {

    if (req.method == 'POST') {

        const { email, sendMail } = req.body

        if (sendMail) {    //Send User PassWord Reset Mail

            //Check If User Exist In DB
            let user = await userModel.findOne({ email: email })
            if (!user) {
                return res.status(400).json({ success: false, message: "User Doesn't Exist!" });
            }

            //Send An Email To User
            var token = jwt.sign({ email: user.email }, process.env.JWT_SECRET_KEY, { expiresIn: '30m' });
            let forgotPassword = new ForgotPassModel({
                email: email,
                token: token
            })

            await forgotPassword.save()

            const message = {
                from: `"Support Team" <${process.env.GMAIL_USER}>`,
                to: email,
                subject: 'Reset Your Password',
                html: `
                    <p>Hello,</p>
                    <p>We received a request to reset your password. Click the link below to set a new password:</p>
                    <a href="http://localhost:3000/forgot?token=${token}">Reset Password</a>
                    <p>This link will expire in 30 minutes. If you didn’t request this, ignore this email.</p>
                    `,
            };

            try {
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.GMAIL_USER,
                        pass: process.env.GMAIL_PASS, // must be App Password
                    },
                    secure: true
                });

                await transporter.sendMail(message);
                return res.status(200).json({ success: true });

            } catch (err) {
                return res.status(500).json({ success: false, message: "Failed to send email" });
            }

        } else {

            const { token, newPassword } = req.body

            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            let userEmail = decoded.email

            await userModel.findOneAndUpdate({ email: userEmail }, { password: CryptoJS.AES.encrypt(newPassword, process.env.CRYPTOJS_SECRET_KEY).toString() })

            await ForgotPassModel.findOneAndDelete({ email: userEmail })

            res.status(200).json({ success: true });
        }

    } else {
        res.status(400).json({ message: "Wrong Method !" });
    }

}

export default connectDB(handler)