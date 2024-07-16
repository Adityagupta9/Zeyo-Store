const express = require('express');
const { requireSignin, isAdmin } = require('../middlewares/authMiddleware');
const {createCategoryController,updateCategoryController, allCategoryController, singleCategoryController, deleteCategoryController} = require('../controllers/categoryController.js')

const router = express.Router();

// create category
router.post('/create-category',requireSignin,isAdmin,createCategoryController);

// Update category
router.put('/update-category/:id',requireSignin,isAdmin,updateCategoryController)

//get all category
router.get('/all-category',allCategoryController)

// get single category
router.get('/single-category/:slug',singleCategoryController)

// delete category
router.delete('/delete-category/:id',deleteCategoryController)

module.exports = router