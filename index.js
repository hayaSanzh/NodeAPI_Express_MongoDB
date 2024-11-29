const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product.model.js');
const productRoutes = require('./routes/products.route.js');
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: false}));

// routes
app.use('/api/products', productRoutes);

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
