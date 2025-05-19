import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import userRouter from './Routers/user.router'
import addressRouter from './Routers/address.router';
import productRouter from './Routers/product.router';
import brandRouter from './Routers/brand.router';
import categoryRouter from './Routers/category.router';
import reviewRouter from './Routers/review.router';
import ratingRouter from './Routers/rating.router';
import cartRouter from './Routers/cart.router';
import paymentRouter from './Routers/paymentr.router'
// import orderRouter from './Routers/order.router';
import cors from 'cors'; 

// App config
const app = express();
const port = process.env.PORT

// middleware to parse json request bodies
app.use(express.json());
app.use(cors())

// image uploads
app.use('/static', express.static('uploads'));

// test api
app.get("/", (req, res) => {
    res.send("hello categories")
})

// Connect to MongoDB
mongoose.connect(process.env.DB_URL).then(() => console.log("DB Connected !"))

app.listen(port, () => {
    console.log("Server is running on Port " + port)
})

app.use(userRouter);
app.use(addressRouter);
app.use(productRouter);
app.use(brandRouter);
app.use(categoryRouter);
app.use(reviewRouter);
app.use(ratingRouter);
app.use(cartRouter);
app.use(paymentRouter);
// app.use(orderRouter);