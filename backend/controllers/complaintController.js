import Complaint from "../models/Complaint.js";
import Room from "../models/Room.js";

export const createComplaint = async (
  req,
  res
) => {
  try {

    const {
      roomId,
      guestName,
      complaint
    } = req.body;

    if (
      !roomId ||
      !guestName ||
      !complaint
    ) {
      return res.status(400).json({
        message:
          "Room, guest name and complaint are required"
      });
    }

    const room =
      await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({
        message:
          "Room not found"
      });
    }

    const newComplaint =
      await Complaint.create({
        roomId,
        roomNumber:
          room.roomNumber,
        guestName:
          guestName.trim(),
        complaint:
          complaint.trim(),
        status:
          "pending"
      });

    const populatedComplaint =
      await Complaint.findById(
        newComplaint._id
      ).populate(
        "roomId",
        "roomNumber roomType"
      );

    res.status(201).json({
      message:
        "Complaint submitted successfully",
      complaint:
        populatedComplaint
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message
    });

  }
};

export const getComplaints = async (
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

    res.json(
      complaints
    );

  } catch (error) {

    res.status(500).json({
      message:
        error.message
    });

  }
};

export const updateComplaintStatus =
  async (
    req,
    res
  ) => {

    try {

      const {
        id
      } = req.params;

      const {
        status
      } = req.body;

      const allowedStatuses = [
        "pending",
        "in_progress",
        "resolved"
      ];

      if (
        !allowedStatuses.includes(
          status
        )
      ) {
        return res.status(400).json({
          message:
            "Invalid complaint status"
        });
      }

     const complaint =
  await Complaint.findByIdAndUpdate(
    id,
    {
      status
    },
    {
      returnDocument: "after"
    }
  ).populate(
    "roomId",
    "roomNumber roomType"
  );

      if (!complaint) {
        return res.status(404).json({
          message:
            "Complaint not found"
        });
      }

      res.json({
        message:
          "Complaint status updated successfully",
        complaint
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message
      });

    }

  };