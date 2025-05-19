import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ratingsSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products"
    },
    rating: {
        type: Number,
        required: true
    },
    careatdAt:{
        type: Date,
        default: Date.now()
    }
})

export default mongoose.model('ratings', ratingsSchema);