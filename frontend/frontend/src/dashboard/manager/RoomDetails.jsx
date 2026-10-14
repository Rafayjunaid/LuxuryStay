import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";

function RoomDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadRoom = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/manager/rooms/${id}?t=${Date.now()}`,
        {
          cache: "no-store"
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
    loadRoom();
  }, [id]);

  const money = (value) =>
    `PKR ${Number(value || 0).toLocaleString()}`;

  const date = (value) => {
    if (!value) return "—";

    return new Date(value).toLocaleString();
  };

  const statusClass = (status) => {
    if (
      status === "paid" ||
      status === "resolved" ||
      status === "confirmed" ||
      status === "completed" ||
      status === "cleaned"
    ) {
      return "bg-green-50 text-green-700 border-green-200";
    }

    if (
      status === "cancelled" ||
      status === "failed" ||
      status === "needs_cleaning"
    ) {
      return "bg-red-50 text-red-700 border-red-200";
    }

    if (
      status === "partial" ||
      status === "pending" ||
      status === "in_progress" ||
      status === "occupied"
    ) {
      return "bg-yellow-50 text-yellow-700 border-yellow-200";
    }

    return "bg-gray-50 text-gray-600 border-gray-200";
  };

  const statusLabel = (status) => {
    if (!status) return "—";

    return status
      .replaceAll("_", " ")
      .replace(/\b\w/g, (letter) =>
        letter.toUpperCase()
      );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col md:flex-row bg-[#f5f5f3]">
        <Sidebar />

        <main className="flex-1 px-5 py-8 md:px-8">
          <p className="text-sm text-gray-500">
            Loading room details...
          </p>
        </main>
      </div>
    );
  }

  if (!data || !data.room) {
    return (
      <div className="min-h-screen flex flex-col md:flex-row bg-[#f5f5f3]">
        <Sidebar />

        <main className="flex-1 px-5 py-8 md:px-8">
          <div className="bg-white border border-gray-200 px-5 py-10 text-center">
            <p className="text-sm font-medium text-gray-700">
              Room not found
            </p>

            <button
              type="button"
              onClick={() =>
                navigate("/dashboard/manager/rooms")
              }
              className="mt-4 h-10 px-4 bg-[#8f1d2c] text-white text-sm cursor-pointer"
            >
              Back to Rooms
            </button>
          </div>
        </main>
      </div>
    );
  }

  const room = data.room;
  const bookings = data.bookings || [];
  const invoices = data.invoices || [];
  const complaints = data.complaints || [];
  const feedback = data.feedback || [];
  const maintenance = data.maintenance;

  const currentBooking =
    bookings.find(
      (booking) =>
        booking.status === "occupied" ||
        booking.status === "confirmed"
    ) || null;

  const currentGuest = currentBooking?.userId || null;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#f5f5f3]">
      <Sidebar />

      <main className="flex-1 min-w-0">
        <div className="px-5 py-6 md:px-8 md:py-8">
          <button
            type="button"
            onClick={() =>
              navigate("/dashboard/manager/rooms")
            }
            className="text-xs text-gray-500 hover:text-[#8f1d2c] transition mb-5 cursor-pointer"
          >
            ← Back to Rooms
          </button>

          <div className="mb-7">
            <p className="text-xs uppercase tracking-[0.18em] text-gray-400 mb-2">
              Room Monitoring
            </p>

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
              <div>
                <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
                  Room {room.roomNumber}
                </h1>

                <p className="text-sm text-gray-500 mt-1">
                  {room.roomType}
                </p>
              </div>

              <div className="text-left md:text-right">
                <p className="text-xs text-gray-400">
                  Room Rate
                </p>

                <p className="text-lg font-semibold text-gray-900">
                  {money(room.price)}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
            <div className="xl:col-span-2 bg-white border border-gray-200">
              <div className="px-5 py-5 border-b border-gray-200">
                <p className="text-[10px] uppercase tracking-[0.16em] text-gray-400">
                  Room Information
                </p>

                <h2 className="text-lg font-semibold text-gray-900 mt-1">
                  Details
                </h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
                <div className="px-5 py-5">
                  <p className="text-[10px] uppercase tracking-[0.12em] text-gray-400">
                    Room Number
                  </p>

                  <p className="text-sm font-semibold text-gray-900 mt-2">
                    {room.roomNumber}
                  </p>
                </div>

                <div className="px-5 py-5">
                  <p className="text-[10px] uppercase tracking-[0.12em] text-gray-400">
                    Room Type
                  </p>

                  <p className="text-sm font-semibold text-gray-900 mt-2">
                    {room.roomType}
                  </p>
                </div>

                <div className="px-5 py-5">
                  <p className="text-[10px] uppercase tracking-[0.12em] text-gray-400">
                    Capacity
                  </p>

                  <p className="text-sm font-semibold text-gray-900 mt-2">
                    {room.capacity} Guests
                  </p>
                </div>

                <div className="px-5 py-5">
                  <p className="text-[10px] uppercase tracking-[0.12em] text-gray-400">
                    Price
                  </p>

                  <p className="text-sm font-semibold text-gray-900 mt-2">
                    {money(room.price)}
                  </p>
                </div>
              </div>

              <div className="px-5 py-5 border-t border-gray-100">
                <p className="text-[10px] uppercase tracking-[0.12em] text-gray-400">
                  Description
                </p>

                <p className="text-sm text-gray-600 leading-6 mt-2">
                  {room.description || "No description available."}
                </p>
              </div>

              <div className="px-5 py-5 border-t border-gray-100">
                <p className="text-[10px] uppercase tracking-[0.12em] text-gray-400">
                  Amenities
                </p>

                <div className="flex flex-wrap gap-2 mt-3">
                  {room.amenities?.length ? (
                    room.amenities.map(
                      (amenity, index) => (
                        <span
                          key={index}
                          className="px-2.5 py-1.5 bg-gray-50 border border-gray-200 text-xs text-gray-600"
                        >
                          {amenity}
                        </span>
                      )
                    )
                  ) : (
                    <p className="text-xs text-gray-400">
                      No amenities listed.
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200">
              <div className="px-5 py-5 border-b border-gray-200">
                <p className="text-[10px] uppercase tracking-[0.16em] text-gray-400">
                  Current Occupancy
                </p>

                <h2 className="text-lg font-semibold text-gray-900 mt-1">
                  Current Guest
                </h2>
              </div>

              {currentGuest ? (
                <div className="px-5 py-5">
                  <p className="text-base font-semibold text-gray-900">
                    {currentGuest.name}
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    {currentGuest.email}
                  </p>

                  <div className="mt-5 pt-5 border-t border-gray-100 space-y-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.12em] text-gray-400">
                        Booking
                      </p>

                      <p className="text-sm text-gray-700 mt-1">
                        {currentBooking.bookingId}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] uppercase tracking-[0.12em] text-gray-400">
                        Check In
                      </p>

                      <p className="text-sm text-gray-700 mt-1">
                        {date(currentBooking.checkIn)}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] uppercase tracking-[0.12em] text-gray-400">
                        Check Out
                      </p>

                      <p className="text-sm text-gray-700 mt-1">
                        {date(currentBooking.checkOut)}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] uppercase tracking-[0.12em] text-gray-400">
                        Payment
                      </p>

                      <p className="text-sm text-gray-700 mt-1">
                        {money(currentBooking.amountPaid)}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      navigate(
                        `/dashboard/manager/guests/${currentGuest._id}`
                      )
                    }
                    className="w-full h-10 mt-5 border border-gray-200 text-xs font-medium text-gray-700 hover:border-[#8f1d2c] hover:text-[#8f1d2c] transition cursor-pointer"
                  >
                    View Guest Details
                  </button>
                </div>
              ) : (
                <div className="px-5 py-10 text-center">
                  <p className="text-sm font-medium text-gray-700">
                    No current guest
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    This room currently has no active guest.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-5 bg-white border border-gray-200">
            <div className="px-5 py-5 border-b border-gray-200">
              <p className="text-[10px] uppercase tracking-[0.16em] text-gray-400">
                Reservation History
              </p>

              <h2 className="text-lg font-semibold text-gray-900 mt-1">
                Bookings For This Room
              </h2>
            </div>

            {bookings.length === 0 ? (
              <div className="px-5 py-10 text-center">
                <p className="text-sm text-gray-500">
                  No bookings found for this room.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <div className="min-w-[900px]">
                  <div className="grid grid-cols-[1.1fr_1.2fr_1fr_1fr_1fr_1fr] gap-4 px-5 py-3 bg-gray-50 border-b border-gray-200 text-[10px] uppercase tracking-[0.12em] text-gray-400">
                    <span>Booking</span>
                    <span>Guest</span>
                    <span>Check In</span>
                    <span>Check Out</span>
                    <span>Payment</span>
                    <span>Status</span>
                  </div>

                  <div className="divide-y divide-gray-100">
                    {bookings.map((booking) => (
                      <div
                        key={booking._id}
                        className="grid grid-cols-[1.1fr_1.2fr_1fr_1fr_1fr_1fr] gap-4 px-5 py-4 items-center"
                      >
                        <span className="text-xs text-gray-700">
                          {booking.bookingId}
                        </span>

                        <span className="text-sm text-gray-800">
                          {booking.userId?.name || "Unknown"}
                        </span>

                        <span className="text-xs text-gray-500">
                          {date(booking.checkIn)}
                        </span>

                        <span className="text-xs text-gray-500">
                          {date(booking.checkOut)}
                        </span>

                        <div>
                          <p className="text-xs text-gray-700">
                            {money(booking.amountPaid)}
                          </p>

                          <p className="text-[10px] text-gray-400 mt-1">
                            {statusLabel(
                              booking.paymentStatus
                            )}
                          </p>
                        </div>

                        <span
                          className={`inline-flex w-fit px-2 py-1 border text-[10px] font-medium ${statusClass(
                            booking.status
                          )}`}
                        >
                          {statusLabel(booking.status)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mt-5">
            <div className="bg-white border border-gray-200">
              <div className="px-5 py-5 border-b border-gray-200">
                <p className="text-[10px] uppercase tracking-[0.16em] text-gray-400">
                  Billing
                </p>

                <h2 className="text-lg font-semibold text-gray-900 mt-1">
                  Payment Records
                </h2>
              </div>

              {invoices.length === 0 ? (
                <div className="px-5 py-10 text-center">
                  <p className="text-sm text-gray-500">
                    No invoices found.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {invoices.map((invoice) => (
                    <div
                      key={invoice._id}
                      className="px-5 py-5"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            {invoice.invoiceNumber}
                          </p>

                          <p className="text-xs text-gray-400 mt-1">
                            Booking {invoice.bookingNumber}
                          </p>
                        </div>

                        <span
                          className={`inline-flex w-fit px-2 py-1 border text-[10px] font-medium ${statusClass(
                            invoice.paymentStatus
                          )}`}
                        >
                          {statusLabel(
                            invoice.paymentStatus
                          )}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mt-5">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.12em] text-gray-400">
                            Total
                          </p>

                          <p className="text-sm font-medium text-gray-800 mt-1">
                            {money(invoice.totalAmount)}
                          </p>
                        </div>

                        <div>
                          <p className="text-[10px] uppercase tracking-[0.12em] text-gray-400">
                            Paid
                          </p>

                          <p className="text-sm font-medium text-gray-800 mt-1">
                            {money(invoice.amountPaid)}
                          </p>
                        </div>

                        <div>
                          <p className="text-[10px] uppercase tracking-[0.12em] text-gray-400">
                            Remaining
                          </p>

                          <p className="text-sm font-medium text-gray-800 mt-1">
                            {money(invoice.remainingAmount)}
                          </p>
                        </div>

                        <div>
                          <p className="text-[10px] uppercase tracking-[0.12em] text-gray-400">
                            Method
                          </p>

                          <p className="text-sm text-gray-700 mt-1">
                            {statusLabel(
                              invoice.paymentMethod
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white border border-gray-200">
              <div className="px-5 py-5 border-b border-gray-200">
                <p className="text-[10px] uppercase tracking-[0.16em] text-gray-400">
                  Housekeeping
                </p>

                <h2 className="text-lg font-semibold text-gray-900 mt-1">
                  Maintenance
                </h2>
              </div>

              {maintenance ? (
                <div className="px-5 py-5">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm text-gray-700">
                      Cleaning Status
                    </p>

                    <span
                      className={`inline-flex px-2.5 py-1 border text-[10px] font-medium ${statusClass(
                        maintenance.status
                      )}`}
                    >
                      {statusLabel(
                        maintenance.status
                      )}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.12em] text-gray-400">
                        Last Cleaned
                      </p>

                      <p className="text-sm text-gray-700 mt-1">
                        {date(
                          maintenance.lastCleanedAt
                        )}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] uppercase tracking-[0.12em] text-gray-400">
                        Next Cleaning
                      </p>

                      <p className="text-sm text-gray-700 mt-1">
                        {date(
                          maintenance.nextCleaningDueAt
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="px-5 py-10 text-center">
                  <p className="text-sm text-gray-500">
                    No maintenance record found.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mt-5">
            <div className="bg-white border border-gray-200">
              <div className="px-5 py-5 border-b border-gray-200">
                <p className="text-[10px] uppercase tracking-[0.16em] text-gray-400">
                  Guest Experience
                </p>

                <h2 className="text-lg font-semibold text-gray-900 mt-1">
                  Feedback
                </h2>
              </div>

              {feedback.length === 0 ? (
                <div className="px-5 py-10 text-center">
                  <p className="text-sm text-gray-500">
                    No guest feedback found.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {feedback.map((item) => (
                    <div
                      key={item._id}
                      className="px-5 py-5"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            {item.name}
                          </p>

                          <p className="text-xs text-gray-400 mt-1">
                            {item.email}
                          </p>
                        </div>

                        <span
                          className={`inline-flex px-2 py-1 border text-[10px] font-medium ${statusClass(
                            item.status
                          )}`}
                        >
                          {statusLabel(item.status)}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 mt-4">
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

                      <p className="text-sm text-gray-600 leading-6 mt-3">
                        {item.message}
                      </p>

                      <p className="text-[11px] text-gray-400 mt-3">
                        {date(item.createdAt)}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white border border-gray-200">
              <div className="px-5 py-5 border-b border-gray-200">
                <p className="text-[10px] uppercase tracking-[0.16em] text-gray-400">
                  Guest Service
                </p>

                <h2 className="text-lg font-semibold text-gray-900 mt-1">
                  Complaints
                </h2>
              </div>

              {complaints.length === 0 ? (
                <div className="px-5 py-10 text-center">
                  <p className="text-sm text-gray-500">
                    No complaints found for this room.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {complaints.map((complaint) => (
                    <div
                      key={complaint._id}
                      className="px-5 py-5"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            {complaint.guestName}
                          </p>

                          <p className="text-xs text-gray-400 mt-1">
                            Room {complaint.roomNumber}
                          </p>
                        </div>

                        <span
                          className={`inline-flex px-2 py-1 border text-[10px] font-medium ${statusClass(
                            complaint.status
                          )}`}
                        >
                          {statusLabel(
                            complaint.status
                          )}
                        </span>
                      </div>

                      <p className="text-sm text-gray-600 leading-6 mt-4">
                        {complaint.complaint}
                      </p>

                      <p className="text-[11px] text-gray-400 mt-3">
                        {date(complaint.createdAt)}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mt-5 bg-[#171717] text-white px-5 py-5">
            <p className="text-[10px] uppercase tracking-[0.16em] text-white/40">
              Read Only
            </p>

            <p className="text-sm font-medium mt-2">
              Room information is for monitoring only
            </p>

            <p className="text-xs text-white/50 mt-1 leading-5">
              Manager accounts cannot modify room, guest, booking,
              payment, feedback, complaint or maintenance records.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default RoomDetails;