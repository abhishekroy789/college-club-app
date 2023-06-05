import mongoose from "mongoose"

const clubSchema = mongoose.Schema({
    clubName: { type: String },
    clubIncharge: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    clubMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    clubMoto: { type: String, default: "" },
    clubPic: {
        type: String,
        default: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
    },
    clubRequest: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
})

const Club = mongoose.model("Club", clubSchema)

export default Club