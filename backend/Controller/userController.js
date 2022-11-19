const asyncHandler = require('express-async-handler');
const User = require('../models/UserModel');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

//DESC =  CREATE NEW USER
//METHOD = POST
//ROUTE = API/USERS/REGISTER
const registerUser = asyncHandler(async(req,res)=>{
    const {username,email,password} = req.body;

    if(!username || !email || !password){
        res.status(401).json({'message':'invalid data passed'})
    }

    const oldUser = await User.findOne({email})

    if(oldUser){
        res.status(401).json({'message':'User is already present'})
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt)

    const user = await User.create({
       username,
       email,
       password:hashedPassword
    })

    if(!user){
        res.status(404).json({'message':'user not created'})
    }

    const token = jwt.sign(
        {
            user_id:user.id,email
        },process.env.TOKEN_KEY,{
            expiresIn:"2h"
        }
    )

    // user.token = token

    // console.log("token ==",token)
    res.json({message:'register user',user,token})
})

//DESC =  LOGIN USER
//METHOD = POST
//ROUTE = API/USERS/REGISTER
const login = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;

    if(!email || !password){
        res.status(200).json({'message':'all inputs are required'})
    }

    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password,user.password))){
        const token = jwt.sign(
            {
                user_id:user.id
            },process.env.TOKEN_KEY,{
                expiresIn:"2h"
            }
        )

        user.token = token;

        res.status(200).json({'message':'user loged in',user,token});
    }else{
        res.status(404).json({'message':"problem in authenticate"})
    }

    // res.json({message:'login user',name:req.body.name})
});

const currentUser = asyncHandler(async(req,res)=>{
    res.json({message:'currentUser',user:req.user})
})

const editUser = asyncHandler(async(req,res)=>{
    res.json({'message':'edit user',id:req.params.user})
});


module.exports = { registerUser,login,editUser,currentUser }