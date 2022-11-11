import express from 'express';

import { getAll, create, findNearest } from '../controllers/supermarket.js';
  
const router = express.Router();

router
  .route('/')
  .get(getAll)
  .post(findNearest)

  

  router
  .route('/create')
  .post(create);

 

export default router;