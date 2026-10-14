import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

function Complaints() {
  const [complaints, setComplaints] =
    useState([]);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [loading, setLoading] = useState(true);

  const loadComplaints = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/manager/complaints?t=${Date.now()}`,
        {
          cache: "no-store"
        }
      );

      const data = await response.json();

      if (response.ok) {
        setComplaints(
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
    loadComplaints();
  }, []);

  const filtered = complaints.filter(
    (complaint) => {
      const query = search.toLowerCase();

      const matchesSearch =
        String(
          complaint.roomNumber || ""
        )
          .toLowerCase()
          .includes(query) ||
        String(
          complaint.guestName || ""
        )
          .toLowerCase()
          .includes(query) ||
        String(
          complaint.complaint || ""
        )
          .toLowerCase()
          .includes(query);

      const matchesStatus =
        status === "all" ||
        complaint.status === status;

      return matchesSearch && matchesStatus;
    }
  );

  const statusClass = (value) => {
    if (value === "resolved") {
      return "bg-green-50 text-green-700 border-green-200";
    }

    if (value === "in_progress") {
      return "bg-yellow-50 text-yellow-700 border-yellow-200";
    }

    return "bg-red-50 text-red-700 border-red-200";
  };

  const statusLabel = (value) => {
    if (!value) return "—";

    return value
      .replaceAll("_", " ")
      .replace(/\b\w/g, (letter) =>
        letter.toUpperCase()
      );
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#f5f5f3]">
      <Sidebar />

      <main className="flex-1 min-w-0">
        <div className="px-5 py-6 md:px-8 md:py-8">
          <div className="mb-6">
            <p className="text-xs uppercase tracking-[0.18em] text-gray-400 mb-2">
              Guest Service
            </p>

            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
              Complaints
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Monitor guest complaints and their current status
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
                placeholder="Search room, guest or complaint..."
                className="h-10 px-3 border border-gray-200 text-sm outline-none focus:border-[#8f1d2c]"
              />

              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value)
                }
                className="h-10 px-3 border border-gray-200 text-sm bg-white outline-none focus:border-[#8f1d2c]"
              >
                <option value="all">
                  All statuses
                </option>
                <option value="pending">
                  Pending
                </option>
                <option value="in_progress">
                  In Progress
                </option>
                <option value="resolved">
                  Resolved
                </option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="bg-white border border-gray-200 px-5 py-12 text-center">
              <p className="text-sm text-gray-500">
                Loading complaints...
              </p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="bg-white border border-gray-200 px-5 py-12 text-center">
              <p className="text-sm text-gray-500">
                No complaints found.
              </p>
            </div>
          ) : (
            <div className="bg-white border border-gray-200 divide-y divide-gray-100">
              {filtered.map((complaint) => (
                <div
                  key={complaint._id}
                  className="px-5 py-6"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <p className="text-sm font-semibold text-gray-900">
                          Room {complaint.roomNumber}
                        </p>

                        <span className="text-xs text-gray-400">
                          {complaint.guestName}
                        </span>
                      </div>

                      <p className="text-sm text-gray-600 leading-7 mt-4 max-w-4xl">
                        {complaint.complaint}
                      </p>

                      <p className="text-[11px] text-gray-400 mt-4">
                        {complaint.createdAt
                          ? new Date(
                              complaint.createdAt
                            ).toLocaleString()
                          : "—"}
                      </p>
                    </div>

                    <span
                      className={`w-fit px-2.5 py-1 border text-[10px] font-medium ${statusClass(
                        complaint.status
                      )}`}
                    >
                      {statusLabel(
                        complaint.status
                      )}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Complaints;