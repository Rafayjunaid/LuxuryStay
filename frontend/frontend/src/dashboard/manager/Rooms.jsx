import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

function Rooms() {
  const navigate = useNavigate();

  const [rooms, setRooms] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const loadRooms = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/manager/rooms?t=${Date.now()}`,
        {
          cache: "no-store"
        }
      );

      const data = await response.json();

      if (response.ok) {
        setRooms(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRooms();
  }, []);

  const filteredRooms = rooms.filter((room) => {
    const value = search.toLowerCase();

    return (
      String(room.roomNumber || "")
        .toLowerCase()
        .includes(value) ||
      String(room.roomType || "")
        .toLowerCase()
        .includes(value)
    );
  });

  const getStatus = (room) => {
    if (room.maintenanceStatus === "needs_cleaning") {
      return {
        label: "Needs Cleaning",
        className:
          "bg-red-50 text-red-700 border-red-200"
      };
    }

    if (room.currentBooking) {
      return {
        label: "Occupied",
        className:
          "bg-yellow-50 text-yellow-700 border-yellow-200"
      };
    }

    return {
      label: "Available",
      className:
        "bg-green-50 text-green-700 border-green-200"
    };
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#f5f5f3]">
      <Sidebar />

      <main className="flex-1 min-w-0">
        <div className="px-5 py-6 md:px-8 md:py-8">
          <div className="mb-6">
            <p className="text-xs uppercase tracking-[0.18em] text-gray-400 mb-2">
              Hotel Monitoring
            </p>

            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
              Rooms
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              View room information, occupancy and guest details
            </p>
          </div>

          <div className="bg-white border border-gray-200 mb-5">
            <div className="px-5 py-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.14em] text-gray-400">
                  Room Directory
                </p>

                <p className="text-sm text-gray-700 mt-1">
                  {rooms.length} rooms registered
                </p>
              </div>

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search room..."
                className="w-full sm:w-64 h-10 px-3 border border-gray-200 bg-white text-sm text-gray-700 outline-none focus:border-[#8f1d2c]"
              />
            </div>
          </div>

          {loading ? (
            <div className="bg-white border border-gray-200 px-5 py-12 text-center">
              <p className="text-sm text-gray-500">
                Loading rooms...
              </p>
            </div>
          ) : filteredRooms.length === 0 ? (
            <div className="bg-white border border-gray-200 px-5 py-12 text-center">
              <p className="text-sm font-medium text-gray-700">
                No rooms found
              </p>

              <p className="text-xs text-gray-400 mt-1">
                Try another room number or room type.
              </p>
            </div>
          ) : (
            <div className="bg-white border border-gray-200 overflow-hidden">
              <div className="hidden lg:grid grid-cols-[1fr_1.2fr_1fr_1fr_1fr_auto] gap-4 px-5 py-3 bg-gray-50 border-b border-gray-200 text-[10px] uppercase tracking-[0.12em] text-gray-400">
                <span>Room</span>
                <span>Type</span>
                <span>Guest</span>
                <span>Price</span>
                <span>Status</span>
                <span></span>
              </div>

              <div className="divide-y divide-gray-100">
                {filteredRooms.map((room) => {
                  const status = getStatus(room);

                  return (
                    <div
                      key={room._id}
                      className="px-5 py-5 hover:bg-gray-50/60 transition"
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr_1fr_1fr_1fr_auto] gap-4 lg:items-center">
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            Room {room.roomNumber}
                          </p>

                          <p className="text-xs text-gray-400 mt-1">
                            Capacity: {room.capacity}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-gray-700">
                            {room.roomType}
                          </p>

                          <p className="text-xs text-gray-400 mt-1">
                            {room.amenities?.length || 0} amenities
                          </p>
                        </div>

                        <div>
                          {room.currentBooking?.user ? (
                            <>
                              <p className="text-sm text-gray-800">
                                {room.currentBooking.user.name}
                              </p>

                              <p className="text-xs text-gray-400 mt-1">
                                Current guest
                              </p>
                            </>
                          ) : (
                            <p className="text-sm text-gray-400">
                              No current guest
                            </p>
                          )}
                        </div>

                        <div>
                          <p className="text-sm font-medium text-gray-800">
                            PKR{" "}
                            {Number(
                              room.price || 0
                            ).toLocaleString()}
                          </p>

                          <p className="text-xs text-gray-400 mt-1">
                            Per room rate
                          </p>
                        </div>

                        <div>
                          <span
                            className={`inline-flex px-2.5 py-1 border text-[11px] font-medium ${status.className}`}
                          >
                            {status.label}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            navigate(
                              `/dashboard/manager/rooms/${room._id}`
                            )
                          }
                          className="h-9 px-4 border border-gray-200 text-xs font-medium text-gray-700 hover:border-[#8f1d2c] hover:text-[#8f1d2c] transition cursor-pointer"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Rooms;