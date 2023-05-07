import express from 'express';

import { create, getAll, redeemTicket, updateTicket } from '../controllers/ticket.js';
  
const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Tickets
 *   description: Tickets Endpoint
 */

/**
 * @swagger
 * /ticket/create:
 *   post:
 *     summary: Create a new ticket
 *     tags: [Tickets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: integer
 *                 description: The code of the ticket.
 *               value:
 *                 type: integer
 *                 description: The value of the ticket.
 *     responses:
 *       200:
 *         description: A new ticket object.
 *       400:
 *         description: Invalid request body.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /ticket:
 *   get:
 *     summary: Get all tickets
 *     tags: [Tickets]
 *     responses:
 *       200:
 *         description: An array of ticket objects.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /ticket/update:
 *   post:
 *     summary: Update a ticket
 *     tags: [Tickets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: integer
 *                 description: The code of the ticket.
 *               value:
 *                 type: integer
 *                 description: The new value of the ticket.
 *     responses:
 *       200:
 *         description: The updated ticket object.
 *       400:
 *         description: Invalid request body.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /ticket/redeem:
 *   post:
 *     summary: Redeem a ticket
 *     tags: [Tickets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: integer
 *                 description: The code of the ticket to redeem.
 *     responses:
 *       200:
 *         description: The redeemed ticket object.
 *       400:
 *         description: Invalid request body.
 *       500:
 *         description: Internal server error.
 */


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