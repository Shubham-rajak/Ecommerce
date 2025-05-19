import categoryModel from "../models/category.model";
import multer from 'multer';
import { storage } from "../utility/storage";
import fs from 'fs';



const upload = multer({ storage: storage })

export const addCatagory = async (req, res) => {
    try {
        const uploadDataWithfile = upload.single('image')
        uploadDataWithfile(req, res, async (err) => {
            if (err) return res.status(400).json({ message: err.message, success: false });
            console.log('body', req.body)
            console.log('file', req.file)

            let img = null;
            if (req.file) {
                img = req.file.filename
            }

            const { name, lavel } = req.body

            // Check if a category with the same name or lavel already exists
            const existingCategory = await categoryModel.findOne({ name: name, lavel: lavel});

            if (existingCategory) {
                return res.status(400).json({
                    message: 'Category with this name or lavel already exists',
                    success: false
                });
            }

            const created = await categoryModel.create({
                name: name,
                lavel: lavel,
                image: img
            });
            res.status(201).json({
                message: 'Category added successfully',
                data: created,
                success: true
            });
        })
    } catch (error) {
        res.status(500).json({
            message: 'Failed to add category',
            error: error.message
        });
    }
}

export const getCategories = async (req, res) => {
    try {
        const categories = await categoryModel.find();
        res.status(200).json({
            data: categories,
            filepath: process.env.FILE_PATH,
            message: "Categories fetched successfully",
            success: true
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to get categories",
            success: false,
            error: error.message
        });
    }
}

export const getCategory = async (req, res) => {
    try {
        const categoryId = req.params.category_id;
        console.log("text")
        const categoryData = await categoryModel.findOne({ _id: categoryId });

        res.status(200).json({
            data: categoryData,
            filepath: process.env.FILE_PATH,
            message: "Category fetched successfully",
            success: true
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to get category",
            success: false,
            error: error.message
        });
    }
}

export const updateCategory = async (req, res) => {
    try {
        const uploadDataWithFile = upload.single("image");

        uploadDataWithFile(req, res, async (err) => {
            console.log(err);

            if (err) {
                // Return early if there is an error with file upload
                return res.status(400).json({ message: err.message, success: false });
            }

            const categoryid = req.params.category_id;
            const categoryData = await categoryModel.findOne({ _id: categoryid });

            console.log('body', req.body);
            console.log('file', req.file);

            let img = categoryData.image;
            if (req.file) {
                img = req.file.filename;

                // Remove the old image file if it exists
                if (fs.existsSync("./uploads/" + categoryData.image)) {
                    fs.unlinkSync("./uploads/" + categoryData.image);
                }
            }

            const { name, lavel } = req.body;
            console.log('img', img)

            // Update the category in the database
            const updatedCategory = await categoryModel.updateOne(
                { _id: categoryid },
                {
                    $set: {
                        name: name,
                        lavel: lavel,
                        image: img
                    }
                }
            );

            if (updatedCategory.modifiedCount > 0) {
                return res.status(200).json({
                    filepath: process.env.FILE_PATH,
                    message: "Category updated successfully",
                    success: true
                });
            }

            // If no documents were modified (i.e., nothing changed)
            return res.status(400).json({
                message: "No changes made to the category",
                success: false
            });
        });
    } catch (error) {
        // Catch any errors during the overall process
        return res.status(500).json({
            message: "Failed to update category",
            success: false,
            error: error.message
        });
    }
};


export const deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.category_id;

        // Find the category by ID
        const deletedCategory = await categoryModel.findOne({ _id: categoryId });

        // Check if the category exists
        if (!deletedCategory) {
            return res.status(404).json({
                message: "Category not found",
                success: false
            });
        }

        // Check if there is an image to delete
        if (deletedCategory.image) {
            const imagePath = "./uploads/" + deletedCategory.image;
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath); // Delete the old image
            }
        }

        // Delete the category from the database
        await categoryModel.deleteOne({ _id: categoryId });

        return res.status(200).json({
            message: "Category and its image deleted successfully",
            success: true
        });

    } catch (error) {
        return res.status(500).json({
            message: "Failed to delete category",
            success: false,
            error: error.message
        });
    }
};

