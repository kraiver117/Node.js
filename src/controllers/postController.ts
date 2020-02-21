import jwt from 'jsonwebtoken'
import {Router} from 'express'
import postRepo from '../repositories/postRepo'
import {IPost} from '../models/post'
import Comment from '../models/comment'

export const postController = Router()



const checkToken = (req, res, next) => {
    const token = req.headers['authorization']

    jwt.verify(token, 'super-key-super-secret', (err, data) => {
        if (err) {
            res.status(400).json({ err })
        } else {
            next()
        }
    })
}


//create a post
postController.post('/',async (req,res)=>{
    //const decodedToken = jwt.decode(req.headers['authorization'])
    const post = await postRepo.createPost(req.body)
    if (post) {
        res.status(200).json({ message: 'OK', post })
    } else {
        res.status(400).json({ message: 'bad request', post })
    }
} )

//delete a post
postController.delete('/:id',checkToken,async (req,res)=>{
    const id=req.params.id
    const post = await postRepo.deletePost(id)
    if (post) {
        res.status(200).json({ message: 'Delete post:', post })
    } else {
        res.status(400).json({ message: 'Not found', post })
    }
} )


//Get a post by id
postController.get('/:id',checkToken, async(req,res)=>{
    const id=req.params.id
    const post =await postRepo.findPostById(id)

    if(post){
        res.status(200).json({post:post})
    }else{
        res.status(404).json({message:"Post not found 404"})
    }
})

//Comment a post
postController.post('/:id/comment',checkToken,async(req,res)=>{
    const id=req.params.id
    const comment = await postRepo.commentPost(req.body)
    const post:IPost = <IPost>(await postRepo.findPostById(id))

    if(post){   
        post.comments.push(comment)
        post.totalComments = post.totalComments + 1
        post.save()
        res.status(200).json({post}).populate('author comments')
    }else{
        res.status(404).json({ message: 'Error not found' })
    }
})

//update a post
postController.patch('/:id',checkToken,async(req,res)=>{
    const id=req.params.id
    const post= await postRepo.updatePost(id,req.body)

    if(post){
        res.status(200).json({message: 'Post modified correctly'})

    }else{
        res.status(404).json({ message: 'Post not found' })
    }
})
