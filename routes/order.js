import express from 'express';

import { create } from '../controllers/order.js';
  
const router = express.Router();

router
  .route('/create')
  .post(create);

  export default router;