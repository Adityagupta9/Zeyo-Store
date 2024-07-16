const { default: slugify } = require('slugify');
const productModel = require('../models/productModel.js');
const categoryModel = require('../models/categoryModel.js')
const orderModel = require("../models/orderModel.js")
const fs = require('fs');
const braintree = require('braintree')
const dotenv = require('dotenv')

dotenv.config();
//payment gateway
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});


const CreateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping ,bestSale} = req.fields;
    const { photo } = req.files;

    if (!name) return res.status(400).send({ error: "Name is required" });
    if (!description) return res.status(400).send({ error: "Description is required" });
    if (!price) return res.status(400).send({ error: "Price is required" });
    if (!category) return res.status(400).send({ error: "Category is required" });
    if (!quantity) return res.status(400).send({ error: "Quantity is required" });
    if (photo && photo.size > 1000000) return res.status(400).send({ error: "Photo size should be less than 1MB" });

    const product = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.status(201).send({ success: true, message: "Product created successfully", product });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Error in creating product", error });
  }
};

const UpdateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping ,bestSale} = req.fields;
    const { photo } = req.files;

    if (!name) return res.status(400).send({ error: "Name is required" });
    if (!description) return res.status(400).send({ error: "Description is required" });
    if (!price) return res.status(400).send({ error: "Price is required" });
    if (!category) return res.status(400).send({ error: "Category is required" });
    if (!quantity) return res.status(400).send({ error: "Quantity is required" });
    if (photo && photo.size > 1000000) return res.status(400).send({ error: "Photo size should be less than 1MB" });

    const product = await productModel.findByIdAndUpdate(req.params.pid, { ...req.fields, slug: slugify(name) }, { new: true });
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.status(200).send({ success: true, message: "Product updated successfully", product });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Error in updating product", error });
  }
};

const getProductController = async (req, res) => {
  try {
    const { page = 1, limit = 15 } = req.query; // Default to page 1 and 15 products per page
    const skip = (page - 1) * limit;
    const products = await productModel
      .find({})
      .select("-photo")
      .populate('category')
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 });

    const totalCount = await productModel.countDocuments({});
    
    res.status(200).send({ 
      success: true, 
      totalCount, 
      message: "Products fetched successfully", 
      products 
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ 
      success: false, 
      message: "Error in getting all the products", 
      error: error.message 
    });
  }
};


const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel.findOne({ slug: req.params.slug }).select("-photo").populate('category');
    res.status(200).send({ success: true, message: "Single product fetched successfully", product });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Error while fetching single product", error });
  }
};

const getPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-Type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Error while fetching photo", error });
  }
};

const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Error while deleting product", error });
  }
};

const filterProductController = async (req, res) => {
  try {
    const { checked, radio, page = 1, limit = 15 } = req.body;
    const args = {};
    const skip = (page - 1) * limit;

    if (checked && checked.length > 0) {
      args.category = { $in: checked };
    }

    if (radio && radio.length === 2) {
      args.price = { $gte: radio[0], $lte: radio[1] };
    }

    const products = await productModel
      .find(args)
      .limit(limit)
      .skip(skip);

    const totalCount = await productModel.countDocuments(args);

    res.status(200).send({ 
      success: true, 
      totalCount, 
      message: "Filtered data", 
      products 
    });
  } catch (error) {
    console.error("Error in filtering the data:", error);
    res.status(500).send({ 
      success: false, 
      message: "Error in filtering the data", 
      error 
    });
  }
};

const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;

    // First, find matching categories based on the keyword
    const categories = await categoryModel.find({
      name: { $regex: keyword, $options: "i" }
    }).select('_id');

    // Extract the category IDs from the results
    const categoryIds = categories.map(category => category._id);

    // Then, find products that match the keyword in name, description, or category ID
    const result = await productModel.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        { category: { $in: categoryIds } }
      ]
    }).select("-photo");

    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in searching",
      error,
    });
  }
};


const similarProductController = async (req,res)=>{
  try {
    const {pid,cid} = req.params
    const product = await productModel.find({category:cid,_id:{$ne:pid}}).limit(5).select("-photo").populate("category")
    res.status(200).send({
      success:true,
      message:"Simillar product successfull",
      product,
    })
  } catch (error) {
    console.log(error)
      res.status(400).send({
        success:false,
        message:"Error in similar products"
      })
  }
}

const productCategoryController = async(req,res)=>{
  try {
    const slug = req.params.slug
    const category = await categoryModel.findOne({slug:slug})
    const product = await productModel.find({category}).populate('category');
    res.status(200).send({
      success:true,
      message:"product given by category",
      product,
      category
    })
  } catch (error) {
    console.log(error)
    res.status(400).send({
      message:"Error while product category",
      error
    })
  }
}

//payment gateway API
const braintreeTokenController = async(req,res)=>{
  try {
    gateway.clientToken.generate({},function(err,response){
      if(err){
        res.status(500).send(err)
      }
      else{
        res.send(response)
      }
    })
  } catch (error) {
    console.log(error)
  }
}

const braintreePaymentController = (req,res)=>{
  try {
    const {cart,nonce} = req.body
    let total = 0
    cart.map((i)=>{total += i.price});
    let newTransaction = gateway.transaction.sale({
      amount:total,
      paymentMethodNonce:nonce,
      options:{
        submitForSettlement:true
      }
    },
    function(error,result){
      if(result){
        const order=new orderModel ({
          products:cart,
          payment:result,
          buyer:req.user._id,
          status:'Not process'
        }).save()
        res.json({ok:true})
      }
      else{
        res.status(500).send(error)
      }
    }
  )
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  CreateProductController,
  UpdateProductController,
  getProductController,
  getSingleProductController,
  getPhotoController,
  deleteProductController,
  filterProductController,
  searchProductController,
  similarProductController,
  productCategoryController,
  braintreeTokenController,
  braintreePaymentController
};
