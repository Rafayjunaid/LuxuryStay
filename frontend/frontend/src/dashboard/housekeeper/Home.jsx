import {
  useEffect,
  useState
} from "react";

import Sidebar from "./Sidebar";

function Home() {

  const [complaints, setComplaints] = useState([]);

  const [loading, setLoading] = useState(true);

  const loadComplaints = async () => {

    try {

      const response = await fetch(
        "http://localhost:5000/api/complaints"
      );

      const data = await response.json();

      if (response.ok) {

        setComplaints(
          Array.isArray(data)
            ? data
            : []
        );

      }

    } catch (error) {

      console.log(error);

    }

    setLoading(false);

  };

  useEffect(() => {

    loadComplaints();

  }, []);

  const pendingCount =
    complaints.filter(
      (item) =>
        item.status === "pending"
    ).length;

  const inProgressCount =
    complaints.filter(
      (item) =>
        item.status === "in_progress"
    ).length;

  const resolvedCount =
    complaints.filter(
      (item) =>
        item.status === "resolved"
    ).length;

  const totalTasks =
    pendingCount +
    inProgressCount +
    resolvedCount;

  return (

    <div className="min-h-screen flex flex-col md:flex-row bg-[#f5f5f3]">

      <Sidebar />

      <main className="flex-1 min-w-0">

        <div className="px-5 py-6 md:px-8 md:py-8">

          {/* Header */}

          <div className="mb-8">

            <p className="text-xs uppercase tracking-[0.18em] text-gray-400 mb-2">
              Housekeeping
            </p>

            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
              Dashboard
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Daily overview of housekeeping operations
            </p>

          </div>


          {/* Overview Cards */}

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">

            <div className="bg-white border border-gray-200 px-5 py-5">

              <p className="text-xs uppercase tracking-[0.12em] text-gray-400">
                Rooms To Clean
              </p>

              <p className="text-2xl font-semibold text-gray-900 mt-3">
                {loading ? "—" : pendingCount}
              </p>

              <p className="text-xs text-gray-400 mt-1">
                Awaiting housekeeping
              </p>

            </div>


            <div className="bg-white border border-blue-200 px-5 py-5">

              <p className="text-xs uppercase tracking-[0.12em] text-blue-600">
                In Progress
              </p>

              <p className="text-2xl font-semibold text-gray-900 mt-3">
                {loading ? "—" : inProgressCount}
              </p>

              <p className="text-xs text-gray-400 mt-1">
                Currently being serviced
              </p>

            </div>


            <div className="bg-white border border-green-200 px-5 py-5">

              <p className="text-xs uppercase tracking-[0.12em] text-green-600">
                Completed
              </p>

              <p className="text-2xl font-semibold text-gray-900 mt-3">
                {loading ? "—" : resolvedCount}
              </p>

              <p className="text-xs text-gray-400 mt-1">
                Tasks completed
              </p>

            </div>


            <div className="bg-white border border-gray-200 px-5 py-5">

              <p className="text-xs uppercase tracking-[0.12em] text-gray-400">
                Total Tasks
              </p>

              <p className="text-2xl font-semibold text-gray-900 mt-3">
                {loading ? "—" : totalTasks}
              </p>

              <p className="text-xs text-gray-400 mt-1">
                Today's housekeeping
              </p>

            </div>

          </div>


          {/* Main Operations Section */}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">


            {/* Today's Operations */}

            <div className="lg:col-span-2 bg-white border border-gray-200">

              <div className="px-5 py-5 border-b border-gray-100">

                <p className="text-[10px] uppercase tracking-[0.16em] text-gray-400">
                  Daily Operations
                </p>

                <h2 className="text-lg font-semibold text-gray-900 mt-1">
                  Today's Housekeeping
                </h2>

              </div>


              <div className="divide-y divide-gray-100">


                <div className="px-5 py-4 flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <div className="w-9 h-9 bg-amber-50 flex items-center justify-center text-amber-600 text-sm">
                      !
                    </div>

                    <div>

                      <p className="text-sm font-medium text-gray-900">
                        Rooms Awaiting Cleaning
                      </p>

                      <p className="text-xs text-gray-400 mt-0.5">
                        Rooms requiring housekeeping service
                      </p>

                    </div>

                  </div>

                  <span className="text-sm font-semibold text-gray-900">
                    {loading ? "—" : pendingCount}
                  </span>

                </div>


                <div className="px-5 py-4 flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <div className="w-9 h-9 bg-blue-50 flex items-center justify-center text-blue-600 text-sm">
                      ↻
                    </div>

                    <div>

                      <p className="text-sm font-medium text-gray-900">
                        Rooms Being Serviced
                      </p>

                      <p className="text-xs text-gray-400 mt-0.5">
                        Housekeeping tasks currently in progress
                      </p>

                    </div>

                  </div>

                  <span className="text-sm font-semibold text-gray-900">
                    {loading ? "—" : inProgressCount}
                  </span>

                </div>


                <div className="px-5 py-4 flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <div className="w-9 h-9 bg-green-50 flex items-center justify-center text-green-600 text-sm">
                      ✓
                    </div>

                    <div>

                      <p className="text-sm font-medium text-gray-900">
                        Rooms Completed
                      </p>

                      <p className="text-xs text-gray-400 mt-0.5">
                        Housekeeping tasks completed today
                      </p>

                    </div>

                  </div>

                  <span className="text-sm font-semibold text-gray-900">
                    {loading ? "—" : resolvedCount}
                  </span>

                </div>


              </div>

            </div>


            {/* Quick Summary */}

            <div className="bg-white border border-gray-200">

              <div className="px-5 py-5 border-b border-gray-100">

                <p className="text-[10px] uppercase tracking-[0.16em] text-gray-400">
                  Operations
                </p>

                <h2 className="text-lg font-semibold text-gray-900 mt-1">
                  Housekeeping Status
                </h2>

              </div>


              <div className="px-5 py-5 space-y-5">


                <div>

                  <div className="flex items-center justify-between mb-2">

                    <p className="text-sm text-gray-600">
                      Cleaning Progress
                    </p>

                    <p className="text-sm font-medium text-gray-900">

                      {totalTasks > 0
                        ? Math.round(
                            (resolvedCount / totalTasks) * 100
                          )
                        : 0}%

                    </p>

                  </div>

                  <div className="w-full h-2 bg-gray-100">

                    <div
                      className="h-2 bg-[#8f1d2c] transition-all"
                      style={{
                        width: `${
                          totalTasks > 0
                            ? (resolvedCount / totalTasks) * 100
                            : 0
                        }%`
                      }}
                    />

                  </div>

                </div>


                <div className="pt-2">

                  <p className="text-xs uppercase tracking-[0.12em] text-gray-400">
                    Current Shift
                  </p>

                  <p className="text-sm font-medium text-gray-900 mt-2">
                    Housekeeping Team
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    Daily room servicing and inspection
                  </p>

                </div>


                <div className="pt-2">

                  <p className="text-xs uppercase tracking-[0.12em] text-gray-400">
                    Service Status
                  </p>

                  <div className="flex items-center gap-2 mt-2">

                    <span className="w-2 h-2 rounded-full bg-green-500"></span>

                    <p className="text-sm text-gray-700">
                      Operations Active
                    </p>

                  </div>

                </div>


              </div>

            </div>

          </div>


          {/* Housekeeping Information */}

          <div className="mt-6 bg-white border border-gray-200">

            <div className="px-5 py-5">

              <p className="text-[10px] uppercase tracking-[0.16em] text-gray-400">
                Housekeeping Department
              </p>

              <h2 className="text-lg font-semibold text-gray-900 mt-1">
                Daily Responsibilities
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">


                <div className="border border-gray-100 px-4 py-4">

                  <p className="text-sm font-medium text-gray-900">
                    Room Cleaning
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    Maintain cleanliness and prepare rooms for guests.
                  </p>

                </div>


                <div className="border border-gray-100 px-4 py-4">

                  <p className="text-sm font-medium text-gray-900">
                    Room Inspection
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    Check rooms before marking them ready for guests.
                  </p>

                </div>


                <div className="border border-gray-100 px-4 py-4">

                  <p className="text-sm font-medium text-gray-900">
                    Linen & Supplies
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    Monitor linen, towels and essential room supplies.
                  </p>

                </div>


                <div className="border border-gray-100 px-4 py-4">

                  <p className="text-sm font-medium text-gray-900">
                    Maintenance Reports
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    Identify and report room maintenance requirements.
                  </p>

                </div>


              </div>

            </div>

          </div>


        </div>

      </main>

    </div>

  );

}

export default Home;
