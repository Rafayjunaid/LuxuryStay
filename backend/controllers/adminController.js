import User from "../models/User.js";
import Room from "../models/Room.js";
import Booking from "../models/Booking.js";
import CheckoutInvoice from "../models/CheckoutInvoice.js";

const allowedRoles = [
  "guest",
  "receptionist",
  "admin",
  "manager",
  "housekeeping"
];

export const getAdminDashboard = async (req, res) => {
  try {
    const [users, rooms, reservations] = await Promise.all([
      User.countDocuments(),
      Room.countDocuments(),
      Booking.countDocuments()
    ]);

    const revenueResult = await Booking.aggregate([
      {
        $group: {
          _id: null,
          revenue: {
            $sum: "$totalPrice"
          }
        }
      }
    ]);

    const revenue =
      revenueResult[0]?.revenue || 0;

    res.json({
      users,
      rooms,
      reservations,
      revenue
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


export const getAdminUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select(
        "name email profilePic role isBlocked createdAt"
      )
      .sort({
        createdAt: -1
      });

    res.json(users);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    if (!allowedRoles.includes(role)) {
      return res.status(400).json({
        message: "Invalid role"
      });
    }

    const user =
      await User.findByIdAndUpdate(
        req.params.id,
        {
          role
        },
        {
          new: true,
          runValidators: true
        }
      ).select(
        "name email profilePic role isBlocked createdAt"
      );

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json({
      message: "User role updated successfully",
      user
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


export const toggleUserBlock = async (req, res) => {
  try {
    const user =
      await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    user.isBlocked = !user.isBlocked;

    await user.save();

    const updatedUser =
      await User.findById(user._id)
        .select(
          "name email profilePic role isBlocked createdAt"
        );

    res.json({
      message: user.isBlocked
        ? "User blocked successfully"
        : "User unblocked successfully",

      user: updatedUser
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


export const getAdminReservations = async (
  req,
  res
) => {
  try {
    const reservations =
      await Booking.find()
        .populate(
          "userId",
          "name email profilePic role"
        )
        .populate(
          "roomId",
          "roomNumber roomType price capacity"
        )
        .sort({
          createdAt: -1
        });

    res.json(reservations);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


export const getAdminPayments = async (
  req,
  res
) => {
  try {
    const payments =
      await Booking.find()
        .populate(
          "userId",
          "name email"
        )
        .populate(
          "roomId",
          "roomNumber roomType"
        )
        .select(
          "bookingId userId roomId totalPrice additionalCharges amountPaid paymentMethod paymentStatus refundStatus status createdAt"
        )
        .sort({
          createdAt: -1
        });

    res.json(payments);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


export const getAdminInvoices = async (
  req,
  res
) => {
  try {
    const invoices =
      await CheckoutInvoice.find()
        .populate(
          "bookingId",
          "bookingId status"
        )
        .sort({
          createdAt: -1
        });

    res.json(invoices);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};