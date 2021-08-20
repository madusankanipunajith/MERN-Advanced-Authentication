const User = require('../models/User');
const bcrypt = require('bcryptjs');
const ErrorResponse = require('../utils/errorResponse');

exports.register = async (req, res, next) =>{
    const {username, email, password} = req.body;

    try{
        const user = await User.create({
            username, email, password
        });

        sendToken(user, 201, res);
    }catch(err){
        next(err);
    }
}

exports.login = async (req, res, next) =>{
    const {email, password} = req.body;


    if(!email || !password){
        //res.status(400).json({success: false, error: "Please provide email and password"});
        return next(new ErrorResponse("Please provide an email and password",400));
    }

    try{
        const user = await User.findByCredentials(email, password);
        sendToken(user, 200, res);
    }catch(e){
        return next(new ErrorResponse("Invalid Credentials",401));
    }

}

exports.forgotpassword = async (req, res, next) =>{
    const {email} = req.body;

    try{

        const user = await User.findOne({email});
        if(!user){
            return next(new ErrorResponse("Email could not be sent",404))
        }

        const resetToken = user.getResetPasswordToken();
        await user.save();

        const resetUrl = `http://localhost:3001/passwordreset/${resetToken}`;
        const message = `
        <h1> You have requested a password reset </h1>
        <P>Please go to this link to reset your password</p>
        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
        `

        try{

        }catch(error){

        }

    }catch(error){

    }
}

exports.resetpassword = (req, res, next) =>{
    res.send("Reset Password Route");
}

const sendToken = (user, statusCode, res)=>{
    const token = user.getSignedToken()
    res.status(statusCode).json({success: true, token})
}