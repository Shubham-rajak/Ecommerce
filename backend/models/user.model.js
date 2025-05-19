import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    contact:{
        type:Number,
        default:null
    },
    address:{
        type: Schema.Types.ObjectId,
        ref: 'address',
       default:null
    },
    status:{
        type:Number,
        default:1
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    otp:{
        type: String
    },
    sendTime:{
        type: Number
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

export default mongoose.model('users',userSchema);