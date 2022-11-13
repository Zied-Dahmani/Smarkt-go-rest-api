import express from 'express';

import { getAll, create, getNearest, getCategories, getFavorites, isFavorite, addRemoveFavorite } from '../controllers/supermarket.js';
  
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

router
  .route('/getFavorites')
  .post(getFavorites)

router
  .route('/isFavorite')
  .post(isFavorite)

router
  .route('/addRemoveFavorite')
  .post(addRemoveFavorite)


  export default router;