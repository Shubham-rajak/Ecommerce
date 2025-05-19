import express from 'express';
import { addProduct, getProducts, updateProduct, deleteProduct, getProductById, getProductsByCategory } from '../controllers/product.controller';

const router = express.Router();
router.post('/add-product',addProduct);
router.get("/get-products",getProducts);
router.get("/get-products-by-category/:category",getProductsByCategory);
router.get('/get-product/:product_id', getProductById);  
router.put('/update-product/:product_id',updateProduct);
router.delete('/delete-product/:product_id',deleteProduct);

export default router;