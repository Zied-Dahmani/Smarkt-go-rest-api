import express from 'express';

import { signUp, signIn } from '../controllers/user.js';
  
const router = express.Router();

/*
router
  .route('/signin')
  .post(signin);  
router
  .route('/:id')
  .put(putOnce);
  */

router
  .route('/signUp')
  .post(signUp);

router
  .route('/signIn')
  .post(signIn);

export default router;