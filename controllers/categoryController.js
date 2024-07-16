const { Schema } = require('mongoose')
const categoryModel = require('../models/categoryModel.js')
const { default: slugify } = require('slugify')
const createCategoryController = async (req,res)=>{
    try {
        const {name} = req.body
        if(!name){
            res.send({message:"Name is required"})
        }
        const existCategory = await categoryModel.findOne({name})
        if(existCategory){
            return res.status(200).send({
                    success:true,
                    message:"Category already exist",name
                    })
        }
        const category = await new categoryModel({name,slug:slugify(name)}).save()
        res.status(200).send({
            success:true,
            message:"Category created successfully",
            category,
        })
    } catch (error) {
        console.log(error)
        res.status(401).send({
            message:"Error in creating category",error
        })
    }
}

//Update category

const updateCategoryController = async (req,res)=>{
    try {
        const {name} = req.body;
        const {id} = req.params;
        if(!name){
            res.send({messgae:"Name is required"})
        }
           const newName =  await categoryModel.findByIdAndUpdate(id,{name:name,slug:slugify(name)},{ new: true })
           
           res.status(200).send({
            success : true,
            message:"Category name updated",
            newName,
           })

    } catch (error) {
        console.log(error)
        res.status(400).send({message:"Error in category update",error})
    }
}
// get all category
const allCategoryController = async(req,res)=>{
    try {
        const categoryList = await categoryModel.find({})
            res.status(200).send({
                success:true,
                message:"All category fetched",
                categoryList,
            })
    } catch (error) {
        console.log(error)
        res.status(401).send({
            success:false,
            message:"Error while all fetching category",
            error
        })
    }
}

const singleCategoryController = async (req,res)=>{
    try {
        const singleCategory = await categoryModel.findOne({slug:req.params.slug})
        if(singleCategory){
            res.status(200).send({
                success:true,
                message:"Got the single category",
                singleCategory,
            })
        }
        else{
           return res.status(404).send({
                success:false,
                message:"No such category found",
            })
        }
    } catch (error) {
        console.log(error)
        res.status(401).send({
            message:"Error while fetching single category",
            error
        })
    }
}
const deleteCategoryController = async (req,res)=>{
    try {
        const {id} = req.params
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success:true,
            message:"Category deleted sucessfully"
        })
    } catch (error) {
        console.log(error)
        res.status(404).send({
            message:"Error while deleting category",
            success:false,
            error
        })
    }
}

module.exports = {createCategoryController,updateCategoryController,allCategoryController,singleCategoryController,deleteCategoryController}