import {
  useEffect,
  useState
} from "react";

import Sidebar from "./Sidebar";

function Guests() {

  const [guests, setGuests] =
    useState([]);

  const [selectedGuest, setSelectedGuest] =
    useState(null);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);


  const loadGuests = async () => {

    try {

      const response =
        await fetch(
          "http://localhost:5000/api/receptionist/guests"
        );

      const data =
        await response.json();

      if (Array.isArray(data)) {

        setGuests(data);

        setSelectedGuest(
          (current) => {

            if (!current) {
              return null;
            }

            return (
              data.find(
                (guest) =>
                  guest._id ===
                  current._id
              ) || null
            );

          }
        );

      }

    } catch (error) {

      console.log(error);

    }

    setLoading(false);

  };


  useEffect(() => {

    loadGuests();

    const interval =
      setInterval(
        loadGuests,
        10000
      );

    return () =>
      clearInterval(interval);

  }, []);


  const filteredGuests =
    guests.filter((guest) => {

      const value =
        search
          .toLowerCase()
          .trim();

      if (!value) {
        return true;
      }

      return (
        guest.name
          ?.toLowerCase()
          .includes(value) ||

        guest.email
          ?.toLowerCase()
          .includes(value)
      );

    });


  const getSatisfactionClass =
    (satisfaction) => {

      if (
        satisfaction ===
        "Very Satisfied"
      ) {
        return "text-green-700";
      }

      if (
        satisfaction ===
        "Satisfied"
      ) {
        return "text-gray-700";
      }

      if (
        satisfaction ===
        "Neutral"
      ) {
        return "text-[#765b00]";
      }

      if (
        satisfaction ===
        "Dissatisfied" ||
        satisfaction ===
        "Very Dissatisfied"
      ) {
        return "text-[#8f1d2c]";
      }

      return "text-gray-400";

    };


  const getSatisfactionDot =
    (satisfaction) => {

      if (
        satisfaction ===
        "Very Satisfied"
      ) {
        return "bg-green-500";
      }

      if (
        satisfaction ===
        "Satisfied"
      ) {
        return "bg-gray-700";
      }

      if (
        satisfaction ===
        "Neutral"
      ) {
        return "bg-[#d9a400]";
      }

      if (
        satisfaction ===
        "Dissatisfied" ||
        satisfaction ===
        "Very Dissatisfied"
      ) {
        return "bg-[#8f1d2c]";
      }

      return "bg-gray-300";

    };


  const getRatingWidth =
    (rating) => {

      return `${(
        Number(rating) * 20
      )}%`;

    };


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
                Guest Management
              </h1>

              <p className="text-sm text-gray-500 mt-1">
                Guest information, reservations, and satisfaction history
              </p>

            </div>


            <div className="text-sm text-gray-500">

              <span className="font-medium text-gray-800">
                {guests.length}
              </span>{" "}
              registered guests

            </div>

          </div>


          <div className="border border-gray-200 bg-white">

            <div className="px-4 py-3 border-b border-gray-200 flex flex-col md:flex-row gap-3">

              <div className="relative flex-1">

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                >
                  <circle
                    cx="11"
                    cy="11"
                    r="7"
                  />

                  <path d="m20 20-4-4" />

                </svg>


                <input
                  type="text"
                  value={search}
                  onChange={(e) =>
                    setSearch(
                      e.target.value
                    )
                  }
                  placeholder="Search guest name or email"
                  className="w-full h-10 pl-10 pr-3 border border-gray-200 bg-gray-50 text-sm text-gray-700 outline-none focus:border-[#8f1d2c] focus:bg-white"
                />

              </div>

            </div>


            {loading ? (

              <div className="px-5 py-14 text-center">

                <div className="w-7 h-7 border-2 border-gray-200 border-t-[#8f1d2c] rounded-full animate-spin mx-auto" />

                <p className="mt-3 text-sm text-gray-500">
                  Loading guests...
                </p>

              </div>

            ) : filteredGuests.length === 0 ? (

              <div className="px-5 py-14 text-center">

                <p className="text-sm font-medium text-gray-700">
                  No guests found
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  Try changing your search.
                </p>

              </div>

            ) : (

              <div>

                <div className="hidden lg:grid grid-cols-[1fr_130px_120px_160px_90px] gap-4 px-5 py-3 bg-gray-50 border-b border-gray-200 text-[11px] uppercase tracking-wider text-gray-400 font-semibold">

                  <span>Guest</span>

                  <span>Reservations</span>

                  <span>Feedback</span>

                  <span>Satisfaction</span>

                  <span>Rating</span>

                </div>


                {filteredGuests.map(
                  (guest) => (

                    <button
                      key={guest._id}
                      type="button"
                      onClick={() =>
                        setSelectedGuest(
                          guest
                        )
                      }
                      className={`w-full text-left grid grid-cols-1 lg:grid-cols-[1fr_130px_120px_160px_90px] gap-3 lg:gap-4 px-5 py-4 border-b border-gray-100 last:border-b-0 transition cursor-pointer ${
                        selectedGuest?._id ===
                        guest._id
                          ? "bg-[#faf8f6]"
                          : "hover:bg-gray-50/70"
                      }`}
                    >

                      <div className="flex items-center gap-3">

                        {guest.profilePic ? (

                          <img
                            src={`http://localhost:5000${guest.profilePic}`}
                            alt={guest.name}
                            className="w-9 h-9 rounded-full object-cover border border-gray-200 shrink-0"
                          />

                        ) : (

                          <div className="w-9 h-9 rounded-full bg-[#171717] text-white flex items-center justify-center text-xs font-semibold shrink-0">

                            {guest.name
                              ?.charAt(0)
                              .toUpperCase()}

                          </div>

                        )}


                        <div className="min-w-0">

                          <p className="text-sm font-semibold text-gray-900 truncate">
                            {guest.name}
                          </p>

                          <p className="text-xs text-gray-400 truncate mt-0.5">
                            {guest.email}
                          </p>

                        </div>

                      </div>


                      <div>

                        <p className="lg:hidden text-[10px] uppercase tracking-wider text-gray-400 mb-1">
                          Reservations
                        </p>

                        <p className="text-sm text-gray-700">
                          {guest.reservations}
                        </p>

                      </div>


                      <div>

                        <p className="lg:hidden text-[10px] uppercase tracking-wider text-gray-400 mb-1">
                          Feedback
                        </p>

                        <p className="text-sm text-gray-700">
                          {guest.feedbackCount}
                        </p>

                      </div>


                      <div>

                        <p className="lg:hidden text-[10px] uppercase tracking-wider text-gray-400 mb-1">
                          Satisfaction
                        </p>

                        <span
                          className={`inline-flex items-center gap-1.5 text-xs font-medium ${getSatisfactionClass(
                            guest.satisfaction
                          )}`}
                        >

                          <span
                            className={`w-2 h-2 rounded-full ${getSatisfactionDot(
                              guest.satisfaction
                            )}`}
                          />

                          {guest.satisfaction}

                        </span>

                      </div>


                      <div>

                        <p className="lg:hidden text-[10px] uppercase tracking-wider text-gray-400 mb-1">
                          Rating
                        </p>

                        <div className="flex items-center gap-1.5">

                          <span className="text-[#d9a400]">
                            ★
                          </span>

                          <span className="text-sm font-medium text-gray-700">
                            {guest.averageRating
                              ? guest.averageRating
                              : "—"}
                          </span>

                        </div>

                      </div>

                    </button>

                  )
                )}

              </div>

            )}

          </div>


          {selectedGuest && (

            <div className="mt-7 border border-gray-200 bg-white">
<div className="px-5 py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

  <div className="flex items-center gap-3">

    {selectedGuest.profilePic ? (

      <img
        src={`http://localhost:5000${selectedGuest.profilePic}`}
        alt={selectedGuest.name}
        className="w-11 h-11 rounded-full object-cover border border-gray-200"
      />

    ) : (

      <div className="w-11 h-11 rounded-full bg-[#171717] text-white flex items-center justify-center text-sm font-semibold">

        {selectedGuest.name
          ?.charAt(0)
          .toUpperCase()}

      </div>

    )}

    <div>

      <h2 className="text-lg font-semibold text-gray-900">
        {selectedGuest.name}
      </h2>

      <p className="text-xs text-gray-400 mt-0.5">
        {selectedGuest.email}
      </p>

    </div>

  </div>


  <div className="flex items-center gap-4">

    <div
      className={`inline-flex items-center gap-2 text-sm font-medium ${getSatisfactionClass(
        selectedGuest.satisfaction
      )}`}
    >

      <span
        className={`w-2.5 h-2.5 rounded-full ${getSatisfactionDot(
          selectedGuest.satisfaction
        )}`}
      />

      {selectedGuest.satisfaction}

    </div>


    <button
      type="button"
      onClick={() =>
        setSelectedGuest(null)
      }
      className="w-8 h-8 flex items-center justify-center border border-gray-200 text-gray-400 hover:border-[#8f1d2c] hover:text-[#8f1d2c] transition cursor-pointer"
      aria-label="Close guest details"
      title="Close"
    >

      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="w-4 h-4"
      >
        <path d="M6 6l12 12" />
        <path d="M18 6L6 18" />
      </svg>

    </button>

  </div>

</div>


              <div className="grid grid-cols-2 lg:grid-cols-4 border-b border-gray-200">

                <div className="px-5 py-4 border-r border-b lg:border-b-0 border-gray-200">

                  <p className="text-[10px] uppercase tracking-wider text-gray-400">
                    Reservations
                  </p>

                  <p className="text-xl font-semibold text-gray-900 mt-1">
                    {selectedGuest.reservations}
                  </p>

                </div>


                <div className="px-5 py-4 lg:border-r border-b lg:border-b-0 border-gray-200">

                  <p className="text-[10px] uppercase tracking-wider text-gray-400">
                    Feedback
                  </p>

                  <p className="text-xl font-semibold text-gray-900 mt-1">
                    {selectedGuest.feedbackCount}
                  </p>

                </div>


                <div className="px-5 py-4 border-r border-gray-200">

                  <p className="text-[10px] uppercase tracking-wider text-gray-400">
                    Average Rating
                  </p>

                  <div className="flex items-center gap-2 mt-1">

                    <span className="text-xl font-semibold text-gray-900">
                      {selectedGuest.averageRating
                        ? selectedGuest.averageRating
                        : "—"}
                    </span>

                    {selectedGuest.averageRating > 0 && (
                      <span className="text-[#d9a400]">
                        ★
                      </span>
                    )}

                  </div>

                </div>


                <div className="px-5 py-4">

                  <p className="text-[10px] uppercase tracking-wider text-gray-400">
                    Guest Since
                  </p>

                  <p className="text-sm font-medium text-gray-800 mt-2">
                    {new Date(
                      selectedGuest.createdAt
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

              </div>


              <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px]">

                <div className="border-b lg:border-b-0 lg:border-r border-gray-200">

                  <div className="px-5 py-4 border-b border-gray-200">

                    <p className="text-xs uppercase tracking-wider font-semibold text-gray-400">
                      Guest Feedback
                    </p>

                  </div>


                  {selectedGuest.feedback.length === 0 ? (

                    <div className="px-5 py-12 text-center">

                      <p className="text-sm text-gray-500">
                        No active feedback from this guest.
                      </p>

                    </div>

                  ) : (

                    <div className="px-5 py-5 space-y-5">

                      {selectedGuest.feedback.map(
                        (item) => (

                          <div
                            key={item._id}
                            className="flex justify-end"
                          >

                            <div className="max-w-[90%] sm:max-w-[75%]">

                              <div className="flex items-center justify-end gap-2 mb-1.5">

                                <span className="text-[10px] text-gray-400">
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
                                </span>

                                <span className="text-xs font-semibold text-gray-700">
                                  {selectedGuest.name}
                                </span>

                              </div>


                              <div className="border border-gray-200 bg-[#f7f7f5] px-4 py-3">

                                <div className="flex items-center justify-between gap-4 mb-2">

                                  <div className="flex items-center gap-0.5">

                                    {[1, 2, 3, 4, 5].map(
                                      (star) => (

                                        <span
                                          key={star}
                                          className={
                                            star <=
                                            item.rating
                                              ? "text-[#d9a400] text-sm"
                                              : "text-gray-300 text-sm"
                                          }
                                        >
                                          ★
                                        </span>

                                      )
                                    )}

                                  </div>


                                  <span className="text-[10px] font-medium text-gray-400">
                                    {item.rating}/5
                                  </span>

                                </div>


                                <p className="text-sm text-gray-700 leading-6">
                                  {item.message}
                                </p>

                              </div>

                            </div>

                          </div>

                        )
                      )}

                    </div>

                  )}

                </div>


                <div>

                  <div className="px-5 py-4 border-b border-gray-200">

                    <p className="text-xs uppercase tracking-wider font-semibold text-gray-400">
                      Satisfaction
                    </p>

                  </div>


                  <div className="px-5 py-5">

                    <div className="flex items-end justify-between mb-2">

                      <div>

                        <p className="text-2xl font-semibold text-gray-900">
                          {selectedGuest.averageRating
                            ? selectedGuest.averageRating
                            : "—"}
                        </p>

                        <p className="text-xs text-gray-400 mt-1">
                          Average guest rating
                        </p>

                      </div>


                      {selectedGuest.averageRating > 0 && (

                        <span className="text-[#d9a400] text-lg">
                          ★
                        </span>

                      )}

                    </div>


                    <div className="h-2 bg-gray-100 overflow-hidden">

                      <div
                        className="h-full bg-[#d9a400] transition-all"
                        style={{
                          width:
                            getRatingWidth(
                              selectedGuest.averageRating
                            )
                        }}
                      />

                    </div>


                    <div className="flex items-center justify-between mt-3">

                      <span className="text-xs text-gray-400">
                        0
                      </span>

                      <span
                        className={`text-xs font-semibold ${getSatisfactionClass(
                          selectedGuest.satisfaction
                        )}`}
                      >
                        {selectedGuest.satisfaction}
                      </span>

                      <span className="text-xs text-gray-400">
                        5
                      </span>

                    </div>

                  </div>


                  <div className="px-5 py-4 border-t border-gray-200">

                    <p className="text-xs uppercase tracking-wider font-semibold text-gray-400 mb-4">
                      Reservation History
                    </p>


                    {selectedGuest.bookings.length === 0 ? (

                      <p className="text-xs text-gray-400">
                        No reservations found.
                      </p>

                    ) : (

                      <div className="space-y-4">

                        {selectedGuest.bookings.map(
                          (booking) => (

                            <div
                              key={booking._id}
                              className="border-b border-gray-100 last:border-b-0 pb-3 last:pb-0"
                            >

                              <div className="flex items-center justify-between gap-3">

                                <p className="text-sm font-medium text-gray-800">
                                  Room{" "}
                                  {booking.roomId?.roomNumber ||
                                    "—"}
                                </p>

                                <span className="text-[10px] uppercase text-gray-400">
                                  {booking.status}
                                </span>

                              </div>


                              <p className="text-xs text-gray-400 mt-1">
                                {booking.roomId?.roomType ||
                                  "Room"}
                              </p>


                              <p className="text-xs text-gray-500 mt-2">

                                {booking.checkIn
                                  ? new Date(
                                      booking.checkIn
                                    ).toLocaleDateString(
                                      "en-GB",
                                      {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric"
                                      }
                                    )
                                  : "—"}

                                {" → "}

                                {booking.checkOut
                                  ? new Date(
                                      booking.checkOut
                                    ).toLocaleDateString(
                                      "en-GB",
                                      {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric"
                                      }
                                    )
                                  : "—"}

                              </p>

                            </div>

                          )
                        )}

                      </div>

                    )}

                  </div>

                </div>

              </div>

            </div>

          )}


          <div className="flex items-center justify-between mt-4 text-xs text-gray-400">

            <span>
              Showing {filteredGuests.length} of{" "}
              {guests.length} guests
            </span>

            <span>
              Updates automatically
            </span>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Guests;