const Product = require('../model/productModel');
const asyncHandler = require('express-async-handler');

// Get All Product
const getProducts = asyncHandler(async(req, res)=> {
    try{
        const products = await Product.find({});
        res.status(200).json(products);
    }catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});

// Get a single product
const getProduct = asyncHandler(async(req, res)=> {
    try{
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    }catch (error){
        res.status(500);
        throw new Error(error.message);
    }
});

// Create a product
const createProduct =  asyncHandler(async (req, res)=> {
    try{
        const product = await Product.create(req.body);
        res.status(200).json(product);
    }catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
});

// Update product
const updateProduct = asyncHandler(async(req, res) => {
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        // if not find the id
        if(!product){
            res.status(404);
            throw new Error(`cannot find any product with ID ${id}`);
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    }catch(error){
        res.status(500).json({message: error.message});
    }
});

// Delete product
const deleteProduct = asyncHandler(async(req, res)=> {
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            res.status(404);
            throw new Error(`cannot find any product with ID ${id}`);
        }
        res.status(200).json(product);
    }catch(error){
        res.status(500);
        throw new Error(error.message);
    }
});

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}