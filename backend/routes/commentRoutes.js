import express from "express"
import protect from "../middleware/authMiddleware.js"
import { createComment, fetchComment } from "../controllers/commentControllers.js"

const router = express.Router()

router.post("/create", protect, createComment)
router.get("/fetch/:post", protect, fetchComment)

export default router