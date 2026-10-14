import express from "express";

import {
  createComplaint,
  getComplaints,
  updateComplaintStatus
} from "../controllers/complaintController.js";

const router =
  express.Router();

router.post(
  "/",
  createComplaint
);

router.get(
  "/",
  getComplaints
);

router.put(
  "/:id/status",
  updateComplaintStatus
);

export default router;