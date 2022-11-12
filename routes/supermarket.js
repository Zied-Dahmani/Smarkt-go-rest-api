import express from 'express';

import { getAll, create, getNearest, getCategories } from '../controllers/supermarket.js';
  
const router = express.Router();

router
  .route('/')
  .get(getAll)
  .post(getNearest)

router
  .route('/create')
  .post(create);

router
  .route('/getCategories')
  .get(getCategories)

export default router;