import mongoose from "mongoose"

const postSchema = mongoose.Schema({
    club: { type: mongoose.Schema.Types.ObjectId, ref: "Club" },
    description: { type: String },
    photo: { type: String }
}, { timestamps: true })

const Post = mongoose.model("Post", postSchema)

export default Post