import mongoose from 'mongoose'

    // DB Connection  
const db = "mongodb+srv://projectmanagement:projectapp@cluster0.qkdx2.mongodb.net/projectwebapp";
export const connectdb = async () => {
    try {
        await mongoose.connect(db, { useNewUrlParser: true })
        console.log("mongo connected");
    }
    catch (err) {
        console.log(err.message)
    }

}