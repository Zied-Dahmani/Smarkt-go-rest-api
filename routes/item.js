import express from 'express';

import { getAllBySupermarketIdAndCategory, create, bestSellers } from '../controllers/item.js';
  
const router = express.Router();

router
  .route('/')
  .post(getAllBySupermarketIdAndCategory)
  .get(bestSellers)

  router
  .route('/create')
  .post(create)


export default router;