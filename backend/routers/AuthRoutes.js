import express from "express";
import multer from "multer";

import {
  signup,
  login,
  updateProfile,
  logout
} from "../controllers/AuthController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + "-" + file.originalname
    );
  }
});

const upload = multer({ storage });

router.post(
  "/signup",
  upload.single("profilePic"),
  signup
);

router.post(
  "/login",
  login
);

router.put(
  "/profile/:id",
  upload.single("profilePic"),
  updateProfile
);

router.post(
  "/logout",
  logout
);

export default router;