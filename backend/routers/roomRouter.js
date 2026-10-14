import express from "express";

import {
  getRooms,
  getRoomTypes,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
  getReceptionistRooms
} from "../controllers/roomController.js";

const router = express.Router();

router.get(
  "/types",
  getRoomTypes
);

router.get(
  "/receptionist/availability",
  getReceptionistRooms
);

router.get(
  "/:id",
  getRoomById
);

router.get(
  "/",
  getRooms
);

router.post(
  "/",
  createRoom
);

router.put(
  "/:id",
  updateRoom
);

router.delete(
  "/:id",
  deleteRoom
);

export default router;