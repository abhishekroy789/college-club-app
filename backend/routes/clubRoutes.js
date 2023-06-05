import express from "express"
import protect from "../middleware/authMiddleware.js"
import { addToClub, createClub, fetchMyClubs, fetchOtherClubs, removeFromClub, sendRequest } from "../controllers/clubControllers.js"

const router = express.Router()

router.post("/create", protect, createClub)
router.put("/add", protect, addToClub)
router.put("/remove", protect, removeFromClub)
router.get("/fetchmy/:userId", protect, fetchMyClubs)
router.get("/fetchother/:userId", protect, fetchOtherClubs)
router.put("/send", protect, sendRequest)

export default router