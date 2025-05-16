// models/purchase.model.js
import mongoose from 'mongoose';

const purchaseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    listingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Listing',
      required: true,
    },
    paymentId: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    email: {
      type:String,
      required: true,
    },
    username: {
      type:String,
      required: true,
    },
  },
  { timestamps: true }
);

const Purchase = mongoose.model('Purchase', purchaseSchema);

export default Purchase;