import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

function Feedback() {
  const [feedback, setFeedback] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [loading, setLoading] = useState(true);

  const loadFeedback = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/manager/feedback?t=${Date.now()}`,
        {
          cache: "no-store"
        }
      );

      const data = await response.json();

      if (response.ok) {
        setFeedback(
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
    loadFeedback();
  }, []);

  const filtered = feedback.filter((item) => {
    const query = search.toLowerCase();

    const matchesSearch =
      String(item.name || "")
        .toLowerCase()
        .includes(query) ||
      String(item.email || "")
        .toLowerCase()
        .includes(query) ||
      String(item.message || "")
        .toLowerCase()
        .includes(query);

    const matchesStatus =
      status === "all" ||
      item.status === status;

    return matchesSearch && matchesStatus;
  });

  const statusClass = (value) => {
    if (value === "active") {
      return "bg-green-50 text-green-700 border-green-200";
    }

    if (value === "blocked") {
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

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#f5f5f3]">
      <Sidebar />

      <main className="flex-1 min-w-0">
        <div className="px-5 py-6 md:px-8 md:py-8">
          <div className="mb-6">
            <p className="text-xs uppercase tracking-[0.18em] text-gray-400 mb-2">
              Guest Experience
            </p>

            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
              Feedback
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Monitor guest feedback and ratings
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
                placeholder="Search guest or feedback..."
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
                <option value="active">
                  Active
                </option>
                <option value="blocked">
                  Blocked
                </option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="bg-white border border-gray-200 px-5 py-12 text-center">
              <p className="text-sm text-gray-500">
                Loading feedback...
              </p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="bg-white border border-gray-200 px-5 py-12 text-center">
              <p className="text-sm text-gray-500">
                No feedback found.
              </p>
            </div>
          ) : (
            <div className="bg-white border border-gray-200 divide-y divide-gray-100">
              {filtered.map((item) => (
                <div
                  key={item._id}
                  className="px-5 py-6"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {item.name}
                      </p>

                      <p className="text-xs text-gray-400 mt-1">
                        {item.email}
                      </p>
                    </div>

                    <span
                      className={`w-fit px-2.5 py-1 border text-[10px] font-medium ${statusClass(
                        item.status
                      )}`}
                    >
                      {statusLabel(item.status)}
                    </span>
                  </div>

                  <div className="flex gap-1 mt-4">
                    {[1, 2, 3, 4, 5].map(
                      (star) => (
                        <span
                          key={star}
                          className={
                            star <= item.rating
                              ? "text-[#d9a400]"
                              : "text-gray-200"
                          }
                        >
                          ★
                        </span>
                      )
                    )}
                  </div>

                  <p className="text-sm text-gray-600 leading-7 mt-3 max-w-4xl">
                    {item.message}
                  </p>

                  <p className="text-[11px] text-gray-400 mt-4">
                    {item.createdAt
                      ? new Date(
                          item.createdAt
                        ).toLocaleString()
                      : "—"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Feedback;