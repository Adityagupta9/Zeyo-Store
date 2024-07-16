const {hashpassword,comparePassword} = require('../helpers/authHelper.js')
const userModel = require("../models/user.js")

const JWT = require('jsonwebtoken');
const router = require('../routes/authRoute.js');
const orderModel = require('../models/orderModel.js');


const registerController = async(req,res)=>{
    try{
        //deconstructing
        const {name,email,phone,address,password,dob,answer} = req.body;

        //validation
        if(!name){
            return res.send({message:"Name is required"});
        }
        if(!password){
            return res.send({message:"Password is required"});
        }
        if(!email){
            return res.send({message:"Email is required"})
        }
        if(!address){
            return res.send({message:"Address is required"})
        }
        if(!phone){
            return res.send({message:"Phone number is required"})
        }
        if(!dob){
            return res.send({message:"Date of birth is required"})
        }
        //check User
        const existUser = await userModel.findOne({email})
        if(existUser){
         return res.status(200).send({
                success:false,
                message:"User already exist please login"})
        }
        //Register user
        const hashedPassword = await hashpassword(password);
        const [day, month, year] = dob.split('-');
        const formattedDob = new Date(`${year}-${month}-${day}`);
        const user = await new userModel({
            name,
            email,
            address,
            phone,
            password:hashedPassword,
            dob: formattedDob,
            answer:answer
        }).save() //save the user 

        res.status(201).send({
            success:true,
            message:"User registered successfilly",
            user,
        })

    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:error
        })
    }


}   

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email or password is missing
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: "Valid input required"
            });
        }

        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            });
        }

        // Check if password matches
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(401).send({
                success: false,
                message: "Invalid inputs"
            });
        }

        // Generate token
        const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        // Send response with token and user details
        res.status(200).send({
            success: true,
            message: "Login successful",
            user: {
                _id: user._id,
                name: user.name,
                phone: user.phone,
                address: user.address,
                email: user.email,
                dob:user.dob,
                role:user.role
            },
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error
        });
    }
};

const forgotPasswordController = async (req, res) => {
    try {
        const { email, newPassword, answer } = req.body;
        
        // Log the received data for debugging purposes
        console.log('Received data:', { email, newPassword, answer });
        
        const user = await userModel.findOne({ email, answer });
        
        if (!user) {
            return res.status(200).send({
                success: false,
                message: "Invalid email or answer"
            });
        }

        const hashNewPass = await hashpassword(newPassword);
        
        await userModel.findByIdAndUpdate(user._id, { password: hashNewPass });
        
        res.status(200).send({
            success: true,
            message: "Password updated successfully"
        });
    } catch (error) {
        console.error('Error during password reset:', error);
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error: error.message // Include the error message for better debugging
        });
    }
};


const updateUserController = async (req,res)=>{
    try {
        const{name,email,dob,phone,address} = req.body;
        const user = await userModel.findById(req.user._id)
        const updateUser = await userModel.findByIdAndUpdate(req.user._id,{
            name:name || user.name,
            email:email || user.email ,
            phone:phone || user.phone,
            address:address || user.address,
            dob:dob || user.dob
        },{new:true})
        res.status(200).send({
            success:true,
            message:"User Upfated successsfully",
            updateUser
        })
    
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
            message:"Error while updating user"
        })
    }
}

//fething order of the user
const orderController = async(req,res)=>{
    try {
        const orders = await orderModel.find({buyer:req.user._id}).populate("products","-photo").populate("buyer","name");
        res.json(orders)
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
            message:"Error while fetching the orders"
        })
    }
}

const getAllOrdersController = async(req,res)=>{
    try {
        const orders = await orderModel.find({})
        .populate('products', '-photo')
        .populate('buyer', 'name')
        .sort({ createdAt: -1 });
        res.json(orders)
    } catch (error) {
        console.log(error)
        res.status(200).send({
            error,
            success:false,
            message:"Error while fetching all products"
        })
    }
}

//Order ststus update
const orderStatusUpdateController = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        if (!status) {
            return res.status(400).send({
                success: false,
                message: "Status is required",
            });
        }
        const order = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true });
        if (!order) {
            return res.status(404).send({
                success: false,
                message: "Order not found",
            });
        }
        res.json(order);
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(400).send({
            success: false,
            message: "Error while updating order status",
            error,
        });
    }
};


const testController = (req,res)=>{
    res.send("Protected")
}

module.exports= {registerController,loginController,testController,forgotPasswordController,updateUserController,orderController,getAllOrdersController,orderStatusUpdateController}