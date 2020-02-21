import mongoose from 'mongoose'

const connectDB = () => {
    return mongoose.connect('mongodb://localhost:27017/blog' , { useNewUrlParser: true })
}

export { connectDB }