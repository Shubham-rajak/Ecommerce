import ratingsModel from "../models/ratings.model";

export const addRating = async(req,res)=>{
    try {
        console.log(req.body);
        const { product, user, rating } = req.body;
        const created = await ratingsModel.create({
            product: product,
            user: user,
            rating: rating,
        });
        res.status(201).json({
            message: "Rating added successfully",
            success: true,
            data: created
        });
        
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    
    }
}

export const getRatings = async (req, res) => {
    try {
        const ratingsData = await ratingsModel.find().populate('user').populate('product');
        res.status(200).json({
            data: ratingsData,
            message: "Ratings fetched successfully",
            success: true
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch ratings", success: false, error: error.message });
    }
}

export const getRating = async (req, res) => {
    try {
        const ratingId = req.params.rating_id;
        const ratingData = await ratingsModel.findOne({_id:ratingId}).populate('product').populate('user');
        if (!ratingData) {
            return res.status(404).json({
                message: "Rating not found",
                success: false
            });
        }
        res.status(200).json({
            data: ratingData,
            message: "Rating fetched successfully",
            success: true
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch rating", success: false, error: error.message });
    }
}

export const updateRating = async (req, res) => {
    try {
        const ratingId = req.params.rating_id;
        const { rating, user, product } = req.body;
        console.log(req.body);

        // Perform the update
        const updatedData = await ratingsModel.updateOne(
            { _id: ratingId },
            { $set: { rating, user, product} }
        );

        // Check if the document was found
        if (updatedData.matchedCount === 0) {
            return res.status(404).json({
                message: "Rating not found",
                success: false
            });
        }

        // Check if any modification was made
        if (updatedData.modifiedCount > 0) {
            return res.status(200).json({
                message: "Rating updated successfully",
                success: true
            });
        } else {
            return res.status(400).json({
                message: "No changes made to the rating",
                success: false
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Failed to update rating",
            success: false,
            error: error.message
        });
    }
};


export const deleteRating = async (req, res) => {
    try {
        const ratingId = req.params.rating_id;
        const deletedRating = await ratingsModel.findByIdAndDelete(ratingId);
        if (!deletedRating) {
            return res.status(404).json({
                message: "Rating not found",
                success: false
            });
        }
        res.status(200).json({
            message: "Rating deleted successfully",
            success: true
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete rating", success: false, error: error.message });
    }
}