import React, { useState } from 'react';
import axios from 'axios';

const Payment = () => {
  const [orderId, setOrderId] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState(null);

  const createOrder = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/razorpay/create-order', {
        amount: 1000, // Amount in INR
        currency: 'INR',
        receipt: 'order_rcptid_11',
      });
      setOrderId(response.data.order_id);
      setPaymentDetails(response.data);
      initiatePayment(response.data);
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
    }
  };

  const initiatePayment = (data) => {
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY, // Your Razorpay key
      amount: data.amount, // Amount in paise
      currency: data.currency,
      name: 'Your Company Name',
      description: 'Test Payment',
      order_id: data.order_id,
      handler: function (response) {
        verifyPayment(response);
      },
      prefill: {
        name: 'Customer Name',
        email: 'customer@example.com',
        contact: '9876543210',
      },
      notes: {
        address: 'Your address',
      },
    };

    const rzp1 = new Razorpay(options);
    rzp1.open();
  };

  const verifyPayment = async (paymentDetails) => {
    try {
      const response = await axios.post('http://localhost:5000/api/razorpay/verify-payment', {
        payment_id: paymentDetails.razorpay_payment_id,
        order_id: paymentDetails.razorpay_order_id,
        signature: paymentDetails.razorpay_signature,
      });
      alert('Payment Success');
    } catch (error) {
      console.error('Payment verification failed:', error);
      alert('Payment Failed');
    }
  };

  return (
    <div>
      <button onClick={createOrder}>Pay Now</button>
    </div>
  );
};

export default Payment;









// RAZORPAY_KEY_ID=your_razorpay_key_id
// RAZORPAY_KEY_SECRET=your_razorpay_key_secret
// MONGODB_URI=your_mongo_db_connection_uri
