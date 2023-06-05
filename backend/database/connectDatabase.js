import mongoose from "mongoose"

const connectDatabase = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log(`MongoDB connected to ${conn.connection.host}`)
    } catch (error) {
        console.log(`error: ${error.message}`)
        process.exit()
    }
};

export default connectDatabase