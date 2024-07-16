const mongoose = require('mongoose')
const { type } = require('os')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        require:true,
        trim:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    dob:{
        type:Date,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    address:{
        type:{},
        require:true
    },
    role:{
        type:Number,
        default:0
    },
    phone:{
        type:String,
        require:true
    },
    answer:{
        type:String,
        require:true,
        trim:true
    }
})

module.exports = mongoose.model("users",userSchema);