const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

// Order/Cart page Schema
const ProductCartSchema = new mongoose.Schema({
    product: {
        type: ObjectId,
        ref: 'Product'
    },
    name: String,
    count: Number,
    price: Number
})

// Order Schema
const OrderSchema = new mongoose.Schema({
    product: [ProductCartSchema],
    transaction_id : {},
    amount : {type: Number},
    address : String,
    update: Date,
    user: {
        type: ObjectId,
        ref: 'User'
    }

})


// Converting Schemas to Models
const ProductCart = mongoose.model('ProductCart', ProductCartSchema)
const Order = mongoose.model('Order', OrderSchema)

module.exports = { Order, ProductCart }