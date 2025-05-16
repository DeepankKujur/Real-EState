import Purchase from '../models/purchase.model.js';
import Listing from '../models/listing.model.js';
import User from '../models/user.model.js';
import Razorpay from 'razorpay';


import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { sendMail } from '../utils/sendMail.js';
dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

export const createOrder = async (req, res) => {
  const { amount } = req.body;

  try {
    const order = await razorpay.orders.create({
      amount: amount * 100, // Convert to paise
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
    });


    res.status(200).json({ 
      success: true, 
      order 
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ 
      success: false, 
      message: "Order creation failed",
      error: error.message 
    });
  }
};

export const recordPurchase = async (req, res) => {
  try {
    const { userId, listingId, paymentId, amount,email ,username} = req.body;

    // Validate required fields
    if (!userId || !listingId || !paymentId || !amount ||!email ||!username) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    // Create new purchase record
    const purchase = await Purchase.create({
      userId,
      listingId,
      paymentId,
      amount,
      email,
      username
    });

    // Update user's purchases array
    await User.findByIdAndUpdate(
      userId,
      { $push: { purchases: purchase._id } },
      { new: true }
    );

    sendMail(email,`welcome to out real-estate project`,`Hi ,${username} Thank you for registering....`)
    res.status(201).json({ 
      success: true, 
      purchase 
    });
  } catch (error) {
    console.error("Error recording purchase:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to record purchase",
      error: error.message 
    });
  }
};

export const getUserPurchases = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID"
      });
    }

    const purchases = await Purchase.find({ userId })
      .populate('listingId')
      .sort({ createdAt: -1 });

    res.status(200).json({ 
      success: true, 
      count: purchases.length,
      purchases 
    });
  } catch (error) {
    console.error("Error fetching user purchases:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to fetch purchases",
      error: error.message 
    });
  }
};

// Add this new function to handle payment details
export const getPaymentDetails = async (req, res) => {
  try {
    const { paymentId } = req.params;

    const purchase = await Purchase.findOne({ paymentId })
      .populate('userId', 'username email avatar')
      .populate('listingId');

    if (!purchase) {
      return res.status(404).json({
        success: false,
        message: "Purchase not found"
      });
    }

    res.status(200).json({
      success: true,
      purchase
    });
  } catch (error) {
    console.error("Error fetching payment details:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch payment details",
      error: error.message
    });
  }
};