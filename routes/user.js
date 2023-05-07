
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User Endpoint
 */

/**
 * @swagger
 * /user/signUp:
 *   post:
 *     summary: Registering a new User
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               provider:
 *                 type: string
 *               id:
 *                 type: string
 *               fullName:
 *                 type: string
 *               image:
 *                 type: string
 *               wallet:
 *                 type: number
 *             example:
 *               provider: phone
 *               id: 50870790
 *               fullName: Mohamed Islem Samaali
 *               image: https://loremflickr.com/cache/resized/65535_52764188094_a51549f3e7_320_240_nofilter.jpg
 *               wallet: 1000
 *     responses:
 *       '201':
 *         description: User created successfully
 *       '400':
 *         description: Bad request
 *       '409':
 *         description: User already exists
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /user/signIn:
 *   post:
 *     summary: Sign in a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               provider:
 *                 type: string
 *               id:
 *                 type: string
 *             example:
 *               provider: google
 *               id: mo7mdisl3m@gmail.com
 *     responses:
 *       '200':
 *         description: User signed in successfully
*/
/**
 * @swagger
 * /users/signOut:
 *   get:
 *     summary: Sign out the user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Successfully signed out
 *       401:
 *         description: not authorized
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /users/update:
 *   post:
 *     summary: Update user profile
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 description: The full name of the user
 *               image:
 *                 type: string
 *                 description: The URL of the user's profile picture
 *             example:
 *               fullName: Mohamed Islem Samaali
 *               image: https://loremflickr.com/cache/resized/65535_52764188094_a51549f3e7_320_240_nofilter.jpg
 *     responses:
 *       200:
 *         description: Successfully updated the user profile
 *         content:
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: not authorized
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /users/updatePic:
 *   post:
 *     summary: Update user profile picture
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The new profile picture of the user
 *             example:
 *               image: binary
 *     responses:
 *       200:
 *         description: Successfully updated the user profile picture
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: not authorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /users/updateWallet:
 *   post:
 *     summary: Update user wallet
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               wallet:
 *                 type: number
 *                 description: The new balance of the user's wallet  after redeeming a ticket
 *             example:
 *               wallet: 500
 *     responses:
 *       200:
 *         description: Successfully updated the user wallet
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: not authorized
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /user/getGroupMembers:
 *   post:
 *     summary: Get group members
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               groupId:
 *                 type: string
 *                 description: The ID of the group to retrieve members for.
 *             example:
 *               group: "645534d75968b22a85ffc6f9"
 *     responses:
 *       200:
 *         description: A list of users who are members of the specified group.
 *       401:
 *         description: not authorized
 *       500:
 *         description: Internal server error
 *
 * /user/getAllUsers:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of all users
 *       401:
 *         description: not authorized
 *       500:
 *         description: Internal server error
 */
import express from 'express';

import { signUp, signIn , signOut, updateProfile, getGroupMembers, getAllUsers, updateProfilePicture, updateWallet} from '../controllers/user.js';
import {requireAuth } from '../middlewares/auth.js'

const router = express.Router();

router
  .route('/signUp')
  .post(signUp);

router
  .route('/signIn')
  .post(signIn);

router
  .route('/signOut')
  .get(signOut);

router
  .route('/update')
  .post(updateProfile)

router
   .route('/updatePic')
   .post(updateProfilePicture)

router
   .post('/updateWallet',requireAuth,updateWallet);


router
  .route('/getGroupMembers')
  .post(getGroupMembers)
  
router
  .route('/getAllUsers')
  .get(getAllUsers)

export default router;