import express from 'express';

import { create, getAll, redeemTicket, updateTicket } from '../controllers/ticket.js';
  
const router = express.Router();

router
  .route('/create')
  .post(create);

router
  .route('/')
  .get(getAll);

router
  .route('/update')
  .post(updateTicket);

  router
  .route('/redeem')
  .post(redeemTicket)

  export default router;