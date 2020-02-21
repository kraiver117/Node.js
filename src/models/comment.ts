import mongoose, {Schema} from "mongoose";

const commentSchema= new mongoose.Schema({
    _id:Schema.Types.ObjectId,
    comment:String,
    author: {type:Schema.Types.ObjectId,ref:'User'},
    date:String
})

const Comment = mongoose.model('Comment',commentSchema)
export  default Comment