import Room from "../models/Room.js";
import Booking from "../models/Booking.js";

export const getRooms = async (req, res) => {
  try {
    const {
      checkIn,
      checkOut,
      guests,
      type
    } = req.query;

    const filter = {};

    if (type && type !== "all") {
      filter.roomType = type;
    }

    if (guests) {
      filter.capacity = {
        $gte: Number(guests)
      };
    }

    const rooms = await Room.find(filter).sort({
      price: 1
    });

    if (!checkIn || !checkOut) {
      return res.json(
        rooms.map((room) => ({
          ...room.toObject(),
          available: true
        }))
      );
    }

    const startDate = new Date(checkIn);
    const endDate = new Date(checkOut);

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

    const bookings = await Booking.find({
      status: {
        $ne: "cancelled"
      },
      checkIn: {
        $lt: endDate
      },
      checkOut: {
        $gt: startDate
      }
    });

    const bookedRoomIds = bookings.map(
      (booking) => booking.roomId.toString()
    );

    const availableRooms = rooms.map((room) => ({
      ...room.toObject(),
      available:
        !bookedRoomIds.includes(
          room._id.toString()
        )
    }));

    res.json(availableRooms);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


export const getRoomTypes = async (req, res) => {
  try {
    const types = await Room.distinct(
      "roomType"
    );

    res.json(types);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


export const createRoom = async (req, res) => {
  try {
    const {
      roomNumber,
      roomType,
      price,
      capacity,
      amenities,
      description,
      photos,
      status
    } = req.body;

    const existingRoom =
      await Room.findOne({ roomNumber });

    if (existingRoom) {
      return res.status(400).json({
        message: "Room number already exists"
      });
    }

    const room = await Room.create({
      roomNumber,
      roomType,
      price,
      capacity,
      amenities,
      description,
      photos,
      status
    });

    res.status(201).json({
      message: "Room created successfully",
      room
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


export const getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(
      req.params.id
    );

    if (!room) {
      return res.status(404).json({
        message: "Room not found"
      });
    }

    res.json(room);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


export const getReceptionistRooms = async (req, res) => {
  try {
    const rooms = await Room.find().sort({
      roomNumber: 1
    });

    const now = new Date();

    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );

    const startOfTomorrow = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1
    );

    const bookings = await Booking.find({
      status: {
        $in: [
          "pending",
          "confirmed"
        ]
      },
      checkIn: {
        $lt: startOfTomorrow
      },
      checkOut: {
        $gt: startOfToday
      }
    }).populate(
      "userId",
      "name email profilePic"
    );

    const roomData = rooms.map((room) => {

      const booking = bookings.find(
        (item) =>
          item.roomId?.toString() ===
          room._id.toString()
      );

      if (booking) {

        return {
          ...room.toObject(),

          status:
            booking.status === "occupied"
              ? "occupied"
              : "reserved",

          guest: {
            id:
              booking.userId?._id ||
              null,

            name:
              booking.userId?.name ||
              "Unknown Guest",

            email:
              booking.userId?.email ||
              ""
          },

          bookingId:
            booking._id,

          checkIn:
            booking.checkIn,

          checkOut:
            booking.checkOut
        };

      }

      return {
        ...room.toObject(),

        status: "available",

        guest: null,

        bookingId: null,

        checkIn: null,

        checkOut: null
      };
    });

    res.json(roomData);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


/* =====================================================
   ADMIN - UPDATE ROOM
===================================================== */

export const updateRoom = async (req, res) => {
  try {
    const {
      roomNumber,
      roomType,
      price,
      capacity,
      amenities,
      description,
      photos,
      status
    } = req.body;

    const room = await Room.findById(
      req.params.id
    );

    if (!room) {
      return res.status(404).json({
        message: "Room not found"
      });
    }

    /*
      Check whether another room already
      uses this room number.
    */

    if (
      roomNumber &&
      roomNumber !== room.roomNumber
    ) {
      const existingRoom =
        await Room.findOne({
          roomNumber,
          _id: {
            $ne: req.params.id
          }
        });

      if (existingRoom) {
        return res.status(400).json({
          message:
            "Room number already exists"
        });
      }

      room.roomNumber = roomNumber;
    }

    if (roomType !== undefined) {
      room.roomType = roomType;
    }

    if (price !== undefined) {
      room.price = Number(price);
    }

    if (capacity !== undefined) {
      room.capacity = Number(capacity);
    }

    if (amenities !== undefined) {
      room.amenities = Array.isArray(
        amenities
      )
        ? amenities
        : String(amenities)
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean);
    }

    if (description !== undefined) {
      room.description = description;
    }

    if (photos !== undefined) {
      room.photos = Array.isArray(
        photos
      )
        ? photos
        : String(photos)
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean);
    }

    if (status !== undefined) {
      room.status = status;
    }

    await room.save();

    res.json({
      message:
        "Room updated successfully",
      room
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


/* =====================================================
   ADMIN - DELETE ROOM
===================================================== */

export const deleteRoom = async (req, res) => {
  try {

    const room = await Room.findById(
      req.params.id
    );

    if (!room) {
      return res.status(404).json({
        message: "Room not found"
      });
    }

    /*
      Don't allow deleting a room that
      is connected to an active booking.
    */

    const activeBooking =
      await Booking.findOne({
        roomId: room._id,

        status: {
          $ne: "cancelled"
        }
      });

    if (activeBooking) {
      return res.status(400).json({
        message:
          "This room cannot be deleted because it has a booking. Cancel the booking first."
      });
    }

    await Room.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
        "Room deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};