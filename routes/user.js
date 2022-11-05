import express from 'express';

import { signUp } from '../controllers/user.js';
  
const router = express.Router();

/*
router
  .route('/signin')
  .post(signin);

router
  .route('/signup')
  .post(signup);

  
router
  .route('/:id')
  .put(putOnce);
  */

router
  .route('/signUp')
  .post(signUp);

export default router;