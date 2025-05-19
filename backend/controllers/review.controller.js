import reviewModel from "../models/review.model";

export const addReview = async (req, res) => {
    try {
        console.log(req.body);
        const { product, user, review,comment } = req.body;
        const created = await reviewModel.create({
            product: product,
            user: user,
            review: review,
            comment:comment
        });
        res.status(201).json({
            message: "Review added successfully",
            data: created
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to add review",
            error: error.message
        });
    }

}

export const getReviews = async (req, res) => {
    try {
        const reviewsData = await reviewModel.find().populate('user').populate('product');
        return res.status(200).json({
            data: reviewsData,
            message: "Reviews fetched successfully",
            success: true
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch reviews",
            error: error.message
        });
    }
}

export const getReview = async (req, res) => {
    try {
        const reviewId = req.params.review_id;
        const reviewData = await reviewModel.findById(reviewId).populate('user').populate('product');
        if (!reviewData) {
            return res.status(404).json({
                message: "Review not found",
                success: false
            });
        }
        return res.status(200).json({
            data: reviewData,
            message: "Review fetched successfully",
            success: true
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch review",
            error: error.message
        });
    }
}

export const updateReview = async (req, res) => {
    try {
        const reviewId = req.params.review_id;
        const { review, user, product,comment } = req.body;
        console.log('body', req.body);
        const updatedReview = await reviewModel.updateOne({ _id: reviewId }, {
            $set: {
                review: review,
                user: user,
                product: product,
                comment:comment
            }
        })

        if (updatedReview.modifiedCount > 0) {
            return res.status(200).json({
                data: updatedReview,
                message: "Review updated successfully",
                success: true
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message,
           success:false
        })
    }
}

export const deleteReview = async (req, res) => {
    try {
        const reviewId = req.params.review_id;

        // Ensure that reviewId is provided and is a valid object ID.
        if (!reviewId) {
            return res.status(400).json({
                message: "Review ID is required",
                success: false
            });
        }

        const deletedReview = await reviewModel.deleteOne({ _id: reviewId });

        if (deletedReview.deletedCount > 0) {
            return res.status(200).json({
                message: "Review deleted successfully",
                success: true
            });
        } else {
            return res.status(404).json({
                message: "Review not found",
                success: false
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Failed to delete review",
            error: error.message
        });
    }
};
