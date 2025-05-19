import Instance from '../utility/razorpay.js';
import cartModel from '../models/cart.model.js'; // Ensure this is the correct path to your cart model
import crypto from 'crypto';

export const createPayment = async (req, res) => {
    try {
        console.log(req.user.data.id);
        const userId = req.user.data.id; // Get user id from the request
        console.log('userId', userId);
        const { cart } = req.body;
        console.log('req.body', req.body);

        // Retrieve the user's cart and populate the product details (Ensure proper population)
        const userCart = await cartModel.find({ userId }).populate({"_id": cart});
        if (!userCart || userCart.length === 0) {
            return res.status(400).json({
                success: false,
                data: null,
                error: "Cart is empty"
            });
        }

        // Calculate total amount based on cart items
        let totalAmount = userCart.reduce((sum, item) => {
            return sum + item.productId.price * item.quantity;
        }, 0);

        // Add shipping charges (in the smallest currency unit)
        totalAmount += 50 * 100; // Adding 50 INR as shipping charge, converted to paise (smallest unit)

        // Create Razorpay order options
        const options = {
            amount: totalAmount, // Amount in paise
            currency: currency || 'INR',
            receipt: `rcpt_${userId.substring(0, 8)}_${Date.now().toString().slice(-6)}`
        };

        // Await the Razorpay order creation
        const order = await Instance.orders.create(options);

        res.status(200).json({
            success: true,
            orderId: order.id,
            currency: order.currency,
            amount: order.amount,
            shipping: 50 * 100 // Return shipping charges in paise
        });
        console.log(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Error while creating Razorpay order. " + error.message
        });
    }
};

export const verify = async (req, res) => {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, amount, currency } = req.body;
    console.log('req.body', req.body);

    try {
        // Concatenate the order_id and payment_id to create the string to be hashed
        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const generatedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_API_SECRET)
            .update(sign.toString()).digest('hex');

        console.log(razorpay_signature === generatedSignature); // Debug statement for signature comparison

        const isAuthentic = generatedSignature === razorpay_signature;

        if (isAuthentic) {
            // Match the amount and currency to verify integrity
            if (amount * 100 !== razorpay_order_id.amount || currency !== razorpay_order_id.currency) {
                return res.status(400).json({
                    message: 'Amount or currency mismatch'
                });
            }

            // Save the payment info in the paymentModel (Make sure the schema is correct)
            const payment = new paymentModel({
                razorpay_payment_id,
                razorpay_order_id,
                amount,
                currency
            });

            // Save the payment record in the database
            await payment.save();

            res.status(200).json({ message: 'Payment successful' });
        } else {
            res.status(400).json({ message: 'Invalid signature' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

