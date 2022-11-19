const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/UserModel')
const dotenv = require('dotenv').config();

const protect = asyncHandler(async(req,res,next) =>{

    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('JWT')){

        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token,process.env.TOKEN_KEY);

            req.user = await User.findById(decoded.user_id).select('-password')
            next();
        } catch (error) {
            res.status(401).json({'message':error})
        }
    }else{
        res.status(400).json({'message':"token not provided"})
    }
})

module.exports = protect;
