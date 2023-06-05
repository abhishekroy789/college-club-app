import express from "express"
import { allUser, loginUser, registerUser } from "../controllers/userControllers.js"
import protect from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/search", protect, allUser)

export default router