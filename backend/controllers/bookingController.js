import Booking from "../models/Booking.js";
import Room from "../models/Room.js";
import User from "../models/User.js";
import CheckoutInvoice from "../models/CheckoutInvoice.js";
import bcrypt from "bcryptjs";

export const createBooking = async (
  req,
  res
) => {
  try {

    const {
      userId,
      roomId,
      checkIn,
      checkOut,
      guests
    } = req.body;

    if (
      !userId ||
      !roomId ||
      !checkIn ||
      !checkOut ||
      !guests
    ) {
      return res.status(400).json({
        message:
          "All booking details are required"
      });
    }

    const startDate =
      new Date(checkIn);

    const endDate =
      new Date(checkOut);

    if (
      isNaN(startDate.getTime()) ||
      isNaN(endDate.getTime())
    ) {
      return res.status(400).json({
        message: "Invalid dates"
      });
    }

    if (startDate >= endDate) {
      return res.status(400).json({
        message:
          "Check-out date must be after check-in date"
      });
    }

    const room =
      await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({
        message: "Room not found"
      });
    }

    if (
      Number(guests) >
      room.capacity
    ) {
      return res.status(400).json({
        message:
          "This room cannot accommodate that many guests"
      });
    }

    const existingBooking =
      await Booking.findOne({
        roomId,

        status: {
          $in: [
            "confirmed",
            "occupied"
          ]
        },

        checkIn: {
          $lt: endDate
        },

        checkOut: {
          $gt: startDate
        }
      });

    if (existingBooking) {
      return res.status(400).json({
        message:
          "This room is already booked for these dates"
      });
    }

    const millisecondsPerDay =
      1000 * 60 * 60 * 24;

    const nights =
      Math.ceil(
        (endDate - startDate) /
        millisecondsPerDay
      );

    const totalPrice =
      room.price * nights;

    const bookingId =
      "LS-" +
      Date.now()
        .toString()
        .slice(-8);

    const booking =
      await Booking.create({
        bookingId,
        userId,
        roomId,
        checkIn: startDate,
        checkOut: endDate,
        guests: Number(guests),
        nights,
        totalPrice,
        additionalCharges: 0,
        amountPaid: 0,
        paymentMethod: "card",
        paymentStatus: "pending",
        status: "pending"
      });

    const populatedBooking =
      await Booking.findById(
        booking._id
      )
        .populate("roomId")
        .populate(
          "userId",
          "name email"
        );

    res.status(201).json({
      message:
        "Booking created. Payment required.",
      booking:
        populatedBooking
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


export const processPayment = async (
  req,
  res
) => {
  try {

    const {
      bookingId,
      cardNumber
    } = req.body;

    if (
      !bookingId ||
      !cardNumber
    ) {
      return res.status(400).json({
        message:
          "Booking ID and card number are required"
      });
    }

    const booking =
      await Booking.findOne({
        bookingId
      });

    if (!booking) {
      return res.status(404).json({
        message:
          "Booking not found"
      });
    }

    if (
      booking.paymentStatus ===
      "paid"
    ) {
      return res.status(400).json({
        message:
          "Payment has already been completed"
      });
    }

    if (
      booking.status ===
      "cancelled"
    ) {
      return res.status(400).json({
        message:
          "Cancelled booking cannot be paid"
      });
    }

    if (
      cardNumber ===
      "4000000000000002"
    ) {

      booking.paymentStatus =
        "failed";

      await booking.save();

      return res.status(400).json({
        message:
          "Mock payment declined"
      });

    }

    booking.paymentStatus =
      "paid";

    booking.amountPaid =
      booking.totalPrice;

    booking.paymentMethod =
      "card";

    booking.status =
      "confirmed";

    await booking.save();

    const populatedBooking =
      await Booking.findById(
        booking._id
      )
        .populate("roomId")
        .populate(
          "userId",
          "name email"
        );

    res.json({
      message:
        "Payment successful. Booking confirmed.",
      booking:
        populatedBooking
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


export const getUserBookings = async (
  req,
  res
) => {
  try {

    const {
      userId
    } = req.params;

    const bookings =
      await Booking.find({
        userId
      })
        .populate("roomId")
        .sort({
          createdAt: -1
        });

    res.json(bookings);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


export const getBookingById = async (
  req,
  res
) => {
  try {

    const booking =
      await Booking.findOne({
        bookingId:
          req.params.bookingId
      })
        .populate("roomId")
        .populate(
          "userId",
          "name email"
        );

    if (!booking) {
      return res.status(404).json({
        message:
          "Booking not found"
      });
    }

    res.json(booking);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


export const cancelBooking = async (
  req,
  res
) => {
  try {

    const {
      bookingId
    } = req.params;

    const {
      userId,
      password
    } = req.body;

    if (
      !userId ||
      !password
    ) {
      return res.status(400).json({
        message:
          "User ID and current password are required"
      });
    }

    const booking =
      await Booking.findOne({
        bookingId
      });

    if (!booking) {
      return res.status(404).json({
        message:
          "Booking not found"
      });
    }

    if (
      booking.userId.toString() !==
      userId.toString()
    ) {
      return res.status(403).json({
        message:
          "You are not allowed to cancel this reservation"
      });
    }

    if (
      booking.status ===
      "cancelled"
    ) {
      return res.status(400).json({
        message:
          "This reservation is already cancelled"
      });
    }

    if (
      booking.status ===
      "completed"
    ) {
      return res.status(400).json({
        message:
          "Completed reservations cannot be cancelled"
      });
    }

    if (
      booking.status ===
      "occupied"
    ) {
      return res.status(400).json({
        message:
          "Occupied reservations cannot be cancelled"
      });
    }

    const user =
      await User.findById(
        userId
      );

    if (!user) {
      return res.status(404).json({
        message:
          "User not found"
      });
    }

    const passwordMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!passwordMatch) {
      return res.status(400).json({
        message:
          "Current password is incorrect"
      });
    }

    booking.status =
      "cancelled";

    await booking.save();

    res.json({
      message:
        "Reservation cancelled successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


export const checkInBooking = async (
  req,
  res
) => {
  try {

    const {
      id
    } = req.params;

    const {
      name,
      email
    } = req.body;

    if (
      !name ||
      !email
    ) {
      return res.status(400).json({
        message:
          "Guest name and email are required"
      });
    }

    const booking =
      await Booking.findById(id)
        .populate(
          "userId",
          "name email"
        );

    if (!booking) {
      return res.status(404).json({
        message:
          "Reservation not found"
      });
    }

    if (!booking.userId) {
      return res.status(400).json({
        message:
          "Guest account could not be found"
      });
    }

    const enteredName =
      name
        .trim()
        .toLowerCase();

    const enteredEmail =
      email
        .trim()
        .toLowerCase();

    const actualName =
      booking.userId.name
        .trim()
        .toLowerCase();

    const actualEmail =
      booking.userId.email
        .trim()
        .toLowerCase();

    if (
      enteredName !==
        actualName ||
      enteredEmail !==
        actualEmail
    ) {
      return res.status(403).json({
        message:
          "Guest details do not match this reservation"
      });
    }

    if (
      booking.status !==
        "pending" &&
      booking.status !==
        "confirmed"
    ) {
      return res.status(400).json({
        message:
          "This reservation cannot be checked in"
      });
    }

    booking.status =
      "occupied";

    await booking.save();

    res.json({
      message:
        "Guest verified and checked in successfully",
      booking
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

export const checkoutBooking = async (
  req,
  res
) => {
  try {

    const { id } = req.params;

    const {
      additionalCharges,
      amountPaid,
      paymentMethod
    } = req.body;

    const booking =
      await Booking.findById(id)
        .populate(
          "userId",
          "name email"
        )
        .populate(
          "roomId",
          "roomNumber roomType price"
        );

    if (!booking) {
      return res.status(404).json({
        message: "Reservation not found"
      });
    }

    if (booking.status !== "occupied") {
      return res.status(400).json({
        message:
          "Only occupied reservations can be checked out"
      });
    }

    const roomCharges =
      Number(booking.totalPrice || 0);

    const extraCharges =
      Number(additionalCharges || 0);

    const newPayment =
      Number(amountPaid || 0);

    if (
      extraCharges < 0 ||
      newPayment < 0
    ) {
      return res.status(400).json({
        message:
          "Charges and payment cannot be negative"
      });
    }

    if (
      booking.paymentStatus !== "paid"
    ) {
      return res.status(400).json({
        message:
          "The original room payment has not been completed"
      });
    }

    if (newPayment > extraCharges) {
      return res.status(400).json({
        message:
          "Payment cannot be greater than additional charges"
      });
    }

    const remainingExtra =
      Math.max(
        extraCharges - newPayment,
        0
      );

    if (remainingExtra > 0) {
      return res.status(400).json({
        message:
          `Additional payment required: PKR ${remainingExtra.toLocaleString()}`
      });
    }

    const finalTotal =
      roomCharges + extraCharges;

    const finalAmountPaid =
      roomCharges + newPayment;

    const method =
      paymentMethod || "cash";

    booking.additionalCharges =
      extraCharges;

    booking.amountPaid =
      finalAmountPaid;

    booking.paymentMethod =
      method;

    booking.paymentStatus =
      "paid";

    booking.status =
      "completed";

    await booking.save();

    const invoiceNumber =
      "INV-" +
      Date.now()
        .toString()
        .slice(-10);

    const invoice =
      await CheckoutInvoice.create({
        invoiceNumber,

        bookingId:
          booking._id,

        bookingNumber:
          booking.bookingId,

        userId:
          booking.userId._id,

        guestName:
          booking.userId.name,

        guestEmail:
          booking.userId.email,

        roomId:
          booking.roomId._id,

        roomNumber:
          booking.roomId.roomNumber,

        roomType:
          booking.roomId.roomType,

        guests:
          booking.guests,

        checkIn:
          booking.checkIn,

        checkOut:
          booking.checkOut,

        nights:
          booking.nights,

        roomCharges,

        additionalCharges:
          extraCharges,

        totalAmount:
          finalTotal,

        amountPaid:
          finalAmountPaid,

        remainingAmount:
          0,

        paymentMethod:
          method,

        paymentStatus:
          "paid",

        checkoutDate:
          new Date()
      });

    res.json({
      message:
        "Checkout completed and invoice created successfully",

      invoice
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


export const getCheckoutInvoice =
  async (
    req,
    res
  ) => {

    try {

      const {
        invoiceNumber
      } = req.params;

      const invoice =
        await CheckoutInvoice.findOne({
          invoiceNumber
        })
          .populate(
            "bookingId"
          )
          .populate(
            "userId",
            "name email profilePic"
          );

      if (!invoice) {
        return res.status(404).json({
          message:
            "Invoice not found"
        });
      }

      res.json(invoice);

    } catch (error) {

      res.status(500).json({
        message:
          error.message
      });

    }

  };