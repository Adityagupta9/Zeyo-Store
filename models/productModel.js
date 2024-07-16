const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    category:{
        type:mongoose.ObjectId,
        ref:'category',
        required:true
    },
    photo:{
        data:Buffer,
        contentType:String
    },
    shipping:{
        type:Boolean
    },
    bestSale:{
        type:Boolean
    }
},{timestamps:true})


module.exports = mongoose.model("products",productSchema);