import express from 'express';
import { create, getSupermarketReviews } from '../controllers/review.js';

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Reviews Endpoint
 */
/**
 * @swagger
 * /review:
 *   post:
 *     summary: Get all reviews for a supermarket
 *     description: Returns an array of all reviews for a specified supermarket
 *     tags: 
 *       - Reviews
 *     parameters:
 *       - in: body
 *         name: supermarketId
 *         required: true
 *         description: ID of the supermarket to retrieve reviews for
 *         schema:
 *           type: object
 *           properties:
 *             supermarketId:
 *               type: string
 *               format: objectid
 *     responses:
 *       200:
 *         description: An array of review objects
 *       500:
 *         description: Internal server error
 */

router
  .route('/')
  .post(getSupermarketReviews);


/**
 * @swagger
 * /review/create:
 *   post:
 *     summary: Create a new review
 *     description: Creates a new review for a specified supermarket
 *     tags: 
 *       - Reviews
 *     requestBody:
 *       required: true
 *       description: Review object to be created
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               supermarketId:
 *                 type: string
 *                 description: ID of the supermarket to create the review for
 *               rating:
 *                 type: number
 *                 description: The rating of the review
 *               description:
 *                 type: string
 *                 description: The comment of the review
 *               userId:
 *                 type: string
 *                 description: The ID of the user creating the review
 *               title:
 *                 type: string
 *                 description: The title of the review
 *               username:
 *                 type: string
 *                 description: The username of the user creating the review
 *     responses:
 *       200:
 *         description: The newly created review object
 *       500:
 *         description: Internal server error
 */

router
  .route('/create')
  .post(create);

export default router;
