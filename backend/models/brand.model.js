import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const brandSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    descreption: {
        type: String,
        default: null

    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories',
    },
    careatedAt:{
        type: Date,
        default: Date.now()
    },

})
export default mongoose.model('brands', brandSchema);