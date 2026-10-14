import mongoose from "mongoose";

const roomTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },

    price: {
      type: Number,
      required: true
    },

    capacity: {
      type: Number,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    images: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true
  }
);

const RoomType = mongoose.model(
  "RoomType",
  roomTypeSchema
);

export default RoomType;