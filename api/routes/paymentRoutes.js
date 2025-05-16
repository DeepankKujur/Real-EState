import express from "express";
import {
  createOrder,
  recordPurchase,
  getUserPurchases,
  getPaymentDetails
} from "../contollers/paymentController.js";

const router = express.Router();

router.post("/create-order", createOrder);
router.post("/record-purchase", recordPurchase);
router.get("/user-purchases/:userId", getUserPurchases);
router.get("/payment-details/:paymentId", getPaymentDetails);

export default router;