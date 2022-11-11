import express from 'express';

import { getAll, create, getNearest } from '../controllers/supermarket.js';
  
const router = express.Router();

router
  .route('/')
  .get(getAll)
  .post(getNearest)

  router
  .route('/create')
  .post(create);

 

export default router;