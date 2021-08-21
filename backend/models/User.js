const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required: [true, "please provide a username"]
    },
    email:{
        type:String,
        required: [true, "please provide an email"],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please provide a valid email"]
    },
    password:{
        type:String,
        required: [true, "please add a password"],
        minlength: 6        
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date

});

UserSchema.statics.findByCredentials = async(email, password) => {

    const user = await User.findOne({email});

    if(!user){
        throw new Error({error: 'Unable to Login'})
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        //console.log('mis match');
        throw new Error({error: 'Unable to Login'})
    }
    
    return user;
}

UserSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }
    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

UserSchema.methods.getSignedToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE})
}

UserSchema.methods.getResetPasswordToken = function (){

    const resetToken = crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExpire = Date.now() + 10*(60*1000);

    return resetToken;
}


const User = mongoose.model('user', UserSchema);
module.exports = User;