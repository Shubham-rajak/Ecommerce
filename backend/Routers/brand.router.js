import express from 'express';
import { addBrand, deleteBrand, getBrandById, getBrands, updateBrand } from '../controllers/brand.controller';

const router = express.Router();

router.post("/add-brand",addBrand);
router.get("/get-brands",getBrands);
router.get("/get-brand/:brand_id",getBrandById);
router.put("/update-brand/:brand_id",updateBrand);
router.delete("/delete-brand/:brand_id",deleteBrand);

export default router;