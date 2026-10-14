import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

function Home() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    totalRooms: 0,
    occupiedRooms: 0,
    availableRooms: 0,
    needsCleaning: 0,
    totalGuests: 0,
    totalReservations: 0,
    pendingReservations: 0,
    totalRevenue: 0,
    pendingPayments: 0,
    totalFeedback: 0,
    pendingFeedback: 0,
    totalComplaints: 0,
    pendingComplaints: 0
  });

  const [loading, setLoading] = useState(true);

  const loadDashboard = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/manager/dashboard?t=${Date.now()}`,
        {
          cache: "no-store",
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache"
          }
        }
      );

      const result = await response.json();

      if (response.ok) {
        setData(result);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();

    const interval = setInterval(
      loadDashboard,
      5000
    );

    return () => clearInterval(interval);
  }, []);

  const money = (value) =>
    `PKR ${Number(value || 0).toLocaleString()}`;

  const statCards = [
    {
      label: "Total Rooms",
      value: data.totalRooms,
      description: "Rooms registered in hotel",
      action: () => navigate("/dashboard/manager/rooms")
    },
    {
      label: "Occupied Rooms",
      value: data.occupiedRooms,
      description: "Rooms currently occupied",
      action: () => navigate("/dashboard/manager/rooms")
    },
    {
      label: "Available Rooms",
      value: data.availableRooms,
      description: "Rooms currently available",
      action: () => navigate("/dashboard/manager/rooms")
    },
    {
      label: "Needs Cleaning",
      value: data.needsCleaning,
      description: "Housekeeping attention required",
      action: () => navigate("/dashboard/manager/rooms")
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col md:flex-row bg-[#f5f5f3]">
        <Sidebar />

        <main className="flex-1 min-w-0">
          <div className="px-5 py-8 md:px-8">
            <p className="text-sm text-gray-500">
              Loading manager dashboard...
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#f5f5f3]">
      <Sidebar />

      <main className="flex-1 min-w-0">
        <div className="px-5 py-6 md:px-8 md:py-8">
          <div className="mb-7">
            <p className="text-xs uppercase tracking-[0.18em] text-gray-400 mb-2">
              Management Overview
            </p>

            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
              Manager Dashboard
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Monitor hotel operations, guests, reservations and payments
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 mb-6">
            {statCards.map((card) => (
              <button
                key={card.label}
                type="button"
                onClick={card.action}
                className="bg-white border border-gray-200 px-5 py-5 text-left hover:border-gray-300 transition cursor-pointer"
              >
                <p className="text-[10px] uppercase tracking-[0.14em] text-gray-400">
                  {card.label}
                </p>

                <p className="text-2xl font-semibold text-gray-900 mt-2">
                  {card.value}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  {card.description}
                </p>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
            <div className="xl:col-span-2 bg-white border border-gray-200">
              <div className="px-5 py-5 border-b border-gray-200">
                <p className="text-[10px] uppercase tracking-[0.16em] text-gray-400">
                  Hotel Operations
                </p>

                <h2 className="text-lg font-semibold text-gray-900 mt-1">
                  Current Overview
                </h2>
              </div>

              <div className="divide-y divide-gray-100">
                <div className="px-5 py-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Guests
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                      Registered guests with hotel reservations
                    </p>
                  </div>

                  <span className="text-lg font-semibold text-gray-900">
                    {data.totalGuests}
                  </span>
                </div>

                <div className="px-5 py-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Reservations
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                      Total booking records
                    </p>
                  </div>

                  <span className="text-lg font-semibold text-gray-900">
                    {data.totalReservations}
                  </span>
                </div>

                <div className="px-5 py-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Pending Reservations
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                      Reservations awaiting confirmation
                    </p>
                  </div>

                  <span className="text-lg font-semibold text-[#8f1d2c]">
                    {data.pendingReservations}
                  </span>
                </div>

                <div className="px-5 py-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Hotel Revenue
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                      Amount recorded from bookings
                    </p>
                  </div>

                  <span className="text-sm font-semibold text-gray-900">
                    {money(data.totalRevenue)}
                  </span>
                </div>

                <div className="px-5 py-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Pending Payments
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                      Bookings with outstanding payment status
                    </p>
                  </div>

                  <span className="text-lg font-semibold text-[#8f1d2c]">
                    {data.pendingPayments}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200">
              <div className="px-5 py-5 border-b border-gray-200">
                <p className="text-[10px] uppercase tracking-[0.16em] text-gray-400">
                  Attention
                </p>

                <h2 className="text-lg font-semibold text-gray-900 mt-1">
                  Items To Monitor
                </h2>
              </div>

              <div className="divide-y divide-gray-100">
                <button
                  type="button"
                  onClick={() =>
                    navigate("/dashboard/manager/feedback")
                  }
                  className="w-full px-5 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition cursor-pointer"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Pending Feedback
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                      Guest feedback awaiting review
                    </p>
                  </div>

                  <span className="text-lg font-semibold text-[#8f1d2c]">
                    {data.pendingFeedback}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    navigate("/dashboard/manager/complaints")
                  }
                  className="w-full px-5 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition cursor-pointer"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Pending Complaints
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                      Complaints requiring attention
                    </p>
                  </div>

                  <span className="text-lg font-semibold text-[#8f1d2c]">
                    {data.pendingComplaints}
                  </span>
                </button>

                <div className="px-5 py-5">
                  <p className="text-sm font-medium text-gray-800">
                    Total Feedback
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    All guest feedback records
                  </p>

                  <p className="text-lg font-semibold text-gray-900 mt-2">
                    {data.totalFeedback}
                  </p>
                </div>

                <div className="px-5 py-5">
                  <p className="text-sm font-medium text-gray-800">
                    Total Complaints
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    All complaint records
                  </p>

                  <p className="text-lg font-semibold text-gray-900 mt-2">
                    {data.totalComplaints}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 bg-[#171717] text-white px-5 py-5">
            <p className="text-[10px] uppercase tracking-[0.16em] text-white/40">
              Manager Access
            </p>

            <p className="text-sm font-medium mt-2">
              Monitoring mode
            </p>

            <p className="text-xs text-white/50 mt-1 leading-5">
              This portal is read-only. Manager accounts can inspect hotel
              information but cannot create, edit, update or delete records.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;