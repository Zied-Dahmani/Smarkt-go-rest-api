import express from 'express';

import { getAll } from '../controllers/user.js';
  
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
  .route('/')
  .get(getAll);

export default router;