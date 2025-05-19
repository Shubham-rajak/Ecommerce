import express from 'express';
import { addCatagory, deleteCategory, getCategories, getCategory, updateCategory } from '../controllers/category.controller';

const router = express.Router();

router.post("/add-category",addCatagory); 
router.get("/get-categories",getCategories);
router.get("/get-category/:category_id",getCategory);
router.put("/update-category/:category_id",updateCategory);
router.delete("/delete-category/:category_id",deleteCategory);

export default router;