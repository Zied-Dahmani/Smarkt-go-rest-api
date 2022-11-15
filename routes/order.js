import express from 'express';

import { add } from '../controllers/order.js';
  
const router = express.Router();

router
  .route('/add')
  .post(add);

  export default router;