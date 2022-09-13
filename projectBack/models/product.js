const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true,
        maxlenght: 32
    },
    description: {
        type: String,
        require: true,
        trim: true,
        maxlenght: 2000
    },
    price: {
        type: Number,
        require: true,
        trim: true,
        maxlenght: 32
    },
    catagory: {
        type: ObjectId,
        ref: 'Catagory'
    },
    stock: {
        type: Number
    },
    sold: {
        type: Number,
        default: 0
    },
    photo: {
        data: Buffer,
        contentType: String
    }
}, {timestamps: true})

module.exports = mongoose.model('Product', productSchema)