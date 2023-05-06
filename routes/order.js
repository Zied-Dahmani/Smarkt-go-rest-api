import express from 'express';

import { addToCart, addUser, deleteOrder, get, getMessages, getMyOrders, getNonMembers, removeItem, sendMessage } from '../controllers/order.js';
import {requireAuth } from '../middlewares/auth.js'
  
const router = express.Router();



router
  .post('/addToCart',requireAuth,addToCart);

router
.get('/get',requireAuth,get);

router
.get('/getMyOrders',getMyOrders);

router
.post('/removeItem',requireAuth,removeItem);


router
  .post('/delete',requireAuth,deleteOrder);

router
.get('/getNonMembers',getNonMembers);

router
.post('/send',sendMessage);

router
.post('/chat',getMessages);

router
  .route('/addUser')
  .post(addUser)

 

export default router;