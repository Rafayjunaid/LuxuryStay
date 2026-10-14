import express from "express";

import {
  getManagerDashboard,
  getManagerRooms,
  getManagerRoomDetails,
  getManagerGuests,
  getManagerGuestDetails,
  getManagerReservations,
  getManagerPayments,
  getManagerInvoices,
  getManagerFeedback,
  getManagerComplaints
} from "../controllers/managerController.js";

const router = express.Router();

router.get(
  "/dashboard",
  getManagerDashboard
);

router.get(
  "/rooms",
  getManagerRooms
);

router.get(
  "/rooms/:id",
  getManagerRoomDetails
);

router.get(
  "/guests",
  getManagerGuests
);

router.get(
  "/guests/:id",
  getManagerGuestDetails
);

router.get(
  "/reservations",
  getManagerReservations
);

router.get(
  "/payments",
  getManagerPayments
);

router.get(
  "/invoices",
  getManagerInvoices
);

router.get(
  "/feedback",
  getManagerFeedback
);

router.get(
  "/complaints",
  getManagerComplaints
);

export default router;