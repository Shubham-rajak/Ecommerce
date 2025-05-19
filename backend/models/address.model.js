import mongoose from 'mongoose';

const schema = mongoose.Schema;
const addressSchema = new schema({
    userId: {
        type: schema.Types.ObjectId,
        ref: 'users',
    },
    firstName:{
        type: 'string',
        required: true,
    },
    lastName: {
        type: 'string',
        required: true,
    },
    contact: {
        type: 'string',
        required: true,
    },
    address: {
        type: 'string',
        required: true,
    },
    city: {
        type: 'string',
        required: true,
    },
    zipCode: {
        type: 'string',
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now()
    },
})  

export default mongoose.model('address', addressSchema);