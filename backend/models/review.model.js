import mongoose from 'mongoose';

const Schema  = mongoose.Schema;
const reviewSchema = new Schema({
    review:{
        type: String,
        required: true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref: "users"
    },
    product:{
        type:Schema.Types.ObjectId,
        ref: "products"
    }, 
    comment: {
        type: String,
    },
    careatedAt:{
        type: Date,
        default: Date.now()
    },
})

export default mongoose.model('reviews', reviewSchema);