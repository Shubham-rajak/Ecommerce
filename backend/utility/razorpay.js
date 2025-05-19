import Razorpay from 'razorpay';
const dotenv = require('dotenv');
dotenv.config();

const Instance =  new Razorpay({
        key_id: process.env.RAZORPAY_API_KEY,
        key_secret: process.env.RAZORPAY_API_SECRET
    
});

export default Instance; 