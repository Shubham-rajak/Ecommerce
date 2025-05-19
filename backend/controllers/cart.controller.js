import cartModel from "../models/cart.model"
import usersModel from "../models/user.model"
import productModel from "../models/product.model"

export const addToCart = async (req, res) => {
    try {
        // console.log(req.user);
        const {productId ,size,color}= req.body;
        const userId = req.user.data.id;
        console.log('user ID ' ,userId)
        // console.log('productId', productId);
        const product = await productModel.find({"_id": productId})

        if (!product) {
            return res.status(404).json({
                success: false,
                data: null,
                error: "Product not found"
            });
        }
      
        const shippingFee = 50

        // const user = await usersModel.findById(userId)
        const user = await usersModel.find({"_id": userId})
        if (!user) {
            return res.status(404).json({
                success: false,
                data: null,
                error: "User not found"
            });
        }
    
        const cartItem = await cartModel.findOne({
            userId: userId, 
            productId: productId, 
            size: size, 
            color: color,
        });

        console.log('cartItems',cartItem)

        if(cartItem){
            if(cartItem.quantity >= 10 ){
                return res.status(400).json({
                    success: false,
                    data: null,
                    error: "Maximum quantity reached for this product"
                });
            }
            cartItem.quantity += 1;  
            cartItem.totalPrice = cartItem.quantity * product[0].price + shippingFee;
            console.log(product[0].price, cartItem.quantity);
            await cartItem.save();
            return res.status(200).json({
                success: true,
                data:cartItem,
                error: false,
                message: "Product quantity has been updated"
            });

        }

        const response = await cartModel.create({
            userId: userId,
            productId: productId,
            size: size,
            color: color,
            quantity: 1, 
            totalPrice: product[0].price + shippingFee
        })
        return res.status(200).json({
            success: true,
            data: {
                response,
            },
            error: false,
            message: "Product added to cart successfully!"
        })
    } catch (error) {
        console.error("Error adding product to cart:", error);
        return res.status(500).json({
            success: false,
            data: null,
            error: "An internal server error occurred" + error.message
        });
    }
};

export const getCarts = async (req, res) => {
    try {
        const response = await cartModel.find().populate("userId").populate("productId");
        return res.status(200).json({
            success: true,
            data: response,
            error: false,
            filepath: process.env.FILE_PATH,
        })
    } catch (error) {
        console.error("Error fetching cart items:", error);
        return res.status(500).json({
            success: false,
            data: null,
            error: "An internal server error occurred",
        });
    }
};

export const getCart = async (req, res) => {
    try {
        const userId = req.user.data.id;
        const response = await cartModel.find({ userId: userId }).populate("userId").populate("productId");
        return res.status(200).json({
            success: true,
            data: response,
            error: false,
            filepath:process.env.FILE_PATH,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            error: error.message
        })
    }
}

export const increaseCart = async (req, res) => {
    try {
        const cartId = req.params.cartId;
        const cartItem = await cartModel.findById(cartId).populate("productId");

        if (!cartItem) {
            return res.status(404).json({
                success: false,
                error: "Cart item not found"
            });
        }

        const product = cartItem.productId;

        if (cartItem.quantity >= 10) {
            return res.status(400).json({
                success: false,
                error: "Maximum quantity 10 reached for this product"
            });
        }

        cartItem.quantity += 1;
        cartItem.totalPrice = cartItem.quantity * product.price; 

        const updatedCartItem = await cartItem.save();

        return res.status(200).json({
            success: true,
            data: updatedCartItem,
            message: "Product quantity increased successfully"
        });
    } catch (error) {
        console.error("Error increasing cart item:", error);
        return res.status(500).json({
            success: false,
            error: "An internal server error occurred: " + error.message
        });
    }
};


export const decreaseCart = async (req, res) => {
    try {
        const cartId = req.params.cartId;

        // 1. Fetch the cart item by cartId and populate the product details
        const cartItem = await cartModel.findById(cartId).populate("productId");

        // 2. Check if the cart item exists
        if (!cartItem) {
            return res.status(404).json({
                success: false,
                error: "Cart item not found"
            });
        }

        // 3. Ensure quantity doesn't go below 1
        if (cartItem.quantity <= 1) {
            return res.status(400).json({
                success: false,
                error: "Quantity cannot be less than 1"
            });
        }

        // 4. Decrease the quantity by 1
        cartItem.quantity -= 1;

        // 5. Recalculate the total price after the quantity update
        const product = cartItem.productId;
        cartItem.totalPrice = cartItem.quantity * product.price;

        // 6. Save the updated cart item
        const updatedCartItem = await cartItem.save();

        return res.status(200).json({
            success: true,
            data: updatedCartItem,
            message: "Product quantity decreased successfully"
        });
    } catch (error) {
        console.error("Error decreasing cart item:", error);
        return res.status(500).json({
            success: false,
            error: "An internal server error occurred: " + error.message
        });
    }
};


export const removeCart = async (req, res) => {
    try {
        const cartId = req.params.cartId;

        // Find the cart item by its ID
        const cartItem = await cartModel.findById(cartId);
        if (!cartItem) {
            return res.status(404).json({
                message: "Cart item not found",
            });
        }

        // Delete the cart item using the correct method
        await cartModel.deleteOne({ _id: cartId });

        // Send a success response
        return res.status(200).json({
            message: "Cart item deleted successfully",
        });
    } catch (error) {
        // Handle errors gracefully
        return res.status(500).json({
            message: "Internal server error: " + error.message,
        });
    }
};

export const clearCart = async (req, res) => {
    try {
        console.log(req.user)
        const user = req.user.data.id;
        if(!user){
            return res.status(400).json({
                success: false,
                data: null,
                error: "User not found"
            })
        }
        const response = await cartModel.deleteMany({ userId: user });
        return res.status(200).json({
            success: true,
            data: response,
            error: false,
            message: "Cart cleared successfully!"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            error: error.message
        })
    }
}

