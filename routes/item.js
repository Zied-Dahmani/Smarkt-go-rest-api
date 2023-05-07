/**
 * @swagger
 * tags:
 *   name: Items
 *   description: Items Endpoint
 */

/**
 * @swagger
 * /item:
 *   post:
 *     summary: Get items by supermarket ID and category
 *     tags: [Items]
 *     requestBody:
 *       required: true
 *       description: The ID of the supermarket and the category of the items to retrieve
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               supermarketId:
 *                 type: string
 *               category:
 *                 type: string
 *             required:
 *               - supermarketId
 *               - category
 *     responses:
 *       200:
 *         description: An array of item objects
 *       500:
 *         description: Internal server error
 *
 *   get:
 *     summary: Get the best-selling items for all supermarkets
 *     tags: [Items]
 *     responses:
 *       200:
 *         description: An array of item objects
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /item/create:
 *   post:
 *     summary: Create a new item
 *     tags: [Items]
 *     requestBody:
 *       required: true
 *       description: Item object to be created
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               image:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               supermarketId:
 *                 type: string
 *               supermarketName:
 *                 type: string
 *               quantity:
 *                 type: number
 *               sales:
 *                 type: number
 *     responses:
 *       201:
 *         description: The newly created item object
 *       500:
 *         description: Internal server error
 */

import express from 'express';
import { getAllBySupermarketIdAndCategory, create, bestSellers } from '../controllers/item.js';
const router = express.Router();

router
  .route('/')
  .post(getAllBySupermarketIdAndCategory)
  .get(bestSellers);

router
  .route('/create')
  .post(create);

export default router;
