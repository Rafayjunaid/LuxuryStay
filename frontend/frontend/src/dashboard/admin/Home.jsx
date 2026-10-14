import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

const API_URL = "http://localhost:5000/api";

function Home() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const response = await fetch(`${API_URL}/rooms`);
        const data = await response.json();

        if (response.ok) {
          setRooms(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("Dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const totalRooms = rooms.length;

  const availableRooms = rooms.filter(
    (room) => room.status === "available"
  ).length;

  const occupiedRooms = rooms.filter(
    (room) => room.status === "occupied"
  ).length;

  const reservedRooms = rooms.filter(
    (room) => room.status === "reserved"
  ).length;

  const maintenanceRooms = rooms.filter(
    (room) => room.status === "maintenance"
  ).length;

  const occupancyRate =
    totalRooms > 0
      ? Math.round(
          ((occupiedRooms + reservedRooms) / totalRooms) * 100
        )
      : 0;

  return (
    <div className="min-h-screen bg-[#f4f4f1] flex flex-col md:flex-row">

      <Sidebar />

      <main className="flex-1 min-w-0">

        {/* TOP BAR */}

        <header className="bg-white border-b border-gray-200 px-5 md:px-8 py-5">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            <div>

              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
                LuxuryStay / Administration
              </p>

              <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mt-1">
                Good morning, Admin
              </h1>

            </div>

            <div className="flex items-center gap-3">

              <div className="hidden sm:block text-right">

                <p className="text-sm font-medium text-gray-800">
                  Administrator
                </p>

                <p className="text-xs text-gray-400">
                  Hotel Management
                </p>

              </div>

              <div className="w-10 h-10 bg-[#8f1d2c] text-white flex items-center justify-center font-semibold">
                A
              </div>

            </div>

          </div>

        </header>


        {/* CONTENT */}

        <div className="p-5 md:p-8">

          {/* WELCOME BANNER */}

          <section className="relative overflow-hidden bg-[#171717] text-white mb-7">

            <div className="absolute right-[-60px] top-[-80px] w-64 h-64 rounded-full border border-white/10" />

            <div className="absolute right-[-20px] bottom-[-100px] w-72 h-72 rounded-full border border-white/10" />

            <div className="relative p-6 md:p-8 max-w-3xl">

              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-3">
                Hotel Overview
              </p>

              <h2 className="text-2xl md:text-3xl font-semibold mb-3">
                Everything under control.
              </h2>

              <p className="text-sm text-gray-400 leading-6 max-w-xl">
                Monitor your rooms, reservations and hotel
                operations from one place. Keep LuxuryStay
                running smoothly.
              </p>

              <div className="flex flex-wrap gap-3 mt-6">

                <a
                  href="/dashboard/admin/rooms"
                  className="inline-flex items-center bg-[#8f1d2c] hover:bg-[#a52234] px-5 py-3 text-sm font-semibold transition"
                >
                  Manage Rooms
                </a>

                <a
                  href="/dashboard/admin/reservations"
                  className="inline-flex items-center border border-white/20 hover:bg-white/10 px-5 py-3 text-sm font-semibold transition"
                >
                  View Reservations
                </a>

              </div>

            </div>

          </section>


          {/* STAT CARDS */}

          <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-7">

            {/* TOTAL ROOMS */}

            <div className="bg-white border border-gray-200 p-5">

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-[10px] uppercase tracking-[0.15em] text-gray-400">
                    Total Rooms
                  </p>

                  <p className="text-3xl font-semibold text-gray-900 mt-3">
                    {loading ? "—" : totalRooms}
                  </p>

                </div>

                <div className="w-10 h-10 bg-gray-100 flex items-center justify-center text-gray-700">
                  🏨
                </div>

              </div>

              <p className="text-xs text-gray-400 mt-4">
                Rooms registered in the system
              </p>

            </div>


            {/* AVAILABLE */}

            <div className="bg-white border border-gray-200 p-5">

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-[10px] uppercase tracking-[0.15em] text-gray-400">
                    Available
                  </p>

                  <p className="text-3xl font-semibold text-gray-900 mt-3">
                    {loading ? "—" : availableRooms}
                  </p>

                </div>

                <div className="w-10 h-10 bg-green-50 flex items-center justify-center text-green-700">
                  ✓
                </div>

              </div>

              <p className="text-xs text-green-600 mt-4">
                Ready for guests
              </p>

            </div>


            {/* RESERVED */}

            <div className="bg-white border border-gray-200 p-5">

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-[10px] uppercase tracking-[0.15em] text-gray-400">
                    Reserved
                  </p>

                  <p className="text-3xl font-semibold text-gray-900 mt-3">
                    {loading ? "—" : reservedRooms}
                  </p>

                </div>

                <div className="w-10 h-10 bg-yellow-50 flex items-center justify-center text-yellow-700">
                  ◷
                </div>

              </div>

              <p className="text-xs text-gray-400 mt-4">
                Upcoming room reservations
              </p>

            </div>


            {/* OCCUPIED */}

            <div className="bg-white border border-gray-200 p-5">

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-[10px] uppercase tracking-[0.15em] text-gray-400">
                    Occupied
                  </p>

                  <p className="text-3xl font-semibold text-gray-900 mt-3">
                    {loading ? "—" : occupiedRooms}
                  </p>

                </div>

                <div className="w-10 h-10 bg-red-50 flex items-center justify-center text-[#8f1d2c]">
                  ●
                </div>

              </div>

              <p className="text-xs text-gray-400 mt-4">
                Currently occupied rooms
              </p>

            </div>

          </section>


          {/* MAIN GRID */}

          <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">

            {/* ROOM STATUS */}

            <div className="xl:col-span-2 bg-white border border-gray-200">

              <div className="px-5 py-5 border-b border-gray-200 flex items-center justify-between">

                <div>

                  <p className="text-[10px] uppercase tracking-[0.16em] text-gray-400">
                    Live Inventory
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mt-1">
                    Room Status
                  </h3>

                </div>

                <a
                  href="/dashboard/admin/rooms"
                  className="text-xs font-semibold text-[#8f1d2c] hover:underline"
                >
                  Manage Rooms →
                </a>

              </div>

              <div className="p-5">

                {/* OCCUPANCY */}

                <div className="mb-7">

                  <div className="flex justify-between items-end mb-2">

                    <div>

                      <p className="text-sm font-medium text-gray-800">
                        Occupancy
                      </p>

                      <p className="text-xs text-gray-400 mt-1">
                        Reserved + occupied rooms
                      </p>

                    </div>

                    <p className="text-xl font-semibold text-gray-900">
                      {occupancyRate}%
                    </p>

                  </div>

                  <div className="h-2 bg-gray-100 overflow-hidden">

                    <div
                      className="h-full bg-[#8f1d2c] transition-all"
                      style={{
                        width: `${occupancyRate}%`
                      }}
                    />

                  </div>

                </div>


                {/* STATUS GRID */}

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

                  <div className="border border-gray-200 p-4">

                    <div className="flex items-center gap-2">

                      <span className="w-2 h-2 rounded-full bg-green-500" />

                      <span className="text-xs text-gray-500">
                        Available
                      </span>

                    </div>

                    <p className="text-2xl font-semibold mt-3">
                      {availableRooms}
                    </p>

                  </div>


                  <div className="border border-gray-200 p-4">

                    <div className="flex items-center gap-2">

                      <span className="w-2 h-2 rounded-full bg-yellow-500" />

                      <span className="text-xs text-gray-500">
                        Reserved
                      </span>

                    </div>

                    <p className="text-2xl font-semibold mt-3">
                      {reservedRooms}
                    </p>

                  </div>


                  <div className="border border-gray-200 p-4">

                    <div className="flex items-center gap-2">

                      <span className="w-2 h-2 rounded-full bg-red-500" />

                      <span className="text-xs text-gray-500">
                        Occupied
                      </span>

                    </div>

                    <p className="text-2xl font-semibold mt-3">
                      {occupiedRooms}
                    </p>

                  </div>


                  <div className="border border-gray-200 p-4">

                    <div className="flex items-center gap-2">

                      <span className="w-2 h-2 rounded-full bg-gray-500" />

                      <span className="text-xs text-gray-500">
                        Maintenance
                      </span>

                    </div>

                    <p className="text-2xl font-semibold mt-3">
                      {maintenanceRooms}
                    </p>

                  </div>

                </div>

              </div>

            </div>


            {/* QUICK ACTIONS */}

            <div className="bg-white border border-gray-200">

              <div className="px-5 py-5 border-b border-gray-200">

                <p className="text-[10px] uppercase tracking-[0.16em] text-gray-400">
                  Shortcuts
                </p>

                <h3 className="text-lg font-semibold text-gray-900 mt-1">
                  Quick Actions
                </h3>

              </div>

              <div className="p-5 space-y-3">

                <a
                  href="/dashboard/admin/rooms"
                  className="group flex items-center justify-between border border-gray-200 p-4 hover:border-[#8f1d2c] transition"
                >

                  <div>

                    <p className="text-sm font-semibold text-gray-900">
                      Add New Room
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                      Create a room in inventory
                    </p>

                  </div>

                  <span className="text-lg text-gray-400 group-hover:text-[#8f1d2c]">
                    +
                  </span>

                </a>


                <a
                  href="/dashboard/admin/rooms"
                  className="group flex items-center justify-between border border-gray-200 p-4 hover:border-[#8f1d2c] transition"
                >

                  <div>

                    <p className="text-sm font-semibold text-gray-900">
                      Manage Rooms
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                      Edit or remove existing rooms
                    </p>

                  </div>

                  <span className="text-lg text-gray-400 group-hover:text-[#8f1d2c]">
                    →
                  </span>

                </a>


                <a
                  href="/dashboard/admin/reservations"
                  className="group flex items-center justify-between border border-gray-200 p-4 hover:border-[#8f1d2c] transition"
                >

                  <div>

                    <p className="text-sm font-semibold text-gray-900">
                      Reservations
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                      Check current bookings
                    </p>

                  </div>

                  <span className="text-lg text-gray-400 group-hover:text-[#8f1d2c]">
                    →
                  </span>

                </a>


                <a
                  href="/dashboard/admin/users"
                  className="group flex items-center justify-between border border-gray-200 p-4 hover:border-[#8f1d2c] transition"
                >

                  <div>

                    <p className="text-sm font-semibold text-gray-900">
                      Manage Users
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                      View registered users
                    </p>

                  </div>

                  <span className="text-lg text-gray-400 group-hover:text-[#8f1d2c]">
                    →
                  </span>

                </a>

              </div>

            </div>

          </section>


          {/* RECENT ROOMS */}

          <section className="bg-white border border-gray-200 mt-6">

            <div className="px-5 py-5 border-b border-gray-200 flex items-center justify-between">

              <div>

                <p className="text-[10px] uppercase tracking-[0.16em] text-gray-400">
                  Inventory
                </p>

                <h3 className="text-lg font-semibold text-gray-900 mt-1">
                  Recent Rooms
                </h3>

              </div>

              <a
                href="/dashboard/admin/rooms"
                className="text-xs font-semibold text-[#8f1d2c] hover:underline"
              >
                View All →
              </a>

            </div>

            {loading ? (

              <div className="p-8 text-sm text-gray-400">
                Loading room data...
              </div>

            ) : rooms.length === 0 ? (

              <div className="p-8">

                <p className="text-sm font-medium text-gray-800">
                  No rooms have been added yet.
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  Add your first room to start managing inventory.
                </p>

                <a
                  href="/dashboard/admin/rooms"
                  className="inline-block mt-4 bg-[#8f1d2c] text-white px-4 py-2 text-xs font-semibold"
                >
                  Add First Room
                </a>

              </div>

            ) : (

              <div className="overflow-x-auto">

                <table className="w-full">

                  <thead>

                    <tr className="border-b border-gray-200 bg-gray-50">

                      <th className="text-left px-5 py-3 text-[10px] uppercase tracking-[0.12em] text-gray-500">
                        Room
                      </th>

                      <th className="text-left px-5 py-3 text-[10px] uppercase tracking-[0.12em] text-gray-500">
                        Type
                      </th>

                      <th className="text-left px-5 py-3 text-[10px] uppercase tracking-[0.12em] text-gray-500">
                        Price
                      </th>

                      <th className="text-left px-5 py-3 text-[10px] uppercase tracking-[0.12em] text-gray-500">
                        Status
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {rooms
                      .slice(0, 5)
                      .map((room) => (

                        <tr
                          key={room._id}
                          className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
                        >

                          <td className="px-5 py-4">

                            <p className="text-sm font-semibold text-gray-900">
                              {room.roomNumber}
                            </p>

                          </td>

                          <td className="px-5 py-4 text-sm text-gray-600">
                            {room.roomType}
                          </td>

                          <td className="px-5 py-4 text-sm text-gray-600">
                            PKR{" "}
                            {Number(
                              room.price || 0
                            ).toLocaleString()}
                          </td>

                          <td className="px-5 py-4">

                            <span className="inline-flex items-center gap-2 text-xs capitalize text-gray-600">

                              <span
                                className={`w-2 h-2 rounded-full ${
                                  room.status === "available"
                                    ? "bg-green-500"
                                    : room.status === "reserved"
                                      ? "bg-yellow-500"
                                      : room.status === "occupied"
                                        ? "bg-red-500"
                                        : "bg-gray-500"
                                }`}
                              />

                              {room.status}

                            </span>

                          </td>

                        </tr>

                      ))}

                  </tbody>

                </table>

              </div>

            )}

          </section>


          {/* FOOTER */}

          <footer className="mt-8 pb-4 text-center">

            <p className="text-[10px] uppercase tracking-[0.18em] text-gray-400">
              LuxuryStay Hotel Management System
            </p>

          </footer>

        </div>

      </main>

    </div>
  );
}

export default Home;