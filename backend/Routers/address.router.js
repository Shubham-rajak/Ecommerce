import express from 'express';
import { addAddress, deleteAddress, getAddressById, getAddresses, selectAddress, updateAddress } from '../controllers/address.controller';
import {auth} from '../middleware/auth.middlewere'

const router = express.Router();
router.post('/add-address',auth, addAddress);
router.get('/get-addresses',auth,getAddresses);
router.get('/get-address/:address_id',auth,getAddressById)
router.put('/update-address/:address_id',auth,updateAddress);
router.delete('/delete-address/:address_id',auth,deleteAddress);

router.get('select-address',auth,selectAddress)

export default router;
