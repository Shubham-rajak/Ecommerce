import express from 'express';
import {createPayment, verify } from '../controllers/payment.controller.js';
import { auth} from '../middleware/auth.middlewere.js';
import crypto from 'crypto';

const router = express.Router();

// router.post('/createpayment', auth, createPayment)
router.post('/createPayment',auth,createPayment);
router.post('/verify', auth, verify);

export default router
