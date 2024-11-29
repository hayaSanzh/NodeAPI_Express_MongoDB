const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product.model.js');

const app = express();
app.use(express.json());




app.get('/', (req, res) => {
    res.send('Hello from server');
});

// GET method for all products
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch(error) {
        res.status(500).json({message: error.message});
    }
});

// GET method for particular product
app.get('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch(error) {
        res.status(500).json({message: error.message});
    }
});

// POST method
app.post('/api/products', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch(error) {
        res.status(500).json({message: error.message});
    }
});

// PUT method for updating products
app.put('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product) {
            return res.status(404).json({message: "Product not found"});
        }

        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// DELETE method for deleting particullar product
app.delete('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product) {
            return res.status(404).json({message: "Product not found"});
        }
        return res.status(200).json({message: "Product deleted successfully"});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

mongoose.connect('mongodb+srv://admin:admin@platzi.uqhhv.mongodb.net/Node-API?retryWrites=true&w=majority&appName=platzi')
.then(() => {
    console.log('Connected to database');
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
    
})
.catch(() => {
    console.log('DB connection failed');
})
