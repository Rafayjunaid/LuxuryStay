import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

function Reservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/admin/reservations"
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load reservations"
          );
        }

        setReservations(data);
      } catch (error) {
        console.error(error);
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const getStatusClass = (status) => {
    const classes = {
      pending: "bg-yellow-100 text-yellow-700",
      confirmed: "bg-blue-100 text-blue-700",
      occupied: "bg-purple-100 text-purple-700",
      completed: "bg-green-100 text-green-700",
      cancelled: "bg-red-100 text-red-700"
    };

    return (
      classes[status] ||
      "bg-gray-100 text-gray-700"
    );
  };

  return (
    <div className="min-h-screen bg-[#f6f6f6] md:flex">

      <Sidebar />

      <main className="flex-1 p-5 md:p-8">

        <div className="mb-8">
          <p className="text-sm text-gray-500">
            Admin / Reservations
          </p>

          <h1 className="text-3xl font-semibold text-gray-900 mt-1">
            Reservations
          </h1>

          <p className="text-gray-500 mt-2">
            View all hotel reservations.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">

          {loading ? (
            <div className="p-10 text-center text-gray-500">
              Loading reservations...
            </div>
          ) : reservations.length === 0 ? (
            <div className="p-10 text-center text-gray-500">
              No reservations found.
            </div>
          ) : (

            <div className="overflow-x-auto">

              <table className="w-full text-sm">

                <thead className="bg-[#171717] text-white">

                  <tr>
                    <th className="text-left px-5 py-4">
                      Booking
                    </th>

                    <th className="text-left px-5 py-4">
                      Guest
                    </th>

                    <th className="text-left px-5 py-4">
                      Room
                    </th>

                    <th className="text-left px-5 py-4">
                      Check In
                    </th>

                    <th className="text-left px-5 py-4">
                      Check Out
                    </th>

                    <th className="text-left px-5 py-4">
                      Total
                    </th>

                    <th className="text-left px-5 py-4">
                      Status
                    </th>
                  </tr>

                </thead>

                <tbody>

                  {reservations.map((booking) => (

                    <tr
                      key={booking._id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >

                      <td className="px-5 py-4 font-medium">
                        {booking.bookingId}
                      </td>

                      <td className="px-5 py-4">

                        <p className="font-medium">
                          {booking.userId?.name ||
                            "Unknown"}
                        </p>

                        <p className="text-xs text-gray-500">
                          {booking.userId?.email || "-"}
                        </p>

                      </td>

                      <td className="px-5 py-4">
                        {booking.roomId?.roomNumber ||
                          "-"}
                      </td>

                      <td className="px-5 py-4">
                        {booking.checkIn
                          ? new Date(
                              booking.checkIn
                            ).toLocaleDateString()
                          : "-"}
                      </td>

                      <td className="px-5 py-4">
                        {booking.checkOut
                          ? new Date(
                              booking.checkOut
                            ).toLocaleDateString()
                          : "-"}
                      </td>

                      <td className="px-5 py-4 font-medium">
                        Rs.{" "}
                        {Number(
                          booking.totalPrice || 0
                        ).toLocaleString()}
                      </td>

                      <td className="px-5 py-4">

                        <span
                          className={`px-3 py-1 rounded-full text-xs ${getStatusClass(
                            booking.status
                          )}`}
                        >
                          {booking.status}
                        </span>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </main>

    </div>
  );
}

export default Reservations;