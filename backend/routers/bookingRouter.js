import express from "express";

import {
  createBooking,
  processPayment,
  getUserBookings,
  getBookingById,
  cancelBooking,
  checkoutBooking,
  getCheckoutInvoice
} from "../controllers/bookingController.js";

const router = express.Router();

router.post(
  "/",
  createBooking
);

router.post(
  "/payment",
  processPayment
);

router.get(
  "/user/:userId",
  getUserBookings
);

router.get(
  "/invoice/:invoiceNumber",
  getCheckoutInvoice
);

router.put(
  "/cancel/:bookingId",
  cancelBooking
);

router.put(
  "/:id/checkout",
  checkoutBooking
);

router.get(
  "/:bookingId",
  getBookingById
);

export default router;