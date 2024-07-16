const JWT = require('jsonwebtoken')

const requireSignin = async (req,res,next)=>{
    try {
        const decode = JWT.verify(req.headers.authorization,process.env.JWT_SECRET)
        req.user = decode
        next();
    } catch (error) {
        console.log(error)
    }
}
const userModel = require('../models/user');
const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);

        if (!user) {
            return res.status(404).send({ success: false, message: 'User not found' });
        }

        if (user.role !== 1) { // Assuming `1` represents admin role
            return res.status(401).send({ success: false, message: 'Unauthorized access' });
        }

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.log('Error in isAdmin middleware:', error);
        return res.status(500).send({ success: false, message: 'Error in isAdmin middleware', error });
    }
};


module.exports =  {requireSignin,isAdmin}