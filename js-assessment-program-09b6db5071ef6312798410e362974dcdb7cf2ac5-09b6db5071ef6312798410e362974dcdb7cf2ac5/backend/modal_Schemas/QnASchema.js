import mongoose from 'mongoose';
const QnASchema = new mongoose.Schema({
    email:{
        type: String,
    },
    project_id:{
        type: String,
    },
    question:{
        type: String,
    },
    answer:{
        type: Array
    }
})
export default mongoose.model("QnACollection",QnASchema)
