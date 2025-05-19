import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const categorySchema = new Schema({
    name:{
        type: String,
    },
    lavel:{
        type:String,
        default: []
    },
   image:{
    type:String,
    default: null,
    },
    careatedAt:{
        type: Date,
        default: Date.now()
    }
})

export default mongoose.model('category', categorySchema);