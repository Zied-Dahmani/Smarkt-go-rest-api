import express from 'express';
import { getAll, create, getNearby, getCategories, getFavorites, isFavorite, addRemoveFavorite } from '../controllers/supermarket.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Supermarket
 *   description: Supermarket Endpoint
 */

/**
 * @swagger
 * /supermarket:
 *   get:
 *     summary: Get all supermarkets
 *     tags: [Supermarket]
 *     responses:
 *       200:
 *         description: Returns all supermarkets
 *       500:
 *         description: Internal server error
 *
 *   post:
 *     summary: Get nearby supermarkets
 *     tags: [Supermarket]
 *     responses:
 *       200:
 *         description: Returns nearby supermarkets
 *       500:
 *         description: Internal server error
 */
router.route('/')
  .get(getAll)
  .post(getNearby);

/**
 * @swagger
 * /supermarket/create:
 *   post:
 *     summary: Create a new supermarket
 *     tags: [Supermarket]
 *     responses:
 *       200:
 *         description: Returns the new supermarket
 *       500:
 *         description: Internal server error
 */
router.route('/create')
  .post(create);

/**
 * @swagger
 * /supermarket/getCategories:
 *   get:
 *     summary: Get all categories
 *     tags: [Supermarket]
 *     responses:
 *       200:
 *         description: Returns all categories
 *       500:
 *         description: Internal server error
 */
router.route('/getCategories')
  .get(getCategories);

/**
 * @swagger
 * /supermarket/getFavorites:
 *   post:
 *     summary: Get favorites
 *     tags: [Supermarket]
 *     responses:
 *       200:
 *         description: Returns favorites
 *       500:
 *         description: Internal server error
 */
router.route('/getFavorites')
  .post(getFavorites);

/**
 * @swagger
 * /supermarket/isFavorite:
 *   post:
 *     summary: Check if a supermarket is a favorite
 *     tags: [Supermarket]
 *     responses:
 *       200:
 *         description: Returns if the supermarket is a favorite
 *       500:
 *         description: Internal server error
 */
router.route('/isFavorite')
  .post(isFavorite);

/**
 * @swagger
 * /supermarket/addRemoveFavorite:
 *   post:
 *     summary: Add or remove a supermarket from favorites
 *     tags: [Supermarket]
 *     responses:
 *       200:
 *         description: Returns the updated list of favorites
 *       500:
 *         description: Internal server error
 */
router.route('/addRemoveFavorite')
  .post(addRemoveFavorite);

export default router;
