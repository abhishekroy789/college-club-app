import Club from "../database/models/clubModel.js"
import expressAsyncHandler from "express-async-handler"

export const createClub = expressAsyncHandler(async (req, res) => {
    const { clubName, clubIncharge, clubMoto, clubPic } = req.body

    if (!clubName || !clubIncharge || !clubMoto || !clubPic) {
        res.status(400).json({ message: "Please Fill All The Fields" })
        throw new Error("Enter All Ahe Fields")
    }

    try {
        const club = await Club.create({
            clubName: clubName,
            clubIncharge: clubIncharge,
            clubMembers: clubIncharge,
            clubMoto: clubMoto,
            clubPic: clubPic
        })

        const fullClub = await Club.findOne({ _id: club._id }).populate("clubMembers", "-password").populate("clubIncharge", "-password").populate("clubRequest", "-password")

        res.status(200).json(fullClub)
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})

export const addToClub = expressAsyncHandler(async (req, res) => {
    const { clubId, userId } = req.body

    if (!clubId || !userId) {
        res.status(400).json({ message: "Please Fill All The Fields" })
        throw new Error("Enter All Ahe Fields")
    }

    const addedUser = await Club.findByIdAndUpdate(clubId, { $push: { clubMembers: userId }, $pull: { clubRequest: userId } }, { new: true }).populate("clubMembers", "-password").populate("clubIncharge", "-password").populate("clubRequest", "-password")

    if (!addedUser) {
        res.status(404);
        throw new Error("Club Not Found");
    } else {
        res.json(addedUser)
    }
})

export const removeFromClub = expressAsyncHandler(async (req, res) => {
    const { clubId, userId } = req.body

    if (!clubId || !userId) {
        res.status(400).json({ message: "Please Fill All The Fields" })
        throw new Error("Enter All Ahe Fields")
    }

    const removedUser = await Club.findByIdAndUpdate(clubId, { $pull: { clubMembers: userId } }, { new: true }).populate("clubMembers", "-password").populate("clubIncharge", "-password").populate("clubRequest", "-password")

    if (!removedUser) {
        res.status(404);
        throw new Error("Club Not Found");
    } else {
        res.json(removedUser)
    }
})

export const fetchMyClubs = expressAsyncHandler(async (req, res) => {
    try {
        Club.find({ clubMembers: { $elemMatch: { $eq: req.params.userId } } }).populate("clubMembers", "-password").populate("clubIncharge", "-password").populate("clubRequest", "-password").then((results) => {
            res.status(200).send(results)
        })

    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})

export const fetchOtherClubs = expressAsyncHandler(async (req, res) => {
    try {
        Club.find({ clubMembers: { $elemMatch: { $ne: req.params.userId } } }).populate("clubMembers", "-password").populate("clubIncharge", "-password").populate("clubRequest", "-password").then((results) => {
            res.status(200).send(results)
        })

    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})

export const sendRequest = expressAsyncHandler(async (req, res) => {
    const { clubId, userId } = req.body

    if (!clubId || !userId) {
        res.status(400).json("Please Fill All The Fields")
        throw new Error("Enter All Ahe Fields")
    }

    const isRequestSend = await Club.findOne({ clubRequest: { $elemMatch: { $eq: userId } } })

    const isMember = await Club.findOne({ clubMembers: { $elemMatch: { $eq: userId } } })

    if (isRequestSend) {
        res.status(400).json("Request Already Sent")
        throw new Error("Request Already Sent")
    }

    if (isMember) {
        res.status(400).json("You are already an member")
        throw new Error("you are already a member")
    }

    const addedReq = await Club.findByIdAndUpdate(clubId, { $push: { clubRequest: userId } }, { new: true }).populate("clubMembers", "-password").populate("clubIncharge", "-password").populate("clubRequest", "-password")

    if (!addedReq) {
        res.status(404);
        throw new Error("Club Not Found");
    } else {
        res.json(addedReq)
    }
})