import {
  useEffect,
  useState
} from "react";

import Sidebar from "./Sidebar";

function AvailableRooms() {

  const [rooms, setRooms] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("all");

  const [loading, setLoading] =
    useState(true);


  const loadRooms = async () => {

    try {

      const response = await fetch(
        "http://localhost:5000/api/rooms/receptionist/availability"
      );

      const data =
        await response.json();

      if (Array.isArray(data)) {
        setRooms(data);
      }

    } catch (error) {

      console.log(error);

    }

    setLoading(false);

  };


  useEffect(() => {

    loadRooms();

    const interval =
      setInterval(
        loadRooms,
        10000
      );

    return () =>
      clearInterval(interval);

  }, []);


  const filteredRooms =
    rooms.filter((room) => {

      const searchValue =
        search.toLowerCase();

      const matchesSearch =
        room.roomNumber
          ?.toString()
          .toLowerCase()
          .includes(searchValue) ||

        room.roomType
          ?.toLowerCase()
          .includes(searchValue) ||

        room.guest?.name
          ?.toLowerCase()
          .includes(searchValue);

      const matchesStatus =
        statusFilter === "all" ||
        room.status === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );

    });


  const availableCount =
    rooms.filter(
      (room) =>
        room.status === "available"
    ).length;


  const reservedCount =
    rooms.filter(
      (room) =>
        room.status === "reserved"
    ).length;


  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#f5f5f3]">

      <Sidebar />


      <main className="flex-1 min-w-0">

        <div className="px-5 py-6 md:px-8 md:py-8">

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-7">

            <div>

              <p className="text-xs uppercase tracking-[0.18em] text-gray-400 mb-2">
                Reception
              </p>

              <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
                Room Availability
              </h1>

              <p className="text-sm text-gray-500 mt-1">
                Current room occupancy and guest reservations
              </p>

            </div>


            <div className="flex items-center gap-5 text-sm">

              <div className="flex items-center gap-2">

                <span className="w-2.5 h-2.5 rounded-full bg-green-500" />

                <span className="text-gray-600">
                  {availableCount} Available
                </span>

              </div>


              <div className="flex items-center gap-2">

                <span className="w-2.5 h-2.5 rounded-full bg-[#8f1d2c]" />

                <span className="text-gray-600">
                  {reservedCount} Reserved
                </span>

              </div>

            </div>

          </div>


          <div className="border border-gray-200 bg-white">

            <div className="px-4 py-3 border-b border-gray-200 flex flex-col md:flex-row gap-3">

              <div className="relative flex-1">

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                >
                  <circle
                    cx="11"
                    cy="11"
                    r="7"
                  />

                  <path d="m20 20-4-4" />
                </svg>


                <input
                  type="text"
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search room, type or guest"
                  className="w-full h-10 pl-10 pr-3 border border-gray-200 bg-gray-50 text-sm text-gray-700 outline-none focus:border-[#8f1d2c] focus:bg-white"
                />

              </div>


              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(
                    e.target.value
                  )
                }
                className="h-10 px-3 border border-gray-200 bg-gray-50 text-sm text-gray-700 outline-none focus:border-[#8f1d2c]"
              >

                <option value="all">
                  All Rooms
                </option>

                <option value="available">
                  Available
                </option>

                <option value="reserved">
                  Reserved
                </option>

              </select>

            </div>


            {loading ? (

              <div className="px-5 py-12 text-center text-sm text-gray-500">
                Loading rooms...
              </div>

            ) : filteredRooms.length === 0 ? (

              <div className="px-5 py-12 text-center">

                <p className="text-sm font-medium text-gray-700">
                  No rooms found
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  Try changing your search or status filter.
                </p>

              </div>

            ) : (

              <div>

                <div className="hidden lg:grid grid-cols-[100px_150px_110px_1fr_150px_150px] gap-4 px-5 py-3 bg-gray-50 border-b border-gray-200 text-[11px] uppercase tracking-wider text-gray-400 font-semibold">

                  <span>
                    Room
                  </span>

                  <span>
                    Type
                  </span>

                  <span>
                    Status
                  </span>

                  <span>
                    Guest
                  </span>

                  <span>
                    Check In
                  </span>

                  <span>
                    Check Out
                  </span>

                </div>


                <div>

                  {filteredRooms.map((room) => (

                    <div
                      key={room._id}
                      className="grid grid-cols-1 lg:grid-cols-[100px_150px_110px_1fr_150px_150px] gap-3 lg:gap-4 px-5 py-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50/70 transition"
                    >

                      <div>

                        <p className="lg:hidden text-[10px] uppercase tracking-wider text-gray-400 mb-1">
                          Room
                        </p>

                        <p className="text-base font-semibold text-gray-900">
                          {room.roomNumber}
                        </p>

                      </div>


                      <div>

                        <p className="lg:hidden text-[10px] uppercase tracking-wider text-gray-400 mb-1">
                          Type
                        </p>

                        <p className="text-sm text-gray-700">
                          {room.roomType}
                        </p>

                        <p className="text-xs text-gray-400 mt-0.5">
                          ${room.price} / night
                        </p>

                      </div>


                      <div>

                        <p className="lg:hidden text-[10px] uppercase tracking-wider text-gray-400 mb-1">
                          Status
                        </p>

                        <span
                          className={`inline-flex items-center gap-1.5 text-xs font-medium ${
                            room.status === "available"
                              ? "text-green-700"
                              : "text-[#8f1d2c]"
                          }`}
                        >

                          <span
                            className={`w-2 h-2 rounded-full ${
                              room.status === "available"
                                ? "bg-green-500"
                                : "bg-[#8f1d2c]"
                            }`}
                          />

                          {room.status === "available"
                            ? "Available"
                            : "Reserved"}

                        </span>

                      </div>


                      <div>

                        <p className="lg:hidden text-[10px] uppercase tracking-wider text-gray-400 mb-1">
                          Guest
                        </p>

                        {room.status === "reserved" ? (

                          <div>

                            <p className="text-sm font-medium text-gray-800">
                              {room.guest?.name || "Unknown Guest"}
                            </p>

                            <p className="text-xs text-gray-400 mt-0.5 truncate">
                              {room.guest?.email || "No email available"}
                            </p>

                          </div>

                        ) : (

                          <p className="text-sm text-gray-400">
                            —
                          </p>

                        )}

                      </div>


                      <div>

                        <p className="lg:hidden text-[10px] uppercase tracking-wider text-gray-400 mb-1">
                          Check In
                        </p>

                        {room.checkIn ? (

                          <p className="text-sm text-gray-700">
                            {new Date(
                              room.checkIn
                            ).toLocaleDateString()}
                          </p>

                        ) : (

                          <p className="text-sm text-gray-400">
                            —
                          </p>

                        )}

                      </div>


                      <div>

                        <p className="lg:hidden text-[10px] uppercase tracking-wider text-gray-400 mb-1">
                          Check Out
                        </p>

                        {room.checkOut ? (

                          <p className="text-sm text-gray-700">
                            {new Date(
                              room.checkOut
                            ).toLocaleDateString()}
                          </p>

                        ) : (

                          <p className="text-sm text-gray-400">
                            —
                          </p>

                        )}

                      </div>

                    </div>

                  ))}

                </div>

              </div>

            )}

          </div>


          <div className="flex items-center justify-between mt-4 text-xs text-gray-400">

            <span>
              Showing {filteredRooms.length} of {rooms.length} rooms
            </span>

            <span>
              Updates automatically
            </span>

          </div>

        </div>

      </main>

    </div>
  );
}

export default AvailableRooms;