import express from 'express';

import { signUp, signIn ,updateProfile, getGroupMembers, getAllUsers} from '../controllers/user.js';

const router = express.Router();

/*
router
  .route('/signin')
  .post(signin);  


router
  .route('/:id')
  .put(putOnce);
  */

router
  .route('/signUp')
  .post(signUp);

router
  .route('/signIn')
  .post(signIn);

router
  .route('/update')
  .post(updateProfile)

router
  .route('/getGroupMembers')
  .post(getGroupMembers)
  
router
  .route('/getAllUsers')
  .get(getAllUsers)

export default router;