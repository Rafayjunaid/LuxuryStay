import User from "../models/User.js";
import Room from "../models/Room.js";
import Booking from "../models/Booking.js";
import Feedback from "../models/Feedback.js";
import CheckoutInvoice from "../models/CheckoutInvoice.js";
import Complaint from "../models/Complaint.js";
import RoomMaintenance from "../models/RoomMaintenance.js";

export const getManagerDashboard = async (req, res) => {
  try {
    const [
      totalRooms,
      totalGuests,
      totalBookings,
      totalInvoices,
      pendingFeedback,
      pendingComplaints,
      roomsNeedingCleaning
    ] = await Promise.all([
      Room.countDocuments(),

      User.countDocuments({
        role: "guest"
      }),

      Booking.countDocuments(),

      CheckoutInvoice.countDocuments(),

      Feedback.countDocuments({
        status: "pending"
      }),

      Complaint.countDocuments({
        status: {
          $ne: "resolved"
        }
      }),

      RoomMaintenance.countDocuments({
        status: "needs_cleaning"
      })
    ]);

    const paymentSummary = await Booking.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$totalPrice"
          },
          totalPaid: {
            $sum: "$amountPaid"
          },
          additionalCharges: {
            $sum: "$additionalCharges"
          }
        }
      }
    ]);

    const summary =
      paymentSummary.length > 0
        ? paymentSummary[0]
        : {
            totalRevenue: 0,
            totalPaid: 0,
            additionalCharges: 0
          };

    res.json({
      totalRooms,
      totalGuests,
      totalBookings,
      totalInvoices,
      pendingFeedback,
      pendingComplaints,
      roomsNeedingCleaning,
      totalRevenue: summary.totalRevenue || 0,
      totalPaid: summary.totalPaid || 0,
      additionalCharges:
        summary.additionalCharges || 0
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const getManagerRooms = async (req, res) => {
  try {
    const rooms = await Room.find()
      .select(
        "roomNumber roomType price capacity amenities description photos"
      )
      .sort({
        roomNumber: 1
      });

    const maintenance =
      await RoomMaintenance.find();

    const bookings =
      await Booking.find({
        status: {
          $in: [
            "confirmed",
            "occupied"
          ]
        }
      })
        .populate(
          "userId",
          "name email profilePic"
        )
        .populate(
          "roomId",
          "roomNumber roomType"
        );

    const result = rooms.map((room) => {
      const roomMaintenance =
        maintenance.find(
          (item) =>
            item.roomId.toString() ===
            room._id.toString()
        );

      const activeBooking =
        bookings.find(
          (booking) =>
            booking.roomId &&
            booking.roomId._id.toString() ===
              room._id.toString()
        );

      return {
        ...room.toObject(),

        maintenance: roomMaintenance
          ? {
              status:
                roomMaintenance.status,
              lastCleanedAt:
                roomMaintenance.lastCleanedAt,
              nextCleaningDueAt:
                roomMaintenance.nextCleaningDueAt
            }
          : null,

        currentGuest:
          activeBooking && activeBooking.userId
            ? {
                _id:
                  activeBooking.userId._id,
                name:
                  activeBooking.userId.name,
                email:
                  activeBooking.userId.email,
                profilePic:
                  activeBooking.userId.profilePic
              }
            : null,

        activeBooking:
          activeBooking
            ? {
                _id: activeBooking._id,
                bookingId:
                  activeBooking.bookingId,
                checkIn:
                  activeBooking.checkIn,
                checkOut:
                  activeBooking.checkOut,
                guests:
                  activeBooking.guests,
                totalPrice:
                  activeBooking.totalPrice,
                amountPaid:
                  activeBooking.amountPaid,
                paymentStatus:
                  activeBooking.paymentStatus,
                status:
                  activeBooking.status
              }
            : null
      };
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const getManagerRoomDetails = async (
  req,
  res
) => {
  try {
    const room =
      await Room.findById(req.params.id);

    if (!room) {
      return res.status(404).json({
        message: "Room not found"
      });
    }

    const bookings =
      await Booking.find({
        roomId: room._id
      })
        .populate(
          "userId",
          "name email profilePic"
        )
        .populate(
          "roomId",
          "roomNumber roomType price capacity"
        )
        .sort({
          createdAt: -1
        });

    const invoices =
      await CheckoutInvoice.find({
        roomId: room._id
      })
        .sort({
          createdAt: -1
        });

    const complaints =
      await Complaint.find({
        roomId: room._id
      })
        .sort({
          createdAt: -1
        });

    const maintenance =
      await RoomMaintenance.findOne({
        roomId: room._id
      });

    const guestIds = [
      ...new Set(
        bookings
          .filter(
            (booking) =>
              booking.userId
          )
          .map(
            (booking) =>
              booking.userId._id.toString()
          )
      )
    ];

    const feedback =
      await Feedback.find({
        userId: {
          $in: guestIds
        }
      })
        .sort({
          createdAt: -1
        });

    res.json({
      room,

      bookings,

      invoices,

      complaints,

      maintenance,

      feedback
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const getManagerGuests = async (
  req,
  res
) => {
  try {
    const guests =
      await User.find({
        role: "guest"
      })
        .select(
          "name email profilePic role createdAt"
        )
        .sort({
          name: 1
        });

    res.json(guests);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const getManagerGuestDetails = async (
  req,
  res
) => {
  try {
    const guest =
      await User.findOne({
        _id: req.params.id,
        role: "guest"
      }).select(
        "name email profilePic role createdAt"
      );

    if (!guest) {
      return res.status(404).json({
        message: "Guest not found"
      });
    }

    const bookings =
      await Booking.find({
        userId: guest._id
      })
        .populate(
          "roomId",
          "roomNumber roomType price capacity amenities description photos"
        )
        .sort({
          createdAt: -1
        });

    const invoices =
      await CheckoutInvoice.find({
        userId: guest._id
      })
        .sort({
          createdAt: -1
        });

    const feedback =
      await Feedback.find({
        userId: guest._id
      })
        .sort({
          createdAt: -1
        });

    const roomIds = [
      ...new Set(
        bookings
          .filter(
            (booking) =>
              booking.roomId
          )
          .map(
            (booking) =>
              booking.roomId._id.toString()
          )
      )
    ];

    const complaints =
      roomIds.length > 0
        ? await Complaint.find({
            roomId: {
              $in: roomIds
            },
            guestName: guest.name
          }).sort({
            createdAt: -1
          })
        : [];

    res.json({
      guest,
      bookings,
      invoices,
      feedback,
      complaints
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const getManagerReservations = async (
  req,
  res
) => {
  try {
    const reservations =
      await Booking.find()
        .populate(
          "userId",
          "name email profilePic"
        )
        .populate(
          "roomId",
          "roomNumber roomType price"
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

export const getManagerPayments = async (
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

export const getManagerInvoices = async (
  req,
  res
) => {
  try {
    const invoices =
      await CheckoutInvoice.find()
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

export const getManagerFeedback = async (
  req,
  res
) => {
  try {
    const feedback =
      await Feedback.find()
        .populate(
          "userId",
          "name email profilePic"
        )
        .sort({
          createdAt: -1
        });

    res.json(feedback);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const getManagerComplaints = async (
  req,
  res
) => {
  try {
    const complaints =
      await Complaint.find()
        .populate(
          "roomId",
          "roomNumber roomType"
        )
        .sort({
          createdAt: -1
        });

    res.json(complaints);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};