import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const productSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    oldprice: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    color:{
        type: Array,
        default:[]
    },
    size:{
        type:Array,
        default:[]   
    },
    thumbnail: {
        type: String,
        default: null
    },
    // images: {
    //     type:Array,
    //     default: [],
    // },
    brand:{
        type: Schema.Types.ObjectId,
        ref: 'brands',
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category',
        
    },
    subCategory: {
        type: String,
        // required: true,
    },
    description:{
        type: String,
        required: true,
        default:null
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
})

export default mongoose.model('products', productSchema);