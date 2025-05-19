import express from 'express';
import { addReview, deleteReview, getReview, getReviews, updateReview } from '../controllers/review.controller';

const router = express.Router();
router.post("/add-review",addReview);
router.get("/get-reviews",getReviews);
router.get("/get-review/:review_id",getReview);
router.put("/update-review/:review_id",updateReview);
router.delete("/delete-review/:review_id",deleteReview);

export default router;