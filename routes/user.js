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