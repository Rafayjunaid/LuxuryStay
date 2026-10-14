import mongoose from "mongoose";

const checkoutInvoiceSchema =
  new mongoose.Schema(
    {
      invoiceNumber: {
        type: String,
        required: true,
        unique: true
      },

      bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
        required: true
      },

      bookingNumber: {
        type: String,
        required: true
      },

      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      },

      guestName: {
        type: String,
        required: true
      },

      guestEmail: {
        type: String,
        required: true
      },

      roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
        required: true
      },

      roomNumber: {
        type: String,
        required: true
      },

      roomType: {
        type: String,
        required: true
      },

      guests: {
        type: Number,
        required: true
      },

      checkIn: {
        type: Date,
        required: true
      },

      checkOut: {
        type: Date,
        required: true
      },

      nights: {
        type: Number,
        required: true
      },

      roomCharges: {
        type: Number,
        required: true
      },

      additionalCharges: {
        type: Number,
        default: 0
      },

      totalAmount: {
        type: Number,
        required: true
      },

      amountPaid: {
        type: Number,
        required: true
      },

      remainingAmount: {
        type: Number,
        required: true
      },

      paymentMethod: {
        type: String,
        enum: [
          "card",
          "cash",
          "bank_transfer",
          "other"
        ],
        required: true
      },

      paymentStatus: {
        type: String,
        enum: [
          "unpaid",
          "partial",
          "paid"
        ],
        required: true
      },

      checkoutDate: {
        type: Date,
        default: Date.now
      }
    },
    {
      timestamps: true
    }
  );

const CheckoutInvoice =
  mongoose.model(
    "CheckoutInvoice",
    checkoutInvoiceSchema
  );

export default CheckoutInvoice;