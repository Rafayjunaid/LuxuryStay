import {
  useEffect,
  useState
} from "react";

import Sidebar from "./Sidebar";

function Feedback() {

  const [feedback, setFeedback] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [updating, setUpdating] =
    useState("");


  const loadFeedback = async () => {

    try {

      const response = await fetch(
        "http://localhost:5000/api/feedback/admin"
      );

      const data =
        await response.json();

      if (Array.isArray(data)) {
        setFeedback(data);
      }

    } catch (error) {

      console.log(error);

    }

    setLoading(false);

  };


  useEffect(() => {

    loadFeedback();

  }, []);


  const updateStatus = async (
    id,
    status
  ) => {

    setUpdating(id);

    try {

      const response = await fetch(
        `http://localhost:5000/api/feedback/${id}/status`,
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

        alert(data.message);

        setUpdating("");

        return;

      }

      setFeedback(
        (currentFeedback) =>
          currentFeedback.map(
            (item) =>
              item._id === id
                ? {
                    ...item,
                    status
                  }
                : item
          )
      );

    } catch (error) {

      alert(
        "Unable to update feedback"
      );

    }

    setUpdating("");

  };


  const pendingCount =
    feedback.filter(
      (item) =>
        item.status === "pending"
    ).length;


  const activeCount =
    feedback.filter(
      (item) =>
        item.status === "active"
    ).length;


  const blockedCount =
    feedback.filter(
      (item) =>
        item.status === "blocked"
    ).length;


  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#f5f5f3] text-[#171717]">

      <Sidebar />


      <main className="flex-1 min-w-0">

        <div className="px-5 py-6 md:px-8 md:py-8">

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-7">

            <div>

              <p className="text-xs uppercase tracking-[0.18em] text-gray-400 mb-2">
                Guest Relations
              </p>

              <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
                Customer Feedback
              </h1>

              <p className="text-sm text-gray-500 mt-1">
                Review and manage guest feedback
              </p>

            </div>


            <div className="flex flex-wrap items-center gap-5 text-sm">

              <div className="flex items-center gap-2">

                <span className="w-2.5 h-2.5 rounded-full bg-gray-800" />

                <span className="text-gray-600">
                  {activeCount} Published
                </span>

              </div>


              <div className="flex items-center gap-2">

                <span className="w-2.5 h-2.5 rounded-full bg-[#d9a400]" />

                <span className="text-gray-600">
                  {pendingCount} Pending
                </span>

              </div>


              <div className="flex items-center gap-2">

                <span className="w-2.5 h-2.5 rounded-full bg-[#8f1d2c]" />

                <span className="text-gray-600">
                  {blockedCount} Blocked
                </span>

              </div>

            </div>

          </div>


          <div className="border border-gray-200 bg-white">

            <div className="px-5 py-3 border-b border-gray-200 bg-gray-50">

              <div className="flex items-center justify-between">

                <p className="text-xs uppercase tracking-wider font-semibold text-gray-400">
                  Guest Reviews
                </p>

                <p className="text-xs text-gray-400">
                  {feedback.length} total
                </p>

              </div>

            </div>


            {loading ? (

              <div className="px-5 py-14 text-center">

                <div className="w-7 h-7 border-2 border-gray-200 border-t-[#8f1d2c] rounded-full animate-spin mx-auto" />

                <p className="mt-3 text-sm text-gray-500">
                  Loading customer feedback...
                </p>

              </div>

            ) : feedback.length === 0 ? (

              <div className="px-5 py-14 text-center">

                <p className="text-sm font-medium text-gray-700">
                  No feedback available
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  Guest reviews will appear here once submitted.
                </p>

              </div>

            ) : (

              <div>

                {feedback.map((item) => (

                  <article
                    key={item._id}
                    className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50/60 transition"
                  >

                    <div className="px-5 py-5">

                      <div className="grid grid-cols-1 lg:grid-cols-[230px_1fr_180px] gap-5 lg:gap-7">

                        <div>

                          <div className="flex items-center gap-3">

                            {item.userId?.profilePic ? (

                              <img
                                src={`http://localhost:5000${item.userId.profilePic}`}
                                alt={
                                  item.userId.name ||
                                  "Guest"
                                }
                                className="w-10 h-10 rounded-full object-cover border border-gray-200"
                              />

                            ) : (

                              <div className="w-10 h-10 rounded-full bg-[#171717] text-white flex items-center justify-center text-sm font-semibold shrink-0">

                                {(
                                  item.userId?.name ||
                                  item.name ||
                                  "U"
                                )
                                  .charAt(0)
                                  .toUpperCase()}

                              </div>

                            )}


                            <div className="min-w-0">

                              <p className="text-sm font-semibold text-gray-900 truncate">
                                {item.userId?.name ||
                                  item.name ||
                                  "Guest"}
                              </p>

                              <p className="text-xs text-gray-400 truncate mt-0.5">
                                {item.email}
                              </p>

                            </div>

                          </div>


                          <p className="text-xs text-gray-400 mt-3">

                            {new Date(
                              item.createdAt
                            ).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric"
                              }
                            )}

                          </p>

                        </div>


                        <div className="min-w-0">

                          <div className="flex flex-wrap items-center gap-3 mb-2">

                            <div className="flex items-center gap-0.5">

                              {[1, 2, 3, 4, 5].map(
                                (star) => (

                                  <span
                                    key={star}
                                    className={
                                      star <= item.rating
                                        ? "text-[#d9a400] text-base"
                                        : "text-gray-300 text-base"
                                    }
                                  >
                                    ★
                                  </span>

                                )
                              )}

                            </div>


                            <span className="text-xs font-medium text-gray-500">
                              {item.rating}/5
                            </span>

                          </div>


                          <p className="text-sm text-gray-700 leading-6">
                            {item.message}
                          </p>

                        </div>


                        <div className="flex lg:flex-col justify-between lg:justify-start gap-4">

                          <div>

                            <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-1.5">
                              Status
                            </p>


                            <span
                              className={`inline-flex items-center gap-1.5 text-xs font-medium ${
                                item.status === "pending"
                                  ? "text-[#765b00]"
                                  : item.status === "active"
                                  ? "text-gray-700"
                                  : "text-[#8f1d2c]"
                              }`}
                            >

                              <span
                                className={`w-2 h-2 rounded-full ${
                                  item.status === "pending"
                                    ? "bg-[#d9a400]"
                                    : item.status === "active"
                                    ? "bg-gray-700"
                                    : "bg-[#8f1d2c]"
                                }`}
                              />

                              {item.status === "active"
                                ? "Published"
                                : item.status}

                            </span>

                          </div>


                          <div className="flex flex-wrap lg:flex-col gap-2">

                            {item.status !== "active" && (

                              <button
                                disabled={
                                  updating ===
                                  item._id
                                }
                                onClick={() =>
                                  updateStatus(
                                    item._id,
                                    "active"
                                  )
                                }
                                className="px-3 py-2 bg-[#8f1d2c] text-white text-xs font-semibold hover:bg-[#751724] transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                              >
                                {updating ===
                                item._id
                                  ? "Updating..."
                                  : "Approve"}
                              </button>

                            )}


                            {item.status !== "blocked" && (

                              <button
                                disabled={
                                  updating ===
                                  item._id
                                }
                                onClick={() =>
                                  updateStatus(
                                    item._id,
                                    "blocked"
                                  )
                                }
                                className="px-3 py-2 border border-gray-200 bg-white text-gray-600 text-xs font-semibold hover:border-[#8f1d2c] hover:text-[#8f1d2c] transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                              >
                                Block
                              </button>

                            )}

                          </div>

                        </div>

                      </div>

                    </div>

                  </article>

                ))}

              </div>

            )}

          </div>


          {!loading &&
            feedback.length > 0 && (

              <div className="flex items-center justify-between mt-4 text-xs text-gray-400">

                <span>
                  Showing {feedback.length} reviews
                </span>

                <span>
                  Guest feedback management
                </span>

              </div>

            )}

        </div>

      </main>

    </div>
  );
}

export default Feedback;