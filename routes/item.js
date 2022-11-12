import express from 'express';

import { getAllBySupermarketIdAndCategory, create } from '../controllers/item.js';
  
const router = express.Router();

router
  .route('/')
  .post(getAllBySupermarketIdAndCategory)

  router
  .route('/create')
  .post(create)


export default router;