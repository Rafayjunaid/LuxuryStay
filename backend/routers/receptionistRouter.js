import express from "express";

import {
  getReceptionistGuests,
  getReceptionistReservations,
  verifyAndOccupyReservation
} from "../controllers/receptionistController.js";

const router = express.Router();

router.get(
  "/guests",
  getReceptionistGuests
);

router.get(
  "/reservations",
  getReceptionistReservations
);

router.put(
  "/reservations/:id/occupy",
  verifyAndOccupyReservation
);

export default router;