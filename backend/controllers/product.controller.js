import productModel from "../models/product.model";
import { storage } from "../utility/storage";
import multer from "multer";
import fs, { existsSync } from 'fs';
import path from "path";

const upload = multer({ storage: storage })

export const addProduct = async (req, res) => {
    const uploadDataWithfile = upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'images', maxCount: 8 }])
    try {
        uploadDataWithfile(req, res, async (err) => {
            if (err) return res.status(400).json({ message: err.message, success: false })

            console.log('body', req.body);
            console.log('files', req.files)

            let img = null;
            let imgArr = [];
            console.log("req.files['thumbnail'][0]", req.files['thumbnail'][0])
            if (req.files['thumbnail'][0]) {
                img = req.files['thumbnail'][0].filename
            }

            // if (req.files['images']) {
            //     for (let i = 0; i < req.files['images'].length; i++) {
            //         const element = req.files['images'][i];
            //         imgArr.push(element.filename)
            //     }

            // }

            console.log('thumbnail', img)
            console.log('imgArr', imgArr)
            const { title, price, oldprice, quantity, category, color, size, brand, subcategory, description } = req.body;

            // send for arrys form 
            let sizeArr = size ? size.split(',') : [];
            let colorArr = color ? color.split(',') : [];
            const created = await productModel.create({
                title: title,
                price: price,
                oldprice: oldprice,
                quantity: quantity,
                category: category,
                color: colorArr,
                size: sizeArr,
                brand: brand,
                subcategory: subcategory,
                description: description,
                thumbnail: img,
                // images: imgArr
            });
            return res.status(200).json({
                data: created,
                message: "Product created successfully",
                success: true,
            })

        })

    } catch (error) {
        return res.status(500).json({
            message: "Failed to create product",
            success: false, error: error.message
        })
    }
}

export const getProductsByCategory = async (req,res)=>{
    try {
        const { category } = req.params;
        const products = await productModel.find({ category: category }).populate('category').populate('brand');
        return res.status(200).json({
            data: products,
            message: "Products fetched successfully",
            filepath: process.env.FILE_PATH,
            success: true,
        })
        
    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch products",
            success: false, error: error.message
        })
    }
}
export const getProducts = async (req, res) => {
    try {

        // console.log(req.query)
        const { page, limit, search, sort } = req.query;

        //pagination 
        const skipno = (page - 1) * limit;

        //search filter
        const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
        const searchRgx = rgx(search);
        let filter = {};
        if (search) {
            filter = {
                $or: [
                    { title: { $regex: searchRgx, $options: "i" } },
                    { description: { $regex: searchRgx, $options: "i" } },
                    { "category.name": { $regex: searchRgx, $options: "i" } },
                ],
            }


        }

        //sort filter
        // sorting 
        let sortdata = { _id: 1 }

        if (sort == 'latest') {
            sortdata = { _id: -1 }
        }

        if (sort == 'htol') {
            sortdata = { price: -1 }
        }
        if (sort == 'ltoh') {
            sortdata = { price: 1 }
        }
        const productsData = await productModel.find(filter).populate('category').populate('brand').limit(limit).skip(skipno).sort(sortdata);
        return res.status(200).json({
            data: productsData,
            message: "Products fetched successfully",
            filepath: process.env.FILE_PATH,
            success: true,
        })

    } catch (error) {
        return res.status(500).json({ message: "Failed to fetch products", success: false, error: error.message })
    }
}

export const getProductsAggr = async (req, res) => {
    try {


        const productData = await productModel.aggregate([
            {
                $lookup: {
                    from: "categories",
                    localField: "category",
                    foreignField: "_id",
                    as: "categoryData"
                },
            },
            {
                $unwind: "$categoryData"
            },
            {
                $sort: { "_id": -1 }
            },


        ])

        return res.status(200).json({
            data: productData,
            message: "Product Fetched",
            success: true
        })
    } catch (err) {
        return res.status(500).json({ message: err.message }, { success: false })
    }
}


export const getProductById = async (req, res) => {
    try {
        const productId = req.params.product_id;
        const productData = await productModel.findById(productId);
        if (!productData) return res.status(404).json({ message: "Product not found", success: false });
        return res.status(200).json({
            data: productData,
            filepath: process.env.FILE_PATH,
            message: "Product fetched successfully",
            success: true
        })
    } catch (error) {
        return res.status(500).json({ message: "Failed to fetch product", success: false, error: error.message })
    }
}


// Upadate a product
export const updateProduct = async (req, res) => {
    const uploadDataWithfile = upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'images', maxCount: 8 }]);

    try {
        uploadDataWithfile(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ message: err.message, success: false })
            }
            const productid = req.params.product_id;
            const productData = await productModel.findOne({ _id: productid });
            if (!productData) {
                return res.status(404).json({ message: 'Product not found', success: false });
            }
            console.log('body', req.body);
            console.log('files', req.files)

            let img = productData.thumbnail;
            let imgArr = productData.images || [];

            // single image

            if (req.files['thumbnail']) {
                img = req.files['thumbnail'][0].filename;
                if (fs.existsSync("./uploads/" + productData.thumbnail)) {
                    fs.unlinkSync("./uploads/" + productData.thumbnail);
                }
            }

            // multiple images
            // if (req.files['images']) {
            //     // Delete old product images from server
            //     imgArr.forEach((oldImagArr) => {

            //         if (fs.existsSync("./uploads/" + oldImagArr)) {
            //             fs.unlinkSync("./uploads/" + oldImagArr);
            //         }
            //     });


            //     imgArr = req.files['images'].map(file => file.filename);
            // }

            // // If no images were uploaded, set to a random image
            // if (imgArr.length === 0 && !req.files['images']) {
            //     imgArr = [randomImage('images')];
            // }

            const { title, price, oldprice, quantity, category, color, size, brand, description } = req.body;

            const updated = await productModel.updateOne({ _id: productid }, {
                $set: {
                    title: title,
                    price: price,
                    oldprice: oldprice,
                    quantity: quantity,
                    category: category,
                    color: color,
                    size: size,
                    brand: brand,
                    description: description,
                    thumbnail: img,
                    // images: imgArr
                }
            })
            if (updated.modifiedCount > 0) {
                return res.status(200).json({
                    message: "Product updated successfully",
                    success: true
                })
            }
            return res.status(400).json({
                message: "Success went wrong!",
                success: false
            })

        })
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.product_id;
        console.log(productId)
        const find = await productModel.findById({ _id: productId })
        if (find.thumbnail) {
            console.log(find.thumbnail)
            if (existsSync("./uploads/" + find.thumbnail)) {
                fs.unlinkSync("./uploads/" + find.thumbnail);
            }
        }
        if (find.images) {
            console.log(find.images)
            find.images.forEach(image => {
                const imagePath = path.join('./uploads', image);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                } else {
                    console.log(`File not found: ${imagePath}`);
                }
            });
        }
        const response = await productModel.deleteOne({ _id: productId })
        return res.status(200).json({
            data: response,
            message: "Product deleted successfully",
            success: true,
            deletedId: productId,
            deletedProduct: find,
        })
    } catch (error) {
        return res.status(500).json({ message: "Failed to delete product", success: false, error: error.message })
    }
}

