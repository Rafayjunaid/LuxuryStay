import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  profilePic: {
    type: String,
    default: ""
  },

  role: {
    type: String,
    enum: [
      "guest",
      "admin",
      "receptionist",
      "manager",
      "housekeeping"
    ],
    default: "guest"
  },

  isBlocked: {
    type: Boolean,
    default: false
  }
});

const User = mongoose.model("User", userSchema);

export default User;