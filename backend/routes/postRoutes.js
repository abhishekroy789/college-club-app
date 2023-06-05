import express from "express"
import protect from "../middleware/authMiddleware.js"
import { createPost, deletePost, fetchPost } from "../controllers/postControllers.js"

const router = express.Router()

router.post("/create", protect, createPost)
router.post("/fetch", protect, fetchPost)
router.delete("/delete", protect, deletePost)

export default router