import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
<<<<<<< HEAD
import { deleteUser, getuserListings, test, updateUser,getUser } from "../contollers/user.controller.js";
=======
import { deleteUser, getuserListings, test, updateUser, userFeedback } from "../contollers/user.controller.js";
>>>>>>> main

const router = express.Router();
//we create routes in backend using router

router.get('/test', test);
router.post('/update/:id',verifyToken ,updateUser)
router.delete('/delete/:id', verifyToken, deleteUser)
<<<<<<< HEAD
router.get('/listings/:id',verifyToken,getuserListings)
router.get('/:id',verifyToken,getUser)
=======
router.get('/listings/:id', verifyToken, getuserListings)
router.post('/feedback', userFeedback);
>>>>>>> main



export default router;
//when we export something as default then we can change the name while keeping the address same while importing it