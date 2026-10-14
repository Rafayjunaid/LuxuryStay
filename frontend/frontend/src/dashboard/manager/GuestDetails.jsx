import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";

function GuestDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadGuest = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/manager/guests/${id}?t=${Date.now()}`,
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
    loadGuest();
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
      status === "completed"
    ) {
      return "bg-green-50 text-green-700 border-green-200";
    }

    if (
      status === "cancelled" ||
      status === "failed"
    ) {
      return "bg-red-50 text-red-700 border-red-200";
    }

    return "bg-yellow-50 text-yellow-700 border-yellow-200";
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
            Loading guest details...
          </p>
        </main>
      </div>
    );
  }

  if (!data || !data.guest) {
    return (
      <div className="min-h-screen flex flex-col md:flex-row bg-[#f5f5f3]">
        <Sidebar />

        <main className="flex-1 px-5 py-8 md:px-8">
          <div className="bg-white border border-gray-200 px-5 py-10 text-center">
            <p className="text-sm text-gray-600">
              Guest not found.
            </p>

            <button
              type="button"
              onClick={() =>
                navigate("/dashboard/manager/guests")
              }
              className="mt-4 h-10 px-4 bg-[#8f1d2c] text-white text-sm cursor-pointer"
            >
              Back to Guests
            </button>
          </div>
        </main>
      </div>
    );
  }

  const guest = data.guest;
  const bookings = data.bookings || [];
  const invoices = data.invoices || [];
  const feedback = data.feedback || [];
  const complaints = data.complaints || [];

  const totalPaid = bookings.reduce(
    (total, booking) =>
      total + Number(booking.amountPaid || 0),
    0
  );

  const totalBookingValue = bookings.reduce(
    (total, booking) =>
      total + Number(booking.totalPrice || 0),
    0
  );

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#f5f5f3]">
      <Sidebar />

      <main className="flex-1 min-w-0">
        <div className="px-5 py-6 md:px-8 md:py-8">
          <button
            type="button"
            onClick={() =>
              navigate("/dashboard/manager/guests")
            }
            className="text-xs text-gray-500 hover:text-[#8f1d2c] transition mb-5 cursor-pointer"
          >
            ← Back to Guests
          </button>

          <div className="mb-7">
            <p className="text-xs uppercase tracking-[0.18em] text-gray-400 mb-2">
              Guest Profile
            </p>

            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
              {guest.name}
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              {guest.email}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
            <div className="bg-white border border-gray-200 px-5 py-5">
              <p className="text-[10px] uppercase tracking-[0.14em] text-gray-400">
                Reservations
              </p>

              <p className="text-2xl font-semibold text-gray-900 mt-2">
                {bookings.length}
              </p>
            </div>

            <div className="bg-white border border-gray-200 px-5 py-5">
              <p className="text-[10px] uppercase tracking-[0.14em] text-gray-400">
                Booking Value
              </p>

              <p className="text-lg font-semibold text-gray-900 mt-2">
                {money(totalBookingValue)}
              </p>
            </div>

            <div className="bg-white border border-gray-200 px-5 py-5">
              <p className="text-[10px] uppercase tracking-[0.14em] text-gray-400">
                Amount Paid
              </p>

              <p className="text-lg font-semibold text-gray-900 mt-2">
                {money(totalPaid)}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
            <div className="bg-white border border-gray-200">
              <div className="px-5 py-5 border-b border-gray-200">
                <p className="text-[10px] uppercase tracking-[0.16em] text-gray-400">
                  Guest Information
                </p>

                <h2 className="text-lg font-semibold text-gray-900 mt-1">
                  Profile
                </h2>
              </div>

              <div className="px-5 py-5 space-y-5">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.12em] text-gray-400">
                    Full Name
                  </p>

                  <p className="text-sm text-gray-800 mt-1">
                    {guest.name}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.12em] text-gray-400">
                    Email
                  </p>

                  <p className="text-sm text-gray-800 mt-1 break-all">
                    {guest.email}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.12em] text-gray-400">
                    Account Role
                  </p>

                  <p className="text-sm text-gray-800 mt-1 capitalize">
                    {guest.role || "guest"}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.12em] text-gray-400">
                    Guest ID
                  </p>

                  <p className="text-xs text-gray-500 mt-1 break-all">
                    {guest._id}
                  </p>
                </div>
              </div>
            </div>

            <div className="xl:col-span-2 bg-white border border-gray-200">
              <div className="px-5 py-5 border-b border-gray-200">
                <p className="text-[10px] uppercase tracking-[0.16em] text-gray-400">
                  Reservation History
                </p>

                <h2 className="text-lg font-semibold text-gray-900 mt-1">
                  Guest Reservations
                </h2>
              </div>

              {bookings.length === 0 ? (
                <div className="px-5 py-10 text-center">
                  <p className="text-sm text-gray-500">
                    No reservations found.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {bookings.map((booking) => (
                    <div
                      key={booking._id}
                      className="px-5 py-5"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            {booking.bookingId}
                          </p>

                          <p className="text-xs text-gray-400 mt-1">
                            {booking.roomId
                              ? `Room ${booking.roomId.roomNumber}`
                              : "Room unavailable"}
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

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.12em] text-gray-400">
                            Check In
                          </p>

                          <p className="text-xs text-gray-700 mt-1">
                            {date(booking.checkIn)}
                          </p>
                        </div>

                        <div>
                          <p className="text-[10px] uppercase tracking-[0.12em] text-gray-400">
                            Check Out
                          </p>

                          <p className="text-xs text-gray-700 mt-1">
                            {date(booking.checkOut)}
                          </p>
                        </div>

                        <div>
                          <p className="text-[10px] uppercase tracking-[0.12em] text-gray-400">
                            Total
                          </p>

                          <p className="text-xs text-gray-700 mt-1">
                            {money(booking.totalPrice)}
                          </p>
                        </div>

                        <div>
                          <p className="text-[10px] uppercase tracking-[0.12em] text-gray-400">
                            Paid
                          </p>

                          <p className="text-xs text-gray-700 mt-1">
                            {money(booking.amountPaid)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mt-5">
            <div className="bg-white border border-gray-200">
              <div className="px-5 py-5 border-b border-gray-200">
                <p className="text-[10px] uppercase tracking-[0.16em] text-gray-400">
                  Billing
                </p>

                <h2 className="text-lg font-semibold text-gray-900 mt-1">
                  Invoices & Payments
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
                      <div className="flex justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            {invoice.invoiceNumber}
                          </p>

                          <p className="text-xs text-gray-400 mt-1">
                            {invoice.bookingNumber}
                          </p>
                        </div>

                        <span
                          className={`h-fit px-2 py-1 border text-[10px] font-medium ${statusClass(
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

                          <p className="text-sm text-gray-700 mt-1">
                            {money(invoice.totalAmount)}
                          </p>
                        </div>

                        <div>
                          <p className="text-[10px] uppercase tracking-[0.12em] text-gray-400">
                            Paid
                          </p>

                          <p className="text-sm text-gray-700 mt-1">
                            {money(invoice.amountPaid)}
                          </p>
                        </div>

                        <div>
                          <p className="text-[10px] uppercase tracking-[0.12em] text-gray-400">
                            Remaining
                          </p>

                          <p className="text-sm text-gray-700 mt-1">
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
                  Guest Experience
                </p>

                <h2 className="text-lg font-semibold text-gray-900 mt-1">
                  Feedback
                </h2>
              </div>

              {feedback.length === 0 ? (
                <div className="px-5 py-10 text-center">
                  <p className="text-sm text-gray-500">
                    No feedback found.
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
                          className={`px-2 py-1 border text-[10px] ${statusClass(
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

                      <p className="text-sm text-gray-600 leading-6 mt-3">
                        {item.message}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mt-5 bg-white border border-gray-200">
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
                  No complaints found.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {complaints.map((complaint) => (
                  <div
                    key={complaint._id}
                    className="px-5 py-5 flex flex-col md:flex-row md:items-start md:justify-between gap-4"
                  >
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        Room {complaint.roomNumber}
                      </p>

                      <p className="text-xs text-gray-400 mt-1">
                        {complaint.guestName}
                      </p>

                      <p className="text-sm text-gray-600 mt-3 leading-6">
                        {complaint.complaint}
                      </p>
                    </div>

                    <span
                      className={`w-fit px-2 py-1 border text-[10px] ${statusClass(
                        complaint.status
                      )}`}
                    >
                      {statusLabel(complaint.status)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default GuestDetails;