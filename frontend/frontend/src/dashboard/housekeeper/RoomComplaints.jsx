import {
  useEffect,
  useState
} from "react";

import Sidebar from "./Sidebar";

function RoomComplaints() {

  const [complaints, setComplaints] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [message, setMessage] =
    useState("");

  const [messageType, setMessageType] =
    useState("success");

  const loadComplaints =
    async () => {

      try {

        const response =
          await fetch(
            "http://localhost:5000/api/complaints"
          );

        const data =
          await response.json();

        if (!response.ok) {

          setMessage(
            data.message ||
            "Unable to load complaints."
          );

          setMessageType(
            "error"
          );

          setLoading(false);

          return;
        }

        setComplaints(
          Array.isArray(data)
            ? data
            : []
        );

      } catch (error) {

        console.log(error);

        setMessage(
          "Unable to connect to the server."
        );

        setMessageType(
          "error"
        );

      }

      setLoading(false);
    };

  useEffect(() => {

    loadComplaints();

  }, []);

  const updateStatus =
    async (
      id,
      status
    ) => {

      try {

        const response =
          await fetch(
            `http://localhost:5000/api/complaints/${id}/status`,
            {
              method: "PUT",

              headers: {
                "Content-Type":
                  "application/json"
              },

              body: JSON.stringify({
                status
              })
            }
          );

        const data =
          await response.json();

        if (!response.ok) {

          setMessage(
            data.message ||
            "Unable to update complaint."
          );

          setMessageType(
            "error"
          );

          return;
        }

        setComplaints(
          (previous) =>
            previous.map(
              (item) =>
                item._id === id
                  ? data.complaint
                  : item
            )
        );

        setMessage(
          "Complaint status updated successfully."
        );

        setMessageType(
          "success"
        );

      } catch (error) {

        console.log(error);

        setMessage(
          "Unable to update complaint."
        );

        setMessageType(
          "error"
        );

      }
    };

  const statusStyle =
    (status) => {

      if (
        status === "resolved"
      ) {
        return "text-green-700 bg-green-50 border-green-200";
      }

      if (
        status === "in_progress"
      ) {
        return "text-blue-700 bg-blue-50 border-blue-200";
      }

      return "text-amber-700 bg-amber-50 border-amber-200";
    };

  const statusLabel =
    (status) => {

      if (
        status === "in_progress"
      ) {
        return "In Progress";
      }

      if (
        status === "resolved"
      ) {
        return "Resolved";
      }

      return "Pending";
    };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#f5f5f3]">

      <Sidebar />

      <main className="flex-1 min-w-0">

        <div className="px-5 py-6 md:px-8 md:py-8">

          <div className="mb-7">

            <p className="text-xs uppercase tracking-[0.18em] text-gray-400 mb-2">
              Housekeeping
            </p>

            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
              Room Complaints
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Review guest complaints and update room issue status
            </p>

          </div>

          {message && (

            <div
              className={`mb-5 px-4 py-3 border text-sm ${
                messageType === "error"
                  ? "border-red-200 bg-red-50 text-red-700"
                  : "border-green-200 bg-green-50 text-green-700"
              }`}
            >
              {message}
            </div>

          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">

            <div className="bg-white border border-amber-200 px-5 py-4">

              <p className="text-[10px] uppercase tracking-[0.14em] text-amber-600">
                Pending
              </p>

              <p className="text-xl font-semibold text-gray-900 mt-2">
                {
                  complaints.filter(
                    (item) =>
                      item.status === "pending"
                  ).length
                }
              </p>

            </div>

            <div className="bg-white border border-blue-200 px-5 py-4">

              <p className="text-[10px] uppercase tracking-[0.14em] text-blue-600">
                In Progress
              </p>

              <p className="text-xl font-semibold text-gray-900 mt-2">
                {
                  complaints.filter(
                    (item) =>
                      item.status === "in_progress"
                  ).length
                }
              </p>

            </div>

            <div className="bg-white border border-green-200 px-5 py-4">

              <p className="text-[10px] uppercase tracking-[0.14em] text-green-600">
                Resolved
              </p>

              <p className="text-xl font-semibold text-gray-900 mt-2">
                {
                  complaints.filter(
                    (item) =>
                      item.status === "resolved"
                  ).length
                }
              </p>

            </div>

          </div>

          <div className="border border-gray-200 bg-white">

            <div className="px-5 py-4 border-b border-gray-200">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-[10px] uppercase tracking-[0.16em] text-gray-400">
                    Operations
                  </p>

                  <h2 className="text-lg font-semibold text-gray-900 mt-1">
                    Complaint Log
                  </h2>

                </div>

                <span className="text-xs text-gray-400">
                  {complaints.length}{" "}
                  {complaints.length === 1
                    ? "Complaint"
                    : "Complaints"}
                </span>

              </div>

            </div>

            {loading ? (

              <div className="px-5 py-12 text-center">

                <p className="text-sm text-gray-500">
                  Loading complaints...
                </p>

              </div>

            ) : complaints.length === 0 ? (

              <div className="px-5 py-12 text-center">

                <p className="text-sm font-medium text-gray-700">
                  No room complaints
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  Complaints submitted by reception will appear here.
                </p>

              </div>

            ) : (

              <div className="overflow-x-auto">

                <table className="w-full min-w-[900px]">

                  <thead>

                    <tr className="border-b border-gray-200 bg-gray-50">

                      <th className="text-left px-5 py-3 text-[10px] uppercase tracking-[0.12em] text-gray-400 font-medium">
                        Room
                      </th>

                      <th className="text-left px-5 py-3 text-[10px] uppercase tracking-[0.12em] text-gray-400 font-medium">
                        Guest
                      </th>

                      <th className="text-left px-5 py-3 text-[10px] uppercase tracking-[0.12em] text-gray-400 font-medium">
                        Complaint
                      </th>

                      <th className="text-left px-5 py-3 text-[10px] uppercase tracking-[0.12em] text-gray-400 font-medium">
                        Reported
                      </th>

                      <th className="text-left px-5 py-3 text-[10px] uppercase tracking-[0.12em] text-gray-400 font-medium">
                        Status
                      </th>

                      <th className="text-right px-5 py-3 text-[10px] uppercase tracking-[0.12em] text-gray-400 font-medium">
                        Update
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {complaints.map(
                      (item) => (

                        <tr
                          key={
                            item._id
                          }
                          className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50/70"
                        >

                          <td className="px-5 py-4">

                            <span className="text-sm font-semibold text-gray-900">
                              Room{" "}
                              {
                                item.roomNumber
                              }
                            </span>

                          </td>

                          <td className="px-5 py-4">

                            <span className="text-sm text-gray-700">
                              {
                                item.guestName
                              }
                            </span>

                          </td>

                          <td className="px-5 py-4 max-w-[320px]">

                            <p className="text-sm text-gray-600 leading-5">
                              {
                                item.complaint
                              }
                            </p>

                          </td>

                          <td className="px-5 py-4">

                            <span className="text-xs text-gray-400 whitespace-nowrap">
                              {item.createdAt
                                ? new Date(
                                    item.createdAt
                                  ).toLocaleString()
                                : "—"}
                            </span>

                          </td>

                          <td className="px-5 py-4">

                            <span
                              className={`inline-flex px-2.5 py-1 border text-[11px] font-medium ${statusStyle(
                                item.status
                              )}`}
                            >
                              {
                                statusLabel(
                                  item.status
                                )
                              }
                            </span>

                          </td>

                          <td className="px-5 py-4">

                            <div className="flex justify-end">

                              <select
                                value={
                                  item.status
                                }
                                onChange={(e) =>
                                  updateStatus(
                                    item._id,
                                    e.target.value
                                  )
                                }
                                className="h-9 px-3 border border-gray-200 bg-white text-xs text-gray-700 outline-none focus:border-[#8f1d2c] cursor-pointer"
                              >

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

                          </td>

                        </tr>

                      )
                    )}

                  </tbody>

                </table>

              </div>

            )}

          </div>

        </div>

      </main>

    </div>
  );
}

export default RoomComplaints;