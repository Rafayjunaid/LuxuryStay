import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    roomNumber: {
      type: String,
      required: true,
      unique: true
    },

    roomType: {
      type: String,
      required: true
    },

    price: {
      type: Number,
      required: true
    },

    capacity: {
      type: Number,
      required: true
    },

    amenities: {
      type: [String],
      default: []
    },

    description: {
      type: String,
      required: true
    },

    photos: {
      type: [String],
      default: []
    },

    status: {
      type: String,
      enum: [
        "available",
        "reserved",
        "occupied",
        "maintenance"
      ],
      default: "available"
    }
  },
  {
    timestamps: true
  }
);

const Room = mongoose.model(
  "Room",
  roomSchema
);

export default Room;