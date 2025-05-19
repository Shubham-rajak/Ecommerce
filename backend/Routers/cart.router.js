import express from 'express';
import { increaseCart, decreaseCart, clearCart, getCart, removeCart, addToCart, getCarts } from '../controllers/cart.controller'
import { auth } from '../middleware/auth.middlewere';

const router = express.Router();

router.post('/addcart', auth, addToCart)
router.get('/getcarts', getCarts)
router.get('/getcart', auth, getCart)
router.put('/increase/:cartId',auth, increaseCart);
router.put('/decrease/:cartId',auth, decreaseCart);
router.delete('/removecart/:cartId',auth, removeCart)
router.delete('/clearcart', auth, clearCart)

export default router