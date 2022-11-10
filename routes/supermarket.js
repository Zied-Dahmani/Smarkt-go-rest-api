import express from 'express';

import { getAll, create } from '../controllers/supermarket.js';
  
const router = express.Router();

router
  .route('/')
  .get(getAll);
 
  router
  .route('/create')
  .post(create);

export default router;