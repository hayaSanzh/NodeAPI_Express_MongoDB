const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema(
    {
        "title": {
            type: String,
            required: [true, "Please enter the id of the product"]
        },
        "price": {
            type: Number,
            required: true
        },
        "quantity": {
            type: Number,
            required: true,
            default: 0
        }
    },
    {
        timestaps: true
    }
);

const Product = mongoose.model("Product", ProductSchema) ;
module.exports = Product;