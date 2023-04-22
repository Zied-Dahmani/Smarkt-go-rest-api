import express from 'express';

import { create,getSupermarketReviews } from '../controllers/review.js';
  
const router = express.Router();

router
.route('/')
.post(getSupermarketReviews)

  router
  .route('/create')
  .post(create)


export default router;