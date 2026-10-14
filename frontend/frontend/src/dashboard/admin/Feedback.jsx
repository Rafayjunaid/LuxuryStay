import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

function Feedback() {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const fetchFeedback = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/feedback/admin"
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load feedback"
        );
      }

      setFeedback(data);
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/feedback/${id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            status
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to update feedback"
        );
      }

      setFeedback((current) =>
        current.map((item) =>
          item._id === id
            ? {
                ...item,
                status: data.feedback.status
              }
            : item
        )
      );
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const filteredFeedback =
    filter === "all"
      ? feedback
      : feedback.filter(
          (item) => item.status === filter
        );

  const getStatusClass = (status) => {
    if (status === "pending") {
      return "bg-yellow-100 text-yellow-700";
    }

    if (status === "active") {
      return "bg-green-100 text-green-700";
    }

    if (status === "blocked") {
      return "bg-red-100 text-red-700";
    }

    return "bg-gray-100 text-gray-700";
  };

  return (
    <div className="min-h-screen bg-[#f6f6f6] md:flex">

      <Sidebar />

      <main className="flex-1 p-5 md:p-8">

        {/* Header */}
        <div className="mb-8">

          <p className="text-sm text-gray-500">
            Admin / Feedback
          </p>

          <h1 className="text-3xl font-semibold text-gray-900 mt-1">
            Guest Feedback
          </h1>

          <p className="text-gray-500 mt-2">
            Review guest ratings and manage feedback visibility.
          </p>

        </div>


        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">

          <div className="bg-white border border-gray-200 rounded-xl p-5">

            <p className="text-sm text-gray-500">
              Pending
            </p>

            <h2 className="text-2xl font-semibold mt-2 text-yellow-600">
              {
                feedback.filter(
                  (item) =>
                    item.status === "pending"
                ).length
              }
            </h2>

          </div>


          <div className="bg-white border border-gray-200 rounded-xl p-5">

            <p className="text-sm text-gray-500">
              Active
            </p>

            <h2 className="text-2xl font-semibold mt-2 text-green-600">
              {
                feedback.filter(
                  (item) =>
                    item.status === "active"
                ).length
              }
            </h2>

          </div>


          <div className="bg-white border border-gray-200 rounded-xl p-5">

            <p className="text-sm text-gray-500">
              Blocked
            </p>

            <h2 className="text-2xl font-semibold mt-2 text-red-600">
              {
                feedback.filter(
                  (item) =>
                    item.status === "blocked"
                ).length
              }
            </h2>

          </div>

        </div>


        {/* Filter */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-5">

          <div className="flex flex-wrap gap-2">

            {[
              ["all", "All"],
              ["pending", "Pending"],
              ["active", "Active"],
              ["blocked", "Blocked"]
            ].map(([value, label]) => (

              <button
                key={value}
                type="button"
                onClick={() => setFilter(value)}
                className={`px-4 py-2 rounded-lg text-sm transition ${
                  filter === value
                    ? "bg-[#8f1d2c] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {label}
              </button>

            ))}

          </div>

        </div>


        {/* Feedback table */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">

          {loading ? (

            <div className="p-10 text-center text-gray-500">
              Loading feedback...
            </div>

          ) : filteredFeedback.length === 0 ? (

            <div className="p-10 text-center text-gray-500">
              No feedback found.
            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full text-sm">

                <thead className="bg-[#171717] text-white">

                  <tr>

                    <th className="text-left px-5 py-4">
                      Guest
                    </th>

                    <th className="text-left px-5 py-4">
                      Rating
                    </th>

                    <th className="text-left px-5 py-4">
                      Feedback
                    </th>

                    <th className="text-left px-5 py-4">
                      Date
                    </th>

                    <th className="text-left px-5 py-4">
                      Status
                    </th>

                    <th className="text-left px-5 py-4">
                      Update
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {filteredFeedback.map(
                    (item) => (

                      <tr
                        key={item._id}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >

                        <td className="px-5 py-4">

                          <p className="font-medium text-gray-900">
                            {item.name}
                          </p>

                          <p className="text-xs text-gray-500">
                            {item.email}
                          </p>

                        </td>


                        <td className="px-5 py-4">

                          <div className="flex items-center gap-1">

                            <span className="text-yellow-500 text-lg">
                              ★
                            </span>

                            <span className="font-semibold">
                              {item.rating}/5
                            </span>

                          </div>

                        </td>


                        <td className="px-5 py-4 max-w-md">

                          <p className="text-gray-700">
                            {item.message}
                          </p>

                        </td>


                        <td className="px-5 py-4 text-gray-500">

                          {item.createdAt
                            ? new Date(
                                item.createdAt
                              ).toLocaleDateString()
                            : "-"}

                        </td>


                        <td className="px-5 py-4">

                          <span
                            className={`px-3 py-1 rounded-full text-xs ${getStatusClass(
                              item.status
                            )}`}
                          >
                            {item.status}
                          </span>

                        </td>


                        <td className="px-5 py-4">

                          <select
                            value={item.status}
                            onChange={(e) =>
                              updateStatus(
                                item._id,
                                e.target.value
                              )
                            }
                            className="border border-gray-300 rounded-lg px-3 py-2 bg-white outline-none focus:border-[#8f1d2c]"
                          >

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

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </main>

    </div>
  );
}

export default Feedback;