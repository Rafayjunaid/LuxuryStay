import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      required: true,
      unique: true
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
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

    guests: {
      type: Number,
      required: true
    },

    nights: {
      type: Number,
      required: true
    },

    totalPrice: {
      type: Number,
      required: true
    },

    additionalCharges: {
      type: Number,
      default: 0
    },

    amountPaid: {
      type: Number,
      default: 0
    },

    paymentMethod: {
      type: String,
      enum: [
        "card",
        "cash",
        "bank_transfer",
        "other"
      ],
      default: "card"
    },

    paymentStatus: {
      type: String,
      enum: [
        "pending",
        "partial",
        "paid",
        "failed"
      ],
      default: "pending"
    },

    refundStatus: {
      type: String,
      enum: [
        "not_applicable",
        "pending",
        "refunded"
      ],
      default: "not_applicable"
    },

    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "occupied",
        "cancelled",
        "completed"
      ],
      default: "pending"
    }
  },
  {
    timestamps: true
  }
);

const Booking = mongoose.model(
  "Booking",
  bookingSchema
);

export default Booking;