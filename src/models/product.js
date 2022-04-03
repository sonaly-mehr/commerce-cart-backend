const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    brand: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    productPictures: [
        { img: { type: String } }
    ],
    // reviews: [
    //     {
    //         userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    //         review: String
    //     }
    // ],
    category: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
    },
    // createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    updateAt: Date,
}, {timestamps: true });

module.exports= mongoose.model('Product', productSchema)