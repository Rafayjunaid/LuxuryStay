import User from "../models/User.js";
import Booking from "../models/Booking.js";
import Feedback from "../models/Feedback.js";
import CheckoutInvoice from "../models/CheckoutInvoice.js";

export const getReceptionistGuests = async (req, res) => {
  try {
    const guests = await User.find({
      role: "guest"
    })
      .select(
        "name email profilePic createdAt"
      )
      .sort({
        createdAt: -1
      });

    const guestData = await Promise.all(
      guests.map(async (guest) => {

        const bookings =
          await Booking.find({
            userId: guest._id
          })
            .populate(
              "roomId",
              "roomNumber roomType price"
            )
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

        const activeFeedback =
          feedback.filter(
            (item) =>
              item.status === "active"
          );

        let averageRating = 0;

        if (activeFeedback.length > 0) {

          const totalRating =
            activeFeedback.reduce(
              (sum, item) =>
                sum + Number(item.rating),
              0
            );

          averageRating =
            totalRating /
            activeFeedback.length;

        }

        let satisfaction =
          "No Feedback";

        if (activeFeedback.length > 0) {

          if (averageRating >= 4.5) {
            satisfaction =
              "Very Satisfied";
          } else if (
            averageRating >= 3.5
          ) {
            satisfaction =
              "Satisfied";
          } else if (
            averageRating >= 2.5
          ) {
            satisfaction =
              "Neutral";
          } else if (
            averageRating >= 1.5
          ) {
            satisfaction =
              "Dissatisfied";
          } else {
            satisfaction =
              "Very Dissatisfied";
          }

        }

        return {
          _id: guest._id,
          name: guest.name,
          email: guest.email,
          profilePic: guest.profilePic,
          createdAt: guest.createdAt,

          reservations:
            bookings.length,

          feedbackCount:
            activeFeedback.length,

          averageRating:
            Number(
              averageRating.toFixed(1)
            ),

          satisfaction,

          bookings,

          feedback: activeFeedback
        };

      })
    );

    res.json(guestData);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};
export const getReceptionistReservations = async (
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

    const reservationIds =
      reservations.map(
        (reservation) =>
          reservation._id
      );

    const invoices =
      await CheckoutInvoice.find({
        bookingId: {
          $in: reservationIds
        }
      }).select(
        "bookingId invoiceNumber"
      );

    const invoiceMap =
      new Map(
        invoices.map(
          (invoice) => [
            invoice.bookingId.toString(),
            invoice.invoiceNumber
          ]
        )
      );

    const data =
      reservations.map(
        (reservation) => ({

          _id:
            reservation._id,

          bookingId:
            reservation.bookingId,

          user:
            reservation.userId
              ? {
                  _id:
                    reservation.userId._id,

                  name:
                    reservation.userId.name,

                  email:
                    reservation.userId.email,

                  profilePic:
                    reservation.userId.profilePic
                }
              : null,

          room:
            reservation.roomId
              ? {
                  _id:
                    reservation.roomId._id,

                  roomNumber:
                    reservation.roomId.roomNumber,

                  roomType:
                    reservation.roomId.roomType,

                  price:
                    reservation.roomId.price
                }
              : null,

          checkIn:
            reservation.checkIn,

          checkOut:
            reservation.checkOut,

          guests:
            reservation.guests,

          nights:
            reservation.nights,

          totalPrice:
            reservation.totalPrice,

          amountPaid:
            reservation.amountPaid,

          additionalCharges:
            reservation.additionalCharges,

          paymentMethod:
            reservation.paymentMethod,

          paymentStatus:
            reservation.paymentStatus,

          refundStatus:
            reservation.refundStatus,

          status:
            reservation.status,

          invoiceNumber:
            invoiceMap.get(
              reservation._id.toString()
            ) || null,

          createdAt:
            reservation.createdAt

        })
      );

    res.json(data);

  } catch (error) {

    res.status(500).json({
      message:
        error.message
    });

  }
};
export const verifyAndOccupyReservation = async (
  req,
  res
) => {
  try {

    const { id } = req.params;

    const {
      name,
      email
    } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        message:
          "Guest name and email are required"
      });
    }

    const reservation =
      await Booking.findById(id)
        .populate(
          "userId",
          "name email"
        );

    if (!reservation) {
      return res.status(404).json({
        message:
          "Reservation not found"
      });
    }

    if (!reservation.userId) {
      return res.status(400).json({
        message:
          "Guest account could not be found"
      });
    }

    const enteredName =
      name.trim().toLowerCase();

    const enteredEmail =
      email.trim().toLowerCase();

    const actualName =
      reservation.userId.name
        .trim()
        .toLowerCase();

    const actualEmail =
      reservation.userId.email
        .trim()
        .toLowerCase();

    if (
      enteredName !== actualName ||
      enteredEmail !== actualEmail
    ) {
      return res.status(403).json({
        message:
          "Guest details do not match this reservation"
      });
    }

    if (
      reservation.status !== "pending" &&
      reservation.status !== "confirmed"
    ) {
      return res.status(400).json({
        message:
          `Reservation cannot be occupied because its current status is ${reservation.status}`
      });
    }

    reservation.status = "occupied";

    await reservation.save();

    res.json({
      message:
        "Guest verified and reservation marked as occupied",
      reservation
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};