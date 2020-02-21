import Post, { IPost } from '../models/post'
import User from '../models/user'
import Comment from '../models/comment'
import mongoose, { mongo, get } from 'mongoose'
import { postController } from '../controllers/postController'




const createPost = async (body) =>{
    const newPost= new Post({
        _id: new mongoose.Types.ObjectId(),
        title:body.title,
        date:body.date,
        author:body.author,
        comments:[],
        totalComments:0,
        content:body.content
    })
    return await newPost.save()
}

const deletePost=async (id)=>{
    return await Post.findByIdAndDelete(id);
}

const findPostById = async (id) => {
    return await Post.findById(id).populate('author comments')
}

const commentPost = async (post) => {
    const newComment = new Comment({
        _id: new mongoose.Types.ObjectId(),
        comment: post.comment,
        date: post.date,
        author: post.author
    })
    return await newComment.save()
}

const updatePost = async (id, body) => {
    const post:IPost=(await findPostById(id)) as IPost
    post.title=body.title
    post.content=body.content
    //post.date=body.date
    return await post.save()
}

//Comment a Post 

export default{
    createPost,
    deletePost,
    findPostById,
    updatePost,
    commentPost
}