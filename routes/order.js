/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Orders Endpoint
 */
/**
 * @swagger
 * /order/addToCart:
 *   post:
 *     summary: Add item to user's cart
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               itemId:
 *                 type: string
 *                 description: ID of the item to add to the cart
 *               quantity:
 *                 type: number
 *                 description: Quantity of the item to add to the cart
 *             required:
 *               - itemId
 *               - quantity
 *     responses:
 *       200:
 *         description: The updated cart object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cart:
 *                   type: array
 *                   description: Array of items in the cart
 *                   items:
 *                     type: object
 *                     properties:
 *                       item:
 *                         $ref: '#/components/schemas/Item'
 *                       quantity:
 *                         type: number
 *               example:
 *                 cart: [{ item: { name: "Item 1", price: 10 }, quantity: 2 }, { item: { name: "Item 2", price: 5 }, quantity: 1 }]
 *       400:
 *         description: Bad request, missing or invalid parameter(s)
 *       401:
 *         description: Unauthorized, user not authenticated
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /order/get:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: [eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MmUzZTIzMzdhMzBkZmZiZjYwYmYxMSIsImlhdCI6MTY4MzQ1NTQ1MiwiZXhwIjoxNjgzNzE0NjUyfQ.Q3g3tDL3--D_S-eWd9aCv2uMSvE39DtS-QeX0IWLGcM]
 *     responses:
 *       200:
 *         description: An array of order objects
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /order/getMyOrders:
 *   get:
 *     summary: Get the orders for the authenticated user
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 * 
 *     responses:
 *       200:
 *         description: An array of order objects
 *       401:
 *         description: not authorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /order/removeItem:
 *   post:
 *     summary: Remove an item from the user's cart
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               itemId:
 *                 type: string
 *                 description: The ID of the item to remove from the cart
 *             example:
 *               itemId: 615dd5d78ce6601f236aef22
 *     responses:
 *       200:
 *         description: The updated order object with the item removed
 *       401:
 *         description: not authorized
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /order/delete:
 *   delete:
 *     summary: Delete an order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: string
 *                 description: The ID of the order to delete
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       400:
 *         description: Bad request - order ID is missing or invalid
 *       401:
 *         description: not authorized
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /order/getNonMembers:
 *   get:
 *     summary: Get non-members
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: An array of non-member objects
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /order/send:
 *   post:
 *     summary: Send a message
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: string
 *               content:
 *                 type: string
 *               senderId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Message sent successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: not authorized
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /order/chat:
 *   post:
 *     summary: Get messages for a chatroom of users for an order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user that the authenticated user is chatting with
 *     responses:
 *       200:
 *         description: An array of message objects
 *       400:
 *         description: Bad request. The recipient parameter is missing or invalid
 *       401:
 *         description: not authorized
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /order/addUser:
 *   post:
 *     summary: Add a new user.
 *     tags: [Orders]  
 *     requestBody:
 *       description: User object to be added.
 *       required: true
 *     responses:
 *       200:
 *         description: User added successfully to the cart group.
 *       400:
 *         description: Invalid request body.
 *       500:
 *         description: Internal server error.
 */

import express from 'express';
import { addToCart, addUser, deleteOrder, get, getMyOrders, removeItem ,getNonMembers,sendMessage,getMessages} from '../controllers/order.js';
import { requireAuth } from '../middlewares/auth.js';
const router = express.Router();

router
  .post('/addToCart',requireAuth,addToCart);

router
.get('/get',requireAuth,get);

router
.get('/getMyOrders',getMyOrders);

router
.post('/removeItem',requireAuth,removeItem);


router
  .post('/delete',requireAuth,deleteOrder);

router
.get('/getNonMembers',getNonMembers);

router
.post('/send',sendMessage);
router
.post('/chat',getMessages);
router
  .route('/addUser')
  .post(addUser)

export default router;
