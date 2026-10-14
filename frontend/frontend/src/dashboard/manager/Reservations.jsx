import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

function Reservations() {
  const navigate = useNavigate();

  const [reservations, setReservations] =
    useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [loading, setLoading] = useState(true);

  const loadReservations = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/manager/reservations?t=${Date.now()}`,
        {
          cache: "no-store"
        }
      );

      const data = await response.json();

      if (response.ok) {
        setReservations(
          Array.isArray(data) ? data : []
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReservations();
  }, []);

  const money = (value) =>
    `PKR ${Number(value || 0).toLocaleString()}`;

  const date = (value) => {
    if (!value) return "—";
    return new Date(value).toLocaleDateString();
  };

  const statusClass = (value) => {
    if (
      value === "confirmed" ||
      value === "completed"
    ) {
      return "bg-green-50 text-green-700 border-green-200";
    }

    if (value === "cancelled") {
      return "bg-red-50 text-red-700 border-red-200";
    }

    return "bg-yellow-50 text-yellow-700 border-yellow-200";
  };

  const statusLabel = (value) => {
    if (!value) return "—";

    return value
      .replaceAll("_", " ")
      .replace(/\b\w/g, (letter) =>
        letter.toUpperCase()
      );
  };

  const filtered = reservations.filter(
    (reservation) => {
      const query = search.toLowerCase();

      const matchesSearch =
        String(
          reservation.bookingId || ""
        )
          .toLowerCase()
          .includes(query) ||
        String(
          reservation.userId?.name || ""
        )
          .toLowerCase()
          .includes(query) ||
        String(
          reservation.roomId?.roomNumber || ""
        )
          .toLowerCase()
          .includes(query);

      const matchesStatus =
        status === "all" ||
        reservation.status === status;

      return matchesSearch && matchesStatus;
    }
  );

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#f5f5f3]">
      <Sidebar />

      <main className="flex-1 min-w-0">
        <div className="px-5 py-6 md:px-8 md:py-8">
          <div className="mb-6">
            <p className="text-xs uppercase tracking-[0.18em] text-gray-400 mb-2">
              Booking Operations
            </p>

            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
              Reservations
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Monitor all guest reservations
            </p>
          </div>

          <div className="bg-white border border-gray-200 mb-5">
            <div className="px-5 py-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search booking, guest or room..."
                className="h-10 px-3 border border-gray-200 text-sm outline-none focus:border-[#8f1d2c]"
              />

              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value)
                }
                className="h-10 px-3 border border-gray-200 text-sm text-gray-700 outline-none focus:border-[#8f1d2c] bg-white"
              >
                <option value="all">
                  All statuses
                </option>
                <option value="pending">
                  Pending
                </option>
                <option value="confirmed">
                  Confirmed
                </option>
                <option value="occupied">
                  Occupied
                </option>
                <option value="completed">
                  Completed
                </option>
                <option value="cancelled">
                  Cancelled
                </option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="bg-white border border-gray-200 px-5 py-12 text-center">
              <p className="text-sm text-gray-500">
                Loading reservations...
              </p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="bg-white border border-gray-200 px-5 py-12 text-center">
              <p className="text-sm text-gray-500">
                No reservations found.
              </p>
            </div>
          ) : (
            <div className="bg-white border border-gray-200 overflow-x-auto">
              <div className="min-w-[1050px]">
                <div className="grid grid-cols-[1.1fr_1.2fr_.8fr_1fr_1fr_1fr_1fr] gap-4 px-5 py-3 bg-gray-50 border-b border-gray-200 text-[10px] uppercase tracking-[0.12em] text-gray-400">
                  <span>Booking</span>
                  <span>Guest</span>
                  <span>Room</span>
                  <span>Check In</span>
                  <span>Check Out</span>
                  <span>Total</span>
                  <span>Status</span>
                </div>

                <div className="divide-y divide-gray-100">
                  {filtered.map(
                    (reservation) => (
                      <div
                        key={reservation._id}
                        className="grid grid-cols-[1.1fr_1.2fr_.8fr_1fr_1fr_1fr_1fr] gap-4 px-5 py-4 items-center"
                      >
                        <span className="text-xs text-gray-700">
                          {reservation.bookingId}
                        </span>

                        <span className="text-sm text-gray-800">
                          {reservation.userId?.name ||
                            "Unknown"}
                        </span>

                        <span className="text-sm text-gray-700">
                          {reservation.roomId
                            ? `#${reservation.roomId.roomNumber}`
                            : "—"}
                        </span>

                        <span className="text-xs text-gray-500">
                          {date(
                            reservation.checkIn
                          )}
                        </span>

                        <span className="text-xs text-gray-500">
                          {date(
                            reservation.checkOut
                          )}
                        </span>

                        <span className="text-xs font-medium text-gray-800">
                          {money(
                            reservation.totalPrice
                          )}
                        </span>

                        <span
                          className={`w-fit px-2 py-1 border text-[10px] ${statusClass(
                            reservation.status
                          )}`}
                        >
                          {statusLabel(
                            reservation.status
                          )}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Reservations;