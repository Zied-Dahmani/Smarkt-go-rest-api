import express from 'express';

import { add, deleteOrder, get, removeItem } from '../controllers/order.js';
  
const router = express.Router();

router
  .route('/add')
  .post(add);

router
  .route('/get')
  .post(get);

router
  .route('/removeItem')
  .post(removeItem);

router
  .route('/delete')
  .post(deleteOrder);

export default router;