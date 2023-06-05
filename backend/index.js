import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import userRoutes from "./routes/userRoutes.js"
import connectDatabase from "./database/connectDatabase.js"
import clubRoutes from "./routes/clubRoutes.js"
import postRoutes from "./routes/postRoutes.js"
import commentRoutes from "./routes/commentRoutes.js"

dotenv.config()
const PORT = process.env.PORT
const app = express()
app.use(express.json())
app.use(cors())
connectDatabase()

app.get("/", (req, res) => {
    res.send("server is running")
})

app.use("/api/v1/user", userRoutes)
app.use("/api/v1/club", clubRoutes)
app.use("/api/v1/post", postRoutes)
app.use("/api/v1/comment", commentRoutes)

const server = () => {
    try {
        app.listen(PORT, () => {
            console.log("server is running")
        })
    } catch (error) {
        console.log(error)
    }
}

server()