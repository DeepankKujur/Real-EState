import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { deleteUser, getuserListings, test, updateUser,getUser } from "../contollers/user.controller.js";

const router = express.Router();
//we create routes in backend using router

router.get('/test', test);
router.post('/update/:id',verifyToken ,updateUser)
router.delete('/delete/:id', verifyToken, deleteUser)
router.get('/listings/:id',verifyToken,getuserListings)
router.get('/:id',verifyToken,getUser)



export default router;
//when we export something as default then we can change the name while keeping the address same while importing it