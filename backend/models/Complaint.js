import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true
    },

    roomNumber: {
      type: String,
      required: true
    },

    guestName: {
      type: String,
      required: true
    },

    complaint: {
      type: String,
      required: true
    },

    status: {
      type: String,
      enum: [
        "pending",
        "in_progress",
        "resolved"
      ],
      default: "pending"
    }
  },
  {
    timestamps: true
  }
);

const Complaint = mongoose.model(
  "Complaint",
  complaintSchema
);

export default Complaint;