import User, { IUser } from '../models/user'
import mongoose from 'mongoose'
import { userController } from '../controllers/userController';



const findUserById=async (id) =>{
    return await User.findById(id);
}

const findByEmailAndPassword = async (email, password) => {
    return await User.findOne({email, password})
}

const saveUser = async (user) => {
    const newUser = new User({
        _id : new mongoose.Types.ObjectId(),
        email : user.email,
        password : user.password
    })
    return await newUser.save()
}

const updateUser= async(id,body)=>{
    const user:IUser=(await findUserById(id)) as IUser
    user.password=body.password

    return await user.save()
}

const findByIdAndDelete = async (id) =>{
    return await User.findByIdAndDelete(id)
}

export default{saveUser,findByEmailAndPassword,findByIdAndDelete,findUserById,updateUser}