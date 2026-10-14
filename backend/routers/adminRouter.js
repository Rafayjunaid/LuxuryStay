import express from "express";

import {
  getAdminDashboard,
  getAdminUsers,
  updateUserRole,
  toggleUserBlock,
  getAdminReservations,
  getAdminPayments,
  getAdminInvoices
} from "../controllers/adminController.js";

const router = express.Router();


// Dashboard
router.get(
  "/dashboard",
  getAdminDashboard
);


// Users
router.get(
  "/users",
  getAdminUsers
);

router.put(
  "/users/:id/role",
  updateUserRole
);

router.put(
  "/users/:id/block",
  toggleUserBlock
);


// Reservations
router.get(
  "/reservations",
  getAdminReservations
);


// Payments
router.get(
  "/payments",
  getAdminPayments
);


// Invoices
router.get(
  "/invoices",
  getAdminInvoices
);


export default router;