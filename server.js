const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectMongoDB = require('./config/db');
const authRoutes = require('./routes/authRoute.js');
const categoryRoutes = require('./routes/categoryRoutes.js')
const productRoutes = require('./routes/productRoutes.js')
const cors = require('cors');
require('dotenv').config();
const path = require('path')
// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 8070;

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
}));
app.use(express.json()); // Parse JSON bodies
app.use(morgan('dev')); // Log requests
app.use(express.static(path.join(__dirname,'./client/build')))

// Connect to MongoDB
connectMongoDB();

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category",categoryRoutes);
app.use("/api/v1/product",productRoutes)
app.use('*',function(req,res){
    res.sendFile(path.join(__dirname,'./client/build/index.html'))
})


app.listen(port, () => {
    console.log(`The server is running at http://localhost:${port}`);
});
