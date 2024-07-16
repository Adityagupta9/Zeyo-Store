const express = require('express')
const { requireSignin, isAdmin } = require('../middlewares/authMiddleware');
const {getProductController,CreateProductController, getSingleProductController, getPhotoController, deleteProductController, UpdateProductController, filterProductController, searchProductController, similarProductController, productCategoryController, braintreeTokenController, braintreePaymentController} = require('../controllers/productController');
const formidable = require('express-formidable')
const router = express.Router();

router.post('/create-product',requireSignin,isAdmin,formidable(),CreateProductController)

//update product
router.put('/update-product/:pid',requireSignin,isAdmin,formidable(),UpdateProductController)

//get products
router.get('/get-product',getProductController)

//single product
router.get('/get-product/:slug',getSingleProductController)

//get photos
router.get('/product-photo/:pid',getPhotoController)

//delete product
router.delete('/delete-product/:pid',requireSignin,isAdmin,deleteProductController)

//filter products
router.post("/filter-product",filterProductController)

//search products
router.get('/search/:keyword',searchProductController)

//similar products
router.get('/similar-product/:pid/:cid',similarProductController)

//get product by category
router.get('/product-category/:slug',productCategoryController)

//payment routes
//token
router.get('/braintree/token',braintreeTokenController)

//payments
router.post('/braintree/payment',requireSignin,braintreePaymentController)

module.exports = router