import mongoose from "mongoose";

const roomMaintenanceSchema = new mongoose.Schema(
  {
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
      unique: true
    },

    status: {
      type: String,
      enum: [
        "needs_cleaning",
        "cleaned"
      ],
      default: "needs_cleaning"
    },

    lastCleanedAt: {
      type: Date,
      default: null
    },

    nextCleaningDueAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

const RoomMaintenance =
  mongoose.model(
    "RoomMaintenance",
    roomMaintenanceSchema
  );

export default RoomMaintenance;