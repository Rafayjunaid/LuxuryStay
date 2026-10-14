import Room from "../models/Room.js";
import RoomMaintenance from "../models/RoomMaintenance.js";

const createMissingMaintenanceRecords =
  async () => {

    const rooms =
      await Room.find();

    for (const room of rooms) {

      const existing =
        await RoomMaintenance.findOne({
          roomId: room._id
        });

      if (!existing) {

        await RoomMaintenance.create({
          roomId: room._id,
          status: "needs_cleaning",
          lastCleanedAt: null,
          nextCleaningDueAt: null
        });

      }

    }
  };

export const getRoomMaintenance =
  async (req, res) => {

    try {

      await createMissingMaintenanceRecords();

      const maintenance =
        await RoomMaintenance.find()
          .populate(
            "roomId",
            "roomNumber roomType price capacity amenities description photos"
          );

      const result =
        maintenance
          .filter(
            (item) => item.roomId
          )
          .sort(
            (a, b) =>
              a.roomId.roomNumber.localeCompare(
                b.roomId.roomNumber,
                undefined,
                {
                  numeric: true
                }
              )
          )
          .map((item) => ({
            _id: item._id,
            roomId: item.roomId._id,
            roomNumber:
              item.roomId.roomNumber,
            roomType:
              item.roomId.roomType,
            price:
              item.roomId.price,
            capacity:
              item.roomId.capacity,
            amenities:
              item.roomId.amenities,
            description:
              item.roomId.description,
            photos:
              item.roomId.photos,
            status:
              item.status,
            lastCleanedAt:
              item.lastCleanedAt,
            nextCleaningDueAt:
              item.nextCleaningDueAt
          }));

      res.json(result);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }
  };

export const markRoomCleaned =
  async (req, res) => {

    try {

      const {
        roomId
      } = req.params;

      const room =
        await Room.findById(
          roomId
        );

      if (!room) {

        return res.status(404).json({
          message:
            "Room not found"
        });

      }

      const now =
        new Date();

      const nextCleaning =
        new Date(
          now.getTime() +
          5000
        );

      const maintenance =
        await RoomMaintenance.findOneAndUpdate(
          {
            roomId
          },
          {
            roomId,
            status: "cleaned",
            lastCleanedAt: now,
            nextCleaningDueAt:
              nextCleaning
          },
          {
            upsert: true,
            returnDocument: "after"
          }
        );

      res.json({
        message:
          "Room marked as cleaned",
        maintenance
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message
      });

    }
  };