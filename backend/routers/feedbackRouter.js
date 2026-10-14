import express from "express";

import {
  createFeedback,
  getActiveFeedback,
  getAllFeedback,
  updateFeedbackStatus
} from "../controllers/feedbackController.js";

const router = express.Router();

router.post(
  "/",
  createFeedback
);

router.get(
  "/",
  getActiveFeedback
);

router.get(
  "/admin",
  getAllFeedback
);

router.put(
  "/:id/status",
  updateFeedbackStatus
);

export default router;