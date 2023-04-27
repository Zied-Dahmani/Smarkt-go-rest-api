import express from 'express';

import { addToCart, addUser, deleteOrder, get, getMyOrders, removeItem } from '../controllers/order.js';
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
  .route('/addUser')
  .post(addUser)

 

export default router;