import brandModel from "../models/brand.model";

export const addBrand = async (req, res) => {
    try {
        
        const { name, descreption } = req.body;
        console.log(req.body);
        const created = await brandModel.create({
            name: name,
            descreption: descreption
        });
        res.status(201).json({
            message: "Brand added successfully",
            success: true,
            data: created
        });
    } catch (error) {
        res.status(500).json({ message:error.message, success: false });
    }
}

export const getBrands = async (req, res) => {
    try {
        const brands = await brandModel.find();
        res.status(200).json({
            message: "Brands fetched successfully",
            success: true,
            data: brands
        });
    } catch (error) {
        res.status(500).json({ message: "An error occurred while fetching brands", success: false });
    }
}

export const getBrandById = async (req, res) => {
    try {
        const brandId = req.params.brand_id;
        const brand = await brandModel.findOne({ _id: brandId });
        // if (!brand) {
        //     return res.status(404).json({ message: "Brand not found", success: false });
        // }
        res.status(200).json({
            message: "Brand fetched successfully",
            success: true,
            data: brand
        });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
}

export const updateBrand = async (req, res) => {
    try {
        const brandId = req.params.brand_id;
        const updatedBrand = await brandModel.updateOne({ _id: brandId }, {
            $set: {
                name: req.body.name,
                descreption: req.body.descreption
            }
        });
        if (!updatedBrand) {
            return res.status(404).json({ message: "Brand not found", success: false });
        }
        if (updatedBrand.modifiedCount > 0) {
            res.status(200).json({
                message: "Brand updated successfully",
                success: true,
            })
        }else {
            return res.status(400).json({
                message: 'No changes made to the address',
                success: false
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
}


export const deleteBrand = async (req, res) => {
    try {
        const brandId = req.params.brand_id;
        const deletedBrand = await brandModel.deleteOne({ _id: brandId }); // changed to deleteOne
        if (deletedBrand.deletedCount === 0) {
            return res.status(404).json({ message: "Brand not found", success: false });
        }
        res.status(200).json({
            message: "Brand deleted successfully",
            success: true,
        });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
}