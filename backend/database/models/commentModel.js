import mongoose from "mongoose"

const commentSchema = mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: { type: String },
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" }
}, { timestamps: true })

const Comment = mongoose.model("Comment", commentSchema)

export default Comment