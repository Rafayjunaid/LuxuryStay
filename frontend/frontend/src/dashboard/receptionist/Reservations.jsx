    import {
      useEffect,
      useState
    } from "react";

    import {
      useNavigate
    } from "react-router-dom";

    import Sidebar from "./Sidebar";

    function Reservations() {

      const navigate = useNavigate();

      const [reservations, setReservations] =
        useState([]);

      const [search, setSearch] =
        useState("");

      const [statusFilter, setStatusFilter] =
        useState("all");

      const [loading, setLoading] =
        useState(true);

      const [selectedReservation, setSelectedReservation] =
        useState(null);

      const [guestName, setGuestName] =
        useState("");

      const [guestEmail, setGuestEmail] =
        useState("");

      const [message, setMessage] =
        useState("");

      const [processing, setProcessing] =
        useState(false);

      const loadReservations =
        async () => {

          try {

            const response =
              await fetch(
                "http://localhost:5000/api/receptionist/reservations"
              );

            const data =
              await response.json();

            if (Array.isArray(data)) {
              setReservations(data);
            }

          } catch (error) {

            console.log(error);

          }

          setLoading(false);

        };

      useEffect(() => {

        loadReservations();

        const interval =
          setInterval(
            loadReservations,
            10000
          );

        return () =>
          clearInterval(interval);

      }, []);

      const filteredReservations =
        reservations.filter(
          (reservation) => {

            const value =
              search
                .toLowerCase()
                .trim();

            const matchesSearch =
              reservation.bookingId
                ?.toLowerCase()
                .includes(value) ||

              reservation.user?.name
                ?.toLowerCase()
                .includes(value) ||

              reservation.user?.email
                ?.toLowerCase()
                .includes(value) ||

              reservation.room?.roomNumber
                ?.toString()
                .toLowerCase()
                .includes(value) ||

              reservation.room?.roomType
                ?.toLowerCase()
                .includes(value);

            const matchesStatus =
              statusFilter === "all" ||
              reservation.status ===
                statusFilter;

            return (
              matchesSearch &&
              matchesStatus
            );

          }
        );

      const pendingCount =
        reservations.filter(
          (item) =>
            item.status === "pending"
        ).length;

      const confirmedCount =
        reservations.filter(
          (item) =>
            item.status === "confirmed"
        ).length;

      const occupiedCount =
        reservations.filter(
          (item) =>
            item.status === "occupied"
        ).length;

      const completedCount =
        reservations.filter(
          (item) =>
            item.status === "completed"
        ).length;

      const openReservation =
        (reservation) => {

          setSelectedReservation(
            reservation
          );

          setGuestName("");

          setGuestEmail("");

          setMessage("");

        };

      const closeReservation =
        () => {

          setSelectedReservation(null);

          setGuestName("");

          setGuestEmail("");

          setMessage("");

        };

      const occupyReservation =
        async () => {

          if (
            !guestName.trim() ||
            !guestEmail.trim()
          ) {

            setMessage(
              "Enter the guest name and email to verify the reservation."
            );

            return;

          }

          setProcessing(true);

          setMessage("");

          try {

            const response =
              await fetch(
                `http://localhost:5000/api/receptionist/reservations/${selectedReservation._id}/occupy`,
                {
                  method: "PUT",

                  headers: {
                    "Content-Type":
                      "application/json"
                  },

                  body: JSON.stringify({
                    name:
                      guestName,

                    email:
                      guestEmail
                  })
                }
              );

            const data =
              await response.json();

            if (!response.ok) {

              setMessage(
                data.message ||
                "Unable to verify guest."
              );

              setProcessing(false);

              return;

            }

            setMessage(
              "Guest verified successfully. Reservation is now occupied."
            );

            await loadReservations();

            setTimeout(() => {

              closeReservation();

            }, 900);

          } catch (error) {

            setMessage(
              "Something went wrong while verifying the reservation."
            );

          }

          setProcessing(false);

        };

      const openCheckout =
        (reservation) => {

          navigate(
            `/dashboard/receptionist/billing?booking=${reservation._id}`
          );

        };

      const openInvoice =
        async (reservation) => {

          if (
            !reservation.invoiceNumber
          ) {

            setMessage(
              "Invoice is not available for this reservation."
            );

            return;

          }

          navigate(
            `/dashboard/receptionist/invoices/${reservation.invoiceNumber}`
          );

        };

      const getStatusClass =
        (status) => {

          if (
            status === "occupied"
          ) {
            return "text-[#8f1d2c]";
          }

          if (
            status === "confirmed"
          ) {
            return "text-green-700";
          }

          if (
            status === "pending"
          ) {
            return "text-[#b27b00]";
          }

          if (
            status === "completed"
          ) {
            return "text-blue-700";
          }

          if (
            status === "cancelled"
          ) {
            return "text-gray-500";
          }

          return "text-gray-500";

        };

      const getStatusDot =
        (status) => {

          if (
            status === "occupied"
          ) {
            return "bg-[#8f1d2c]";
          }

          if (
            status === "confirmed"
          ) {
            return "bg-green-500";
          }

          if (
            status === "pending"
          ) {
            return "bg-[#d9a400]";
          }

          if (
            status === "completed"
          ) {
            return "bg-blue-500";
          }

          if (
            status === "cancelled"
          ) {
            return "bg-gray-400";
          }

          return "bg-gray-400";

        };

      return (
        <div className="min-h-screen flex flex-col md:flex-row bg-[#f5f5f3]">

          <Sidebar />

          <main className="flex-1 min-w-0">

            <div className="px-5 py-6 md:px-8 md:py-8">

              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-7">

                <div>

                  <p className="text-xs uppercase tracking-[0.18em] text-gray-400 mb-2">
                    Reception
                  </p>

                  <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
                    Reservation Management
                  </h1>

                  <p className="text-sm text-gray-500 mt-1">
                    Search reservations, check in guests and manage departures
                  </p>

                </div>

                <div className="flex flex-wrap items-center gap-5 text-sm">

                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#d9a400]" />
                    <span className="text-gray-600">
                      {pendingCount} Pending
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-gray-600">
                      {confirmedCount} Confirmed
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#8f1d2c]" />
                    <span className="text-gray-600">
                      {occupiedCount} Occupied
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    <span className="text-gray-600">
                      {completedCount} Completed
                    </span>
                  </div>

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
                      placeholder="Search booking, guest, email or room"
                      className="w-full h-10 pl-10 pr-3 border border-gray-200 bg-gray-50 text-sm text-gray-700 outline-none focus:border-[#8f1d2c] focus:bg-white"
                    />

                  </div>

                  <select
                    value={statusFilter}
                    onChange={(e) =>
                      setStatusFilter(
                        e.target.value
                      )
                    }
                    className="h-10 px-3 border border-gray-200 bg-gray-50 text-sm text-gray-700 outline-none focus:border-[#8f1d2c]"
                  >

                    <option value="all">
                      All Reservations
                    </option>

                    <option value="pending">
                      Pending
                    </option>

                    <option value="confirmed">
                      Confirmed
                    </option>

                    <option value="occupied">
                      Occupied
                    </option>

                    <option value="completed">
                      Completed
                    </option>

                    <option value="cancelled">
                      Cancelled
                    </option>

                  </select>

                </div>

                {loading ? (

                  <div className="px-5 py-12 text-center text-sm text-gray-500">
                    Loading reservations...
                  </div>

                ) : filteredReservations.length === 0 ? (

                  <div className="px-5 py-12 text-center">

                    <p className="text-sm font-medium text-gray-700">
                      No reservations found
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                      Try changing your search or filter.
                    </p>

                  </div>

                ) : (

                  <>

                    <div className="hidden lg:grid grid-cols-[120px_1fr_100px_130px_130px_120px_110px] gap-4 px-5 py-3 bg-gray-50 border-b border-gray-200 text-[11px] uppercase tracking-wider text-gray-400 font-semibold">

                      <span>Booking</span>

                      <span>Guest</span>

                      <span>Room</span>

                      <span>Check In</span>

                      <span>Check Out</span>

                      <span>Status</span>

                      <span>Action</span>

                    </div>

                    {filteredReservations.map(
                      (reservation) => (

                        <div
                          key={
                            reservation._id
                          }
                          className="grid grid-cols-1 lg:grid-cols-[120px_1fr_100px_130px_130px_120px_110px] gap-3 lg:gap-4 px-5 py-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50/70 transition"
                        >

                          <div>

                            <p className="lg:hidden text-[10px] uppercase tracking-wider text-gray-400 mb-1">
                              Booking
                            </p>

                            <p className="text-sm font-semibold text-gray-900">
                              {
                                reservation.bookingId
                              }
                            </p>

                          </div>

                          <div className="min-w-0">

                            <p className="lg:hidden text-[10px] uppercase tracking-wider text-gray-400 mb-1">
                              Guest
                            </p>

                            <p className="text-sm font-medium text-gray-800 truncate">
                              {
                                reservation.user?.name ||
                                "Unknown Guest"
                              }
                            </p>

                            <p className="text-xs text-gray-400 mt-0.5 truncate">
                              {
                                reservation.user?.email ||
                                "No email available"
                              }
                            </p>

                          </div>

                          <div>

                            <p className="lg:hidden text-[10px] uppercase tracking-wider text-gray-400 mb-1">
                              Room
                            </p>

                            <p className="text-sm font-medium text-gray-800">
                              {
                                reservation.room?.roomNumber ||
                                "—"
                              }
                            </p>

                            <p className="text-xs text-gray-400 mt-0.5">
                              {
                                reservation.room?.roomType ||
                                ""
                              }
                            </p>

                          </div>

                          <div>

                            <p className="lg:hidden text-[10px] uppercase tracking-wider text-gray-400 mb-1">
                              Check In
                            </p>

                            <p className="text-sm text-gray-700">
                              {
                                reservation.checkIn
                                  ? new Date(
                                      reservation.checkIn
                                    ).toLocaleDateString()
                                  : "—"
                              }
                            </p>

                          </div>

                          <div>

                            <p className="lg:hidden text-[10px] uppercase tracking-wider text-gray-400 mb-1">
                              Check Out
                            </p>

                            <p className="text-sm text-gray-700">
                              {
                                reservation.checkOut
                                  ? new Date(
                                      reservation.checkOut
                                    ).toLocaleDateString()
                                  : "—"
                              }
                            </p>

                          </div>

                          <div>

                            <p className="lg:hidden text-[10px] uppercase tracking-wider text-gray-400 mb-1">
                              Status
                            </p>

                            <span
                              className={`inline-flex items-center gap-1.5 text-xs font-medium capitalize ${getStatusClass(
                                reservation.status
                              )}`}
                            >

                              <span
                                className={`w-2 h-2 rounded-full ${getStatusDot(
                                  reservation.status
                                )}`}
                              />

                              {
                                reservation.status
                              }

                            </span>

                          </div>

                          <div>

                            <p className="lg:hidden text-[10px] uppercase tracking-wider text-gray-400 mb-1">
                              Action
                            </p>

                            {(
                              reservation.status ===
                                "pending" ||
                              reservation.status ===
                                "confirmed"
                            ) ? (

                              <button
                                type="button"
                                onClick={() =>
                                  openReservation(
                                    reservation
                                  )
                                }
                                className="text-xs font-medium text-[#8f1d2c] hover:text-[#6f1522] cursor-pointer"
                              >
                                Check In →
                              </button>

                            ) : reservation.status ===
                              "occupied" ? (

                              <button
                                type="button"
                                onClick={() =>
                                  openCheckout(
                                    reservation
                                  )
                                }
                                className="text-xs font-medium text-[#8f1d2c] hover:text-[#6f1522] cursor-pointer"
                              >
                                Check Out →
                              </button>

                            ) : reservation.status ===
                              "completed" ? (

                              <button
                                type="button"
                                onClick={() =>
                                  openInvoice(
                                    reservation
                                  )
                                }
                                className="text-xs font-medium text-blue-700 hover:text-blue-900 cursor-pointer"
                              >
                                Invoice →
                              </button>

                            ) : (

                              <span className="text-xs text-gray-400">
                                —
                              </span>

                            )}

                          </div>

                        </div>

                      )
                    )}

                  </>

                )}

              </div>

              <div className="flex items-center justify-between mt-4 text-xs text-gray-400">

                <span>
                  Showing{" "}
                  {
                    filteredReservations.length
                  }{" "}
                  of{" "}
                  {
                    reservations.length
                  }{" "}
                  reservations
                </span>

                <span>
                  Updates automatically
                </span>

              </div>

            </div>

          </main>

          {selectedReservation && (

            <div className="fixed inset-0 z-50 bg-black/45 flex items-center justify-center p-4">

              <div className="w-full max-w-lg bg-white border border-gray-200">

                <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">

                  <div>

                    <p className="text-[10px] uppercase tracking-[0.16em] text-gray-400">
                      Guest Check-In
                    </p>

                    <h2 className="text-lg font-semibold text-gray-900 mt-1">
                      Verify Reservation
                    </h2>

                  </div>

                  <button
                    type="button"
                    onClick={
                      closeReservation
                    }
                    className="w-8 h-8 flex items-center justify-center border border-gray-200 text-gray-400 hover:border-[#8f1d2c] hover:text-[#8f1d2c] transition cursor-pointer"
                    aria-label="Close"
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

                <div className="p-5">

                  <div className="border border-gray-200 bg-gray-50 px-4 py-4 mb-5">

                    <div className="grid grid-cols-2 gap-4">

                      <div>

                        <p className="text-[10px] uppercase tracking-wider text-gray-400">
                          Booking
                        </p>

                        <p className="text-sm font-semibold text-gray-800 mt-1">
                          {
                            selectedReservation.bookingId
                          }
                        </p>

                      </div>

                      <div>

                        <p className="text-[10px] uppercase tracking-wider text-gray-400">
                          Room
                        </p>

                        <p className="text-sm font-semibold text-gray-800 mt-1">
                          {
                            selectedReservation.room?.roomNumber ||
                            "—"
                          }
                        </p>

                      </div>

                      <div>

                        <p className="text-[10px] uppercase tracking-wider text-gray-400">
                          Reserved Guest
                        </p>

                        <p className="text-sm font-medium text-gray-800 mt-1">
                          {
                            selectedReservation.user?.name ||
                            "Unknown"
                          }
                        </p>

                      </div>

                      <div>

                        <p className="text-[10px] uppercase tracking-wider text-gray-400">
                          Reservation Email
                        </p>

                        <p className="text-sm text-gray-600 mt-1 break-all">
                          {
                            selectedReservation.user?.email ||
                            "Unknown"
                          }
                        </p>

                      </div>

                    </div>

                  </div>

                  <div className="mb-5">

                    <p className="text-xs uppercase tracking-wider text-gray-400 mb-3">
                      Guest Verification
                    </p>

                    <div className="space-y-3">

                      <div>

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
                          placeholder="Enter guest's name"
                          className="w-full h-10 px-3 border border-gray-200 bg-gray-50 text-sm text-gray-700 outline-none focus:border-[#8f1d2c] focus:bg-white"
                        />

                      </div>

                      <div>

                        <label className="block text-xs text-gray-500 mb-1.5">
                          Guest Email
                        </label>

                        <input
                          type="email"
                          value={
                            guestEmail
                          }
                          onChange={(e) =>
                            setGuestEmail(
                              e.target.value
                            )
                          }
                          placeholder="Enter guest's email"
                          className="w-full h-10 px-3 border border-gray-200 bg-gray-50 text-sm text-gray-700 outline-none focus:border-[#8f1d2c] focus:bg-white"
                        />

                      </div>

                    </div>

                  </div>

                  {message && (

                    <div
                      className={`mb-4 px-3 py-3 text-xs border ${
                        message.includes(
                          "successfully"
                        )
                          ? "border-green-200 bg-green-50 text-green-700"
                          : "border-red-200 bg-red-50 text-red-700"
                      }`}
                    >
                      {message}
                    </div>

                  )}

                  <div className="flex flex-col sm:flex-row gap-3">

                    <button
                      type="button"
                      onClick={
                        closeReservation
                      }
                      className="flex-1 h-10 border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition cursor-pointer"
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      onClick={
                        occupyReservation
                      }
                      disabled={
                        processing
                      }
                      className="flex-1 h-10 bg-[#8f1d2c] text-white text-sm font-medium hover:bg-[#751722] disabled:opacity-50 transition cursor-pointer"
                    >
                      {
                        processing
                          ? "Verifying..."
                          : "Verify & Mark Occupied"
                      }
                    </button>

                  </div>

                </div>

              </div>

            </div>

          )}

        </div>
      );
    }

    export default Reservations;