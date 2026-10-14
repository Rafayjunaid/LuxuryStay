import {
  useEffect,
  useState
} from "react";

import Sidebar from "./Sidebar";

function RoomMaintenance() {

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [updatingRoom, setUpdatingRoom] = useState("");

  const loadRooms = async () => {

    try {

      const response = await fetch(
        `http://localhost:5000/api/room-maintenance?t=${Date.now()}`,
        {
          method: "GET",
          cache: "no-store",
          headers: {
            "Cache-Control": "no-cache",
            "Pragma": "no-cache"
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {

        setMessage(
          data.message ||
          "Unable to load rooms."
        );

        setMessageType("error");
        return;
      }

      setRooms(
        Array.isArray(data)
          ? data
          : []
      );

    } catch (error) {

      console.log(error);

      setMessage(
        "Unable to connect to the server."
      );

      setMessageType("error");

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {

    loadRooms();

    const interval = setInterval(
      loadRooms,
      1000
    );

    return () => {
      clearInterval(interval);
    };

  }, []);

  const markCleaned = async (roomId) => {

    setUpdatingRoom(roomId);

    try {

      const response = await fetch(
        `http://localhost:5000/api/room-maintenance/${roomId}/clean?t=${Date.now()}`,
        {
          method: "PUT",
          cache: "no-store",
          headers: {
            "Cache-Control": "no-cache"
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {

        setMessage(
          data.message ||
          "Unable to update room."
        );

        setMessageType("error");
        return;
      }

      if (data.maintenance) {

        setRooms((currentRooms) =>
          currentRooms.map((room) =>
            room.roomId === roomId
              ? {
                  ...room,
                  status:
                    data.maintenance.status,
                  lastCleanedAt:
                    data.maintenance.lastCleanedAt,
                  nextCleaningDueAt:
                    data.maintenance.nextCleaningDueAt
                }
              : room
          )
        );

      }

      setMessage(
        "Room cleaned. 5-second demo cycle started."
      );

      setMessageType("success");

    } catch (error) {

      console.log(error);

      setMessage(
        "Unable to update room."
      );

      setMessageType("error");

    } finally {

      setUpdatingRoom("");

    }
  };

  const formatDate = (date) => {

    if (!date) {
      return "Not cleaned yet";
    }

    return new Date(date).toLocaleString();
  };

  const getStatusStyle = (status) => {

    if (status === "cleaned") {
      return "bg-green-50 text-green-700 border-green-200";
    }

    return "bg-red-50 text-red-700 border-red-200";
  };

  const getStatusLabel = (status) => {

    if (status === "cleaned") {
      return "Cleaned";
    }

    return "Needs Cleaning";
  };

  const needsCleaning =
    rooms.filter(
      (room) =>
        room.status === "needs_cleaning"
    ).length;

  const cleaned =
    rooms.filter(
      (room) =>
        room.status === "cleaned"
    ).length;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#f5f5f3]">

      <Sidebar />

      <main className="flex-1 min-w-0">

        <div className="px-5 py-6 md:px-8 md:py-8">

          <div className="mb-7">

            <p className="text-xs uppercase tracking-[0.18em] text-gray-400 mb-2">
              Housekeeping
            </p>

            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
              Room Maintenance
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Monitor room cleaning status and complete maintenance cycles
            </p>

          </div>

          {message && (

            <div
              className={`mb-5 px-4 py-3 border text-sm ${
                messageType === "error"
                  ? "border-red-200 bg-red-50 text-red-700"
                  : "border-green-200 bg-green-50 text-green-700"
              }`}
            >
              {message}
            </div>

          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">

            <div className="bg-white border border-red-200 px-5 py-5">

              <p className="text-[10px] uppercase tracking-[0.14em] text-red-600">
                Needs Cleaning
              </p>

              <p className="text-2xl font-semibold text-gray-900 mt-2">
                {needsCleaning}
              </p>

              <p className="text-xs text-gray-400 mt-1">
                Rooms waiting for housekeeping
              </p>

            </div>

            <div className="bg-white border border-green-200 px-5 py-5">

              <p className="text-[10px] uppercase tracking-[0.14em] text-green-600">
                Cleaned
              </p>

              <p className="text-2xl font-semibold text-gray-900 mt-2">
                {cleaned}
              </p>

              <p className="text-xs text-gray-400 mt-1">
                Rooms currently within cleaning cycle
              </p>

            </div>

          </div>

          <div className="bg-white border border-gray-200">

            <div className="px-5 py-5 border-b border-gray-200">

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

                <div>

                  <p className="text-[10px] uppercase tracking-[0.16em] text-gray-400">
                    Housekeeping Operations
                  </p>

                  <h2 className="text-lg font-semibold text-gray-900 mt-1">
                    Room Cleaning
                  </h2>

                </div>

                <span className="text-xs text-gray-400">
                  {rooms.length}{" "}
                  {rooms.length === 1
                    ? "Room"
                    : "Rooms"}
                </span>

              </div>

            </div>

            {loading ? (

              <div className="px-5 py-12 text-center">
                <p className="text-sm text-gray-500">
                  Loading rooms...
                </p>
              </div>

            ) : rooms.length === 0 ? (

              <div className="px-5 py-12 text-center">

                <p className="text-sm font-medium text-gray-700">
                  No rooms found
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  Add rooms to your hotel database first.
                </p>

              </div>

            ) : (

              <div className="divide-y divide-gray-100">

                {rooms.map((room) => (

                  <div
                    key={room.roomId}
                    className="px-5 py-5 hover:bg-gray-50/60 transition"
                  >

                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                      <div className="min-w-0">

                        <div className="flex flex-wrap items-center gap-3">

                          <h3 className="text-base font-semibold text-gray-900">
                            Room {room.roomNumber}
                          </h3>

                          <span className="text-sm text-gray-500">
                            {room.roomType}
                          </span>

                          <span
                            className={`inline-flex px-2.5 py-1 border text-[11px] font-medium ${getStatusStyle(
                              room.status
                            )}`}
                          >
                            {getStatusLabel(
                              room.status
                            )}
                          </span>

                        </div>

                        <div className="flex flex-wrap gap-x-5 gap-y-2 mt-3">

                          <p className="text-xs text-gray-500">
                            Capacity:{" "}
                            <span className="text-gray-700">
                              {room.capacity}
                            </span>
                          </p>

                          <p className="text-xs text-gray-500">
                            Price:{" "}
                            <span className="text-gray-700">
                              PKR{" "}
                              {Number(
                                room.price
                              ).toLocaleString()}
                            </span>
                          </p>

                        </div>

                        <div className="flex flex-wrap gap-2 mt-3">

                          {room.amenities
                            ?.slice(0, 5)
                            .map(
                              (
                                amenity,
                                index
                              ) => (

                                <span
                                  key={index}
                                  className="px-2 py-1 bg-gray-50 border border-gray-200 text-[11px] text-gray-500"
                                >
                                  {amenity}
                                </span>

                              )
                            )}

                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">

                          <div>

                            <p className="text-[10px] uppercase tracking-[0.12em] text-gray-400">
                              Last Cleaned
                            </p>

                            <p className="text-xs text-gray-700 mt-1">
                              {formatDate(
                                room.lastCleanedAt
                              )}
                            </p>

                          </div>

                          <div>

                            <p className="text-[10px] uppercase tracking-[0.12em] text-gray-400">
                              Next Cleaning
                            </p>

                            <p className="text-xs text-gray-700 mt-1">
                              {room.nextCleaningDueAt
                                ? formatDate(
                                    room.nextCleaningDueAt
                                  )
                                : "Waiting for cleaning"}
                            </p>

                          </div>

                        </div>

                      </div>

                      <div className="shrink-0">

                        {room.status ===
                        "needs_cleaning" ? (

                          <button
                            type="button"
                            onClick={() =>
                              markCleaned(
                                room.roomId
                              )
                            }
                            disabled={
                              updatingRoom ===
                              room.roomId
                            }
                            className="w-full lg:w-auto h-10 px-5 bg-[#8f1d2c] text-white text-sm font-medium hover:bg-[#751722] transition disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {updatingRoom ===
                            room.roomId
                              ? "Updating..."
                              : "Mark as Cleaned"}
                          </button>

                        ) : (

                          <div className="px-4 py-2.5 border border-green-200 bg-green-50 text-green-700 text-xs font-medium">
                            Cleaning cycle active
                          </div>

                        )}

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </div>

        </div>

      </main>

    </div>
  );
}

export default RoomMaintenance;
