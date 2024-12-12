import express from "express";
import { test } from "../contollers/user.controller.js";

const router = express.Router();
//we create routes in backend using router

router.get('/test',test);

export default router;
//when we export something as default then we can change the name while keeping the address same while importing it