
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import managerRouter from "./routers/managerRouter.js";
import authRouter from "./routers/AuthRoutes.js";
import roomRouter from "./routers/roomRouter.js";
import bookingRouter from "./routers/bookingRouter.js";
import feedbackRouter from "./routers/feedbackRouter.js";
import receptionistRouter from "./routers/receptionistRouter.js";
import complaintRouter from "./routers/complaintRouter.js";
import roomMaintenanceRouter from "./routers/roomMaintenanceRouter.js";
import adminRouter from "./routers/adminRouter.js";
// import adminRouter from "./routers/adminRouter.js";
import startRoomMaintenanceScheduler from "./services/roomMaintenanceScheduler.js";

dotenv.config();

const app = express();

app.use((req, res, next) => {

  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );

  res.setHeader(
    "Pragma",
    "no-cache"
  );

  res.setHeader(
    "Expires",
    "0"
  );

  next();
});

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {

    console.log("MongoDB connected");

    startRoomMaintenanceScheduler();

  })
  .catch((error) => {

    console.log(error);

  });

  app.use(
  "/api/manager",
  managerRouter
);

app.use(
  "/api/admin",
  adminRouter
);

app.use("/api/auth", authRouter);
app.use("/api/rooms", roomRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/feedback", feedbackRouter);
app.use("/api/receptionist", receptionistRouter);
app.use("/api/complaints", complaintRouter);
app.use(
  "/api/room-maintenance",
  roomMaintenanceRouter
);
// app.use("/api/admin", adminRouter);

app.listen(5000, () => {

  console.log(
    "Server running on port 5000"
  );

});

