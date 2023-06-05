import User from "../database/models/userModel.js"
import generateToken from "../utils/generateToken.js"
import expressAsyncHandler from "express-async-handler"

export const registerUser = expressAsyncHandler(async (req, res) => {
    const { name, email, password, pic, isAdmin } = req.body

    if (!name || !email || !password) {
        res.status(400).json({ message: "Please Fill All The Fields" })
        throw new Error("Enter All Ahe Fields")
    }

    const isUserExist = await User.findOne({ email })

    if (isUserExist) {
        res.status(400).json({ message: "User Already Exists" })
        throw new Error("User Already Exists")
    }

    const user = await User.create({ name, email, password, pic, isAdmin })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            isAdmin: user.isAdmin,
            token: generateToken()
        })
    } else {
        res.status(400).json({ message: "Failed To Register" })
        throw new Error("User Not Found")
    }
})

export const loginUser = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(401).json({ message: "Invalid Email Or Password" })
        throw new Error({ message: "Invalid Email Or Password" })
    }
})

export const allUser = expressAsyncHandler(async (req, res) => {
    const search = req.query.search ? {
        $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
        ],
    } : {}

    const users = await User.find(search).find({ _id: { $ne: req.user._id } }).select("-password")
    res.send(users)
})