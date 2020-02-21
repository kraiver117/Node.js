import jwt from 'jsonwebtoken'
import {Router} from 'express'
import userRepo from '../repositories/userRepo'

export const userController = Router()

userController.post('/login', async(req, res) => { const {email, password} = req.body
    const user = await userRepo.findByEmailAndPassword(email, password)
    if(user){
        jwt.sign( {email} , 'super-key-super-secret' , (err, token) => {
            res.status(200).json({token, message:'OK'})
        } )
    }else{
        res.status(404).json({message: 'Not found'})
    }
})

userController.post('/',async(req,res)=>{
    const user = await userRepo.saveUser(req.body)
    if(user) {
        res.status(200).json({ user, message:'OK' })
    }else{
        res.status(400).json({ message: 'bad request' })
    }
})

const checkToken = (req, res, next) => {
    const token = req.headers['authorization']

    jwt.verify(token, 'super-key-super-secret', (err, data)=> {
        if(err){
            res.status(400).json({err})
        }else{
            next()
        }
    })
}


userController.get('/:id', checkToken,  async (req, res) => {
    const id = req.params.id
    const user = await userRepo.findUserById(id)
    if(user){
        res.status(200).json({user, message: "OK"})

    }else{
        res.status(404).json({ message: 'User not found' })
    }
})

userController.delete('/:id', checkToken,  async (req, res) => {
    const id = req.params.id
    const user = await userRepo.findByIdAndDelete(id)
    if(user){
        res.status(200).json({user, message: "Ok "})

    }else{
        res.status(404).json({ message: 'User not found' })
    }
})

userController.patch('/:id',checkToken,async(req,res)=>{
    const id = req.params.id
    const user = await userRepo.updateUser(id,req.body)

    if(user){
        res.status(200).json({user, message: "Password change"})
    }else{
        res.status(404).json({ message: 'User not found' })
    }
})