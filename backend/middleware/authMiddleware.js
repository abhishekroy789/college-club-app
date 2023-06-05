import jwt from "jsonwebtoken"
import User from "../database/models/userModel.js"
import expressAsyncHandler from "express-async-handler"

const protect = expressAsyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1]

            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decoded.id).select("-password")

            next()
        } catch (error) {
            res.status(401).json({ message: "Not Authorized, Token Failed" })
            throw new Error({ message: "Not Authorized, Token Failed" })
        }
    }

    if (!token) {
        res.status(401).json({ message: "Not authorized, No token" })
        throw new Error({ message: "Not authorized, No token" })
    }
})

export default protect