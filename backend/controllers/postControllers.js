import expressAsyncHandler from "express-async-handler"
import Post from "../database/models/postModel.js"

export const createPost = expressAsyncHandler(async (req, res) => {
    const { club, description, photo } = req.body

    if (!club || !description || !photo) {
        res.status(400).json("Please Fill All the Fields")
        throw new Error("fill all the fields")
    }

    const post = await Post.create({ club, description, photo })

    if (post) {
        res.status(200).json("Post Created Successfully")
    } else {
        res.status(400).json("Failed To Create Post")
        throw new Error("Failed to Create Post")
    }
})

export const fetchPost = expressAsyncHandler(async (req, res) => {
    const { clubId } = req.body

    if (!clubId) {
        res.status(400).json("Please Fill All the Fiedls")
        throw new Error("fill all fiedls")
    }

    try {
        Post.find({ club: { $eq: clubId } }).sort({ updatedAt: -1 }).then((results) => { res.status(200).send(results) })
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
})

export const deletePost = expressAsyncHandler(async (req, res) => {

})