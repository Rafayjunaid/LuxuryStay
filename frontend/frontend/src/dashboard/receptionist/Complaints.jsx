import {
  useEffect,
  useState
} from "react";

import Sidebar from "./Sidebar";

function Complaints() {

  const [rooms, setRooms] =
    useState([]);

  const [complaints, setComplaints] =
    useState([]);

  const [roomId, setRoomId] =
    useState("");

  const [guestName, setGuestName] =
    useState("");

  const [complaint, setComplaint] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [submitting, setSubmitting] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [messageType, setMessageType] =
    useState("success");

  const loadData =
    async () => {

      try {

        const [
          roomsResponse,
          complaintsResponse
        ] = await Promise.all([
          fetch(
            "http://localhost:5000/api/rooms"
          ),
          fetch(
            "http://localhost:5000/api/complaints"
          )
        ]);

        const roomsData =
          await roomsResponse.json();

        const complaintsData =
          await complaintsResponse.json();

        if (roomsResponse.ok) {
          setRooms(
            Array.isArray(roomsData)
              ? roomsData
              : roomsData.rooms || []
          );
        }

        if (complaintsResponse.ok) {
          setComplaints(
            Array.isArray(
              complaintsData
            )
              ? complaintsData
              : []
          );
        }

      } catch (error) {

        console.log(error);

        setMessage(
          "Unable to load complaint data."
        );

        setMessageType(
          "error"
        );

      }

      setLoading(false);
    };

  useEffect(() => {

    loadData();

  }, []);

  const submitComplaint =
    async (e) => {

      e.preventDefault();

      setMessage("");

      if (
        !roomId ||
        !guestName.trim() ||
        !complaint.trim()
      ) {

        setMessage(
          "Please complete all fields."
        );

        setMessageType(
          "error"
        );

        return;
      }

      setSubmitting(true);

      try {

        const response =
          await fetch(
            "http://localhost:5000/api/complaints",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json"
              },

              body: JSON.stringify({
                roomId,
                guestName,
                complaint
              })
            }
          );

        const data =
          await response.json();

        if (!response.ok) {

          setMessage(
            data.message ||
            "Unable to submit complaint."
          );

          setMessageType(
            "error"
          );

          setSubmitting(false);

          return;
        }

        setMessage(
          "Complaint submitted successfully."
        );

        setMessageType(
          "success"
        );

        setRoomId("");
        setGuestName("");
        setComplaint("");

        await loadData();

      } catch (error) {

        console.log(error);

        setMessage(
          "Unable to connect to the server."
        );

        setMessageType(
          "error"
        );

      }

      setSubmitting(false);
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

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#f5f5f3]">

      <Sidebar />

      <main className="flex-1 min-w-0">

        <div className="px-5 py-6 md:px-8 md:py-8">

          <div className="mb-7">

            <p className="text-xs uppercase tracking-[0.18em] text-gray-400 mb-2">
              Reception
            </p>

            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
              Guest Complaints
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Record guest complaints reported at the front desk
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

          <div className="grid grid-cols-1 xl:grid-cols-[380px_1fr] gap-5">

            <div className="border border-gray-200 bg-white h-fit">

              <div className="px-5 py-4 border-b border-gray-200">

                <p className="text-[10px] uppercase tracking-[0.16em] text-gray-400">
                  Front Desk
                </p>

                <h2 className="text-lg font-semibold text-gray-900 mt-1">
                  New Complaint
                </h2>

              </div>

              <form
                onSubmit={
                  submitComplaint
                }
                className="p-5"
              >

                <div>

                  <label className="block text-xs text-gray-500 mb-1.5">
                    Room
                  </label>

                  <select
                    value={roomId}
                    onChange={(e) =>
                      setRoomId(
                        e.target.value
                      )
                    }
                    className="w-full h-10 px-3 border border-gray-200 bg-gray-50 text-sm text-gray-700 outline-none focus:border-[#8f1d2c] focus:bg-white"
                  >

                    <option value="">
                      Select room
                    </option>

                    {rooms.map(
                      (room) => (
                        <option
                          key={
                            room._id
                          }
                          value={
                            room._id
                          }
                        >
                          Room{" "}
                          {
                            room.roomNumber
                          }
                          {" - "}
                          {
                            room.roomType
                          }
                        </option>
                      )
                    )}

                  </select>

                </div>

                <div className="mt-4">

                  <label className="block text-xs text-gray-500 mb-1.5">
                    Guest Name
                  </label>

                  <input
                    type="text"
                    value={
                      guestName
                    }
                    onChange={(e) =>
                      setGuestName(
                        e.target.value
                      )
                    }
                    placeholder="Enter guest name"
                    className="w-full h-10 px-3 border border-gray-200 bg-gray-50 text-sm text-gray-700 outline-none focus:border-[#8f1d2c] focus:bg-white"
                  />

                </div>

                <div className="mt-4">

                  <label className="block text-xs text-gray-500 mb-1.5">
                    Complaint
                  </label>

                  <textarea
                    value={
                      complaint
                    }
                    onChange={(e) =>
                      setComplaint(
                        e.target.value
                      )
                    }
                    placeholder="Describe the guest complaint..."
                    rows="6"
                    className="w-full px-3 py-3 border border-gray-200 bg-gray-50 text-sm text-gray-700 outline-none resize-none focus:border-[#8f1d2c] focus:bg-white"
                  />

                </div>

                <button
                  type="submit"
                  disabled={
                    submitting
                  }
                  className="w-full h-11 mt-5 bg-[#8f1d2c] text-white text-sm font-medium hover:bg-[#751722] disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
                >
                  {submitting
                    ? "Submitting..."
                    : "Submit Complaint"}
                </button>

              </form>

            </div>

            <div className="border border-gray-200 bg-white">

              <div className="px-5 py-4 border-b border-gray-200">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-[10px] uppercase tracking-[0.16em] text-gray-400">
                      Complaint Log
                    </p>

                    <h2 className="text-lg font-semibold text-gray-900 mt-1">
                      Guest Complaints
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

                <div className="px-5 py-10 text-center">

                  <p className="text-sm text-gray-500">
                    Loading complaints...
                  </p>

                </div>

              ) : complaints.length === 0 ? (

                <div className="px-5 py-12 text-center">

                  <p className="text-sm font-medium text-gray-700">
                    No complaints recorded
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    New guest complaints will appear here.
                  </p>

                </div>

              ) : (

                <div className="divide-y divide-gray-100">

                  {complaints.map(
                    (item) => (

                      <div
                        key={
                          item._id
                        }
                        className="px-5 py-5"
                      >

                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">

                          <div className="min-w-0">

                            <div className="flex flex-wrap items-center gap-2">

                              <span className="text-sm font-semibold text-gray-900">
                                Room{" "}
                                {
                                  item.roomNumber
                                }
                              </span>

                              <span className="text-xs text-gray-400">
                                •
                              </span>

                              <span className="text-sm text-gray-700">
                                {
                                  item.guestName
                                }
                              </span>

                            </div>

                            <p className="text-sm text-gray-600 mt-2 leading-6">
                              {
                                item.complaint
                              }
                            </p>

                            <p className="text-[11px] text-gray-400 mt-3">
                              {item.createdAt
                                ? new Date(
                                    item.createdAt
                                  ).toLocaleString()
                                : "—"}
                            </p>

                          </div>

                          <div className="flex items-center">

                            <span
                              className={`inline-flex px-2.5 py-1 border text-[11px] font-medium capitalize ${statusStyle(
                                item.status
                              )}`}
                            >
                              {item.status.replace(
                                "_",
                                " "
                              )}
                            </span>

                          </div>

                        </div>

                      </div>

                    )
                  )}

                </div>

              )}

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Complaints;