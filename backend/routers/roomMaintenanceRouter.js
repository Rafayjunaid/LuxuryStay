import express from "express";

import {
  getRoomMaintenance,
  markRoomCleaned
} from "../controllers/roomMaintenanceController.js";

const router =
  express.Router();

router.get(
  "/",
  getRoomMaintenance
);

router.put(
  "/:roomId/clean",
  markRoomCleaned
);

export default router;