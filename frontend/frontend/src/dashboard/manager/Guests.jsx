import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

function Guests() {
  const navigate = useNavigate();

  const [guests, setGuests] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const loadGuests = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/manager/guests?t=${Date.now()}`,
        {
          cache: "no-store"
        }
      );

      const data = await response.json();

      if (response.ok) {
        setGuests(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGuests();
  }, []);

  const filteredGuests = guests.filter((guest) => {
    const value = search.toLowerCase();

    return (
      String(guest.name || "")
        .toLowerCase()
        .includes(value) ||
      String(guest.email || "")
        .toLowerCase()
        .includes(value)
    );
  });

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#f5f5f3]">
      <Sidebar />

      <main className="flex-1 min-w-0">
        <div className="px-5 py-6 md:px-8 md:py-8">
          <div className="mb-6">
            <p className="text-xs uppercase tracking-[0.18em] text-gray-400 mb-2">
              Guest Management
            </p>

            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
              Guests
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Monitor guest profiles, reservations and hotel activity
            </p>
          </div>

          <div className="bg-white border border-gray-200 mb-5">
            <div className="px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <p className="text-[10px] uppercase tracking-[0.14em] text-gray-400">
                  Guest Directory
                </p>

                <p className="text-sm text-gray-700 mt-1">
                  {guests.length} registered guests
                </p>
              </div>

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search guest..."
                className="w-full sm:w-72 h-10 px-3 border border-gray-200 text-sm text-gray-700 outline-none focus:border-[#8f1d2c]"
              />
            </div>
          </div>

          {loading ? (
            <div className="bg-white border border-gray-200 px-5 py-12 text-center">
              <p className="text-sm text-gray-500">
                Loading guests...
              </p>
            </div>
          ) : filteredGuests.length === 0 ? (
            <div className="bg-white border border-gray-200 px-5 py-12 text-center">
              <p className="text-sm font-medium text-gray-700">
                No guests found
              </p>

              <p className="text-xs text-gray-400 mt-1">
                Try another name or email.
              </p>
            </div>
          ) : (
            <div className="bg-white border border-gray-200 overflow-hidden">
              <div className="hidden lg:grid grid-cols-[1.2fr_1.5fr_1fr_1fr_auto] gap-4 px-5 py-3 bg-gray-50 border-b border-gray-200 text-[10px] uppercase tracking-[0.12em] text-gray-400">
                <span>Guest</span>
                <span>Email</span>
                <span>Reservations</span>
                <span>Role</span>
                <span></span>
              </div>

              <div className="divide-y divide-gray-100">
                {filteredGuests.map((guest) => (
                  <div
                    key={guest._id}
                    className="px-5 py-5 hover:bg-gray-50/60 transition"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1.5fr_1fr_1fr_auto] gap-4 lg:items-center">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {guest.name}
                        </p>

                        <p className="text-xs text-gray-400 mt-1">
                          Guest ID: {guest._id?.slice(-8)}
                        </p>
                      </div>

                      <p className="text-sm text-gray-600 break-all">
                        {guest.email}
                      </p>

                      <p className="text-sm text-gray-700">
                        {guest.reservationCount ??
                          guest.totalReservations ??
                          0}
                      </p>

                      <span className="text-xs text-gray-500 capitalize">
                        {guest.role || "guest"}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          navigate(
                            `/dashboard/manager/guests/${guest._id}`
                          )
                        }
                        className="h-9 px-4 border border-gray-200 text-xs font-medium text-gray-700 hover:border-[#8f1d2c] hover:text-[#8f1d2c] transition cursor-pointer"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Guests;