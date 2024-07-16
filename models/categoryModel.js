const mongoose = require('mongoose')
const slugify = require('slugify')
const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        require:true
    },
    slug:{
        type:String,
        lowercare : true
    }

})

module.exports = mongoose.model('category',categorySchema)