import addressModel from "../models/address.model";
import userModel from "../models/user.model";

export const addAddress = async (req, res) => {
    try {
        const { firstName, lastName, contact, email, address, city, zipCode } = req.body;
        const userId = req.user.data.id;
        console.log('user ID ', userId) 
        const created = await addressModel.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            contact: contact,
            address: address,
            city: city,
            zipCode: zipCode,
            userId: userId,
        });


        return res.status(200).json({
            user: created,
            message: 'Address added successfully',
            success: true
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getAddresses = async (req, res) => {
    try {
        const userId = req.user.data.id; 
        const addressData = await addressModel.find({userId: userId});
        console.log(addressData)
        return res.status(200).json({
            data: addressData,
            message: 'Addresses fetched successfully',
            success: true
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getAddressById = async (req, res) => {
    try {
        const addressId = req.params.address_id;
        console.log("test");
        const addressData = await addressModel.findOne({ _id: addressId });
        return res.status(200).json({
            data: addressData,
            message: 'Address fetched successfully',
            success: true
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const updateAddress = async (req, res) => {
    try {
        const addressId = req.params.address_id;
        const { firstName, lastName, email, address, city, zipCode, contact } = req.body;
        console.log('body', req.body);
        const updated = await addressModel.updateOne({ _id: addressId }, {
            $set: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                contact: contact,
                address: address,
                city: city,
                zipCode: zipCode,
            }
        });

        if (updated.modifiedCount > 0) {
            return res.status(200).json({
                data: updated,
                message: 'Address updated successfully',
                success: true
            });
        } else {
            return res.status(400).json({
                message: 'No changes made to the address',
                success: false
            });
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const deleteAddress = async (req, res) => {
    try {
        // const userId = req.user.data.id; 
        const addressId = req.params.address_id;
        const addressAddress = await addressModel.deleteOne({ _id: addressId });
        if (addressAddress.deletedCount > 0) {
            return res.status(200).json({
                message: 'Address deleted successfully',
                success: true
            });
        } else {
            return res.status(404).json({
                message: 'Address not found',
                success: false
            });
        }

    } catch (error) {
        return res.status(500).json({ message: error.message }, { success: false })
    }
}


export const selectAddress = async (req, res) => {
    try {
        const userId = req.user.data.id; 
        const { addressId } = req.body;
        
        console.log('User ID:', userId);
        console.log('Selected address ID:', addressId);

        const user = await userModel.findByIdAndUpdate(userId, { $set: { address: addressId } }, { new: true });

        if (user) { 
            return res.status(200).json({
                message: 'Address selected successfully',
                success: true
            });
        } else {
            return res.status(404).json({
                message: 'User not found',
                success: false
            });
        }
    } catch (error) {
        console.error(error); 
        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
};
