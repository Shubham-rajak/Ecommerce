import express from 'express';
import { addRating, deleteRating, getRating, getRatings, updateRating } from '../controllers/rating.controller';

const router = express.Router();
router.post("/add-rating",addRating);
router.get("/get-ratings",getRatings);
router.get("/get-rating/:rating_id",getRating);
router.put("/update-rating/:rating_id",updateRating);
router.delete("/delete-rating/:rating_id",deleteRating);

export default router;