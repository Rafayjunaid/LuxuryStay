import Room from "../models/Room.js";
import RoomMaintenance from "../models/RoomMaintenance.js";

const runRoomMaintenanceCheck =
  async () => {

    try {

      const rooms =
        await Room.find();

      const now =
        new Date();

      for (const room of rooms) {

        let maintenance =
          await RoomMaintenance.findOne({
            roomId: room._id
          });

        if (!maintenance) {

          await RoomMaintenance.create({
            roomId: room._id,
            status: "needs_cleaning",
            lastCleanedAt: null,
            nextCleaningDueAt: null
          });

          continue;
        }

        if (
          maintenance.status === "cleaned" &&
          maintenance.nextCleaningDueAt &&
          maintenance.nextCleaningDueAt <= now
        ) {

          maintenance.status =
            "needs_cleaning";

          maintenance.nextCleaningDueAt =
            null;

          await maintenance.save();

        }

      }

    } catch (error) {

      console.log(
        "Room maintenance scheduler error:",
        error.message
      );

    }
  };

const startRoomMaintenanceScheduler =
  () => {

    runRoomMaintenanceCheck();

    setInterval(
      runRoomMaintenanceCheck,
      60 * 1000
    );

    console.log(
      "Room maintenance scheduler started"
    );
  };

export default startRoomMaintenanceScheduler;