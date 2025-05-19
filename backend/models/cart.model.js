import mongoose from "mongoose";

const schema = mongoose.Schema;

const cartSchema = new schema({
    userId: {
        type: schema.Types.ObjectId,
        ref: 'users',
        // required: true,
    },

    productId: {
        type: schema.Types.ObjectId,
        ref: 'products',
        // required: true,
    },
    size: {
        type: String,
        // required: true
    },
    color: {
        type: String,
        // required: true
    },
    quantity: {
        type: Number,
        default: 1,
        required: true,
    },
    totalPrice: {
        type: Number,
        default: 0,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model("cart", cartSchema);