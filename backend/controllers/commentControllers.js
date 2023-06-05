import expressAsyncHandler from "express-async-handler";
import Comment from "../database/models/commentModel.js";

export const createComment = expressAsyncHandler(async (req, res) => {
    const { post, content, userId } = req.body

    if (!post || !content) {
        res.status(400).json("Please Fill All the Fields")
        throw new Error("fill all the fields")
    }


    const comment = Comment.create({
        sender: userId,
        post: post,
        content: content
    })

    if (comment) {
        res.status(200).json("Comment Created Successfully")
    } else {
        res.status(400).json("Failed To Create comment")
        throw new Error("Failed to Create comment")
    }
})

export const fetchComment = expressAsyncHandler(async (req, res) => {
    try {
        const comment = await Comment.find({ post: req.params.post })
            .populate("sender", "name pic")

        res.json(comment);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
})