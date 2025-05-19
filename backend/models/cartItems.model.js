import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const cartItemsSchema = mongoose.Schema({
    cart:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',
        required: true
    },
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true
    },
    size:{
        type: String,
        required: true
    },
    quantity:{
        type: Number,
        default: 1
    },
    price:{
        type: Number,
        required: true
    },
    discountedPrice:{
        type: Number,
        required: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now()
    },
})

export default mongoose.model('cartItems', cartItemsSchema)