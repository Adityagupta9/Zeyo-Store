const express = require('express');
const router = express.Router();
const { registerController, loginController, testController,forgotPasswordController, updateUserController, orderController, getAllOrdersController, orderStatusUpdateController } = require('../controllers/authController.js');
const { requireSignin, isAdmin } = require('../middlewares/authMiddleware');

// Register || Method: POST
router.post('/register', registerController);

// Login || Method: POST
router.post('/login', loginController);

// Testing || Method: GET
router.get('/test', requireSignin, isAdmin, testController);

//  Protected route auth for user
router.get('/user-auth',requireSignin,(req,res)=>{
    res.status(200).send({ok:true})
})
// Protected Route auth for admin
router.get("/admin-auth",requireSignin,isAdmin,(req,res)=>{
    res.status(200).send({ok:true})
})

//Update user
router.put("/update-user",requireSignin,updateUserController)

//forgot password
router.post('/forgot-password',forgotPasswordController);

//fetching user orders
router.get('/orders',requireSignin,orderController)

//fetching all orders
router.get('/all-orders',requireSignin,isAdmin,getAllOrdersController)

//Updating status of router
router.put('/order-status/:orderId',requireSignin,isAdmin,orderStatusUpdateController)

module.exports = router;
