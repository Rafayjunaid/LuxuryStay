import { useEffect, useState } from "react";
import {
  Link,
  useNavigate
} from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [message, setMessage] = useState("");
  const [cancelBookingId, setCancelBookingId] = useState(null);
  const [cancelPassword, setCancelPassword] = useState("");
  const [cancelMessage, setCancelMessage] = useState("");
  const [cancelLoading, setCancelLoading] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      navigate("/login");
      return;
    }

    const currentUser = JSON.parse(savedUser);

    setUser(currentUser);

    const getBookings = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/bookings/user/${currentUser.id}`
        );

        const data = await response.json();

        if (!response.ok) {
          setMessage(
            data.message || "Unable to load reservations."
          );

          setLoadingBookings(false);
          return;
        }

        setBookings(data);
      } catch (error) {
        setMessage(
          "Unable to load your reservations."
        );
      }

      setLoadingBookings(false);
    };

    getBookings();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await fetch(
        "http://localhost:5000/api/auth/logout",
        {
          method: "POST"
        }
      );
    } catch (error) {}

    localStorage.removeItem("user");

    window.dispatchEvent(
      new Event("userChanged")
    );

    navigate("/login");
  };

  const openCancelPopup = (bookingId) => {
    setCancelBookingId(bookingId);
    setCancelPassword("");
    setCancelMessage("");
  };

  const closeCancelPopup = () => {
    setCancelBookingId(null);
    setCancelPassword("");
    setCancelMessage("");
  };

  const handleCancelReservation = async () => {
    setCancelMessage("");

    if (!cancelPassword) {
      setCancelMessage(
        "Please enter your current password."
      );
      return;
    }

    setCancelLoading(true);

    try {
      const response = await fetch(
        `http://localhost:5000/api/bookings/cancel/${cancelBookingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userId: user.id,
            password: cancelPassword
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setCancelMessage(
          data.message ||
            "Unable to cancel reservation."
        );

        setCancelLoading(false);
        return;
      }

      setBookings((currentBookings) =>
        currentBookings.map((booking) =>
          booking.bookingId === cancelBookingId
            ? data.booking
            : booking
        )
      );

      closeCancelPopup();

      navigate(`/refund/${cancelBookingId}`);
    } catch (error) {
      setCancelMessage(
        "Unable to cancel reservation."
      );
    }

    setCancelLoading(false);
  };

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#f5f5f3] text-[#171717]">

      <section className="bg-[#171717] px-6 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-7xl">

          <p className="text-xs font-semibold tracking-[0.25em] text-[#d9a400]">
            LUXURYSTAY
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            My Profile
          </h1>

          <div className="mt-6 h-[2px] w-20 bg-[#8f1d2c]" />

          <p className="mt-6 max-w-xl text-sm leading-7 text-[#d2cfcc] sm:text-base">
            Manage your account details and keep track of your
            LuxuryStay reservations.
          </p>

        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 sm:py-14">

        <div className="border border-[#e1dcd7] bg-white">

          <div className="flex flex-col lg:flex-row">

            <div className="flex items-center justify-center border-b border-[#e1dcd7] bg-[#faf9f7] p-8 lg:w-64 lg:border-b-0 lg:border-r">

              {user.profilePic ? (
                <img
                  src={`http://localhost:5000${user.profilePic}`}
                  alt={user.name}
                  className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-sm"
                />
              ) : (
                <div className="flex h-32 w-32 items-center justify-center rounded-full bg-[#8f1d2c] text-4xl font-semibold text-white">
                  {user.name
                    ?.charAt(0)
                    .toUpperCase()}
                </div>
              )}

            </div>

            <div className="flex-1 p-6 sm:p-8">

              <div className="flex flex-col gap-8">

                <div>
                  <p className="text-xs font-semibold tracking-[0.2em] text-[#8f1d2c]">
                    ACCOUNT DETAILS
                  </p>

                  <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                    {user.name}
                  </h2>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">

                  <div className="border-l-2 border-[#d9a400] pl-4">
                    <span className="block text-[10px] font-bold tracking-[0.18em] text-[#77716c]">
                      NAME
                    </span>

                    <strong className="mt-2 block break-words text-sm font-medium text-[#171717]">
                      {user.name}
                    </strong>
                  </div>

                  <div className="border-l-2 border-[#d9a400] pl-4">
                    <span className="block text-[10px] font-bold tracking-[0.18em] text-[#77716c]">
                      EMAIL
                    </span>

                    <strong className="mt-2 block break-words text-sm font-medium text-[#171717]">
                      {user.email}
                    </strong>
                  </div>

                </div>

                <div className="flex flex-col gap-3 border-t border-[#e1dcd7] pt-6 sm:flex-row">

                  <Link
                    to="/edit-profile"
                    className="inline-flex items-center justify-center gap-3 bg-[#8f1d2c] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#741522]"
                  >
                    Edit Profile

                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.12 2.12 0 013 3L8 18l-4 1 1-4z" />
                    </svg>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center justify-center gap-3 border border-[#d5cfca] bg-white px-6 py-3 text-sm font-semibold text-[#171717] transition hover:border-[#8f1d2c] hover:text-[#8f1d2c]"
                  >
                    Logout

                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M10 17l5-5-5-5" />
                      <path d="M15 12H3" />
                      <path d="M21 19V5a2 2 0 00-2-2h-6" />
                    </svg>
                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>

        <section className="mt-14">

          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-[#8f1d2c]">
                YOUR STAYS
              </p>

              <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                My Reservations
              </h2>

              <div className="mt-4 h-[2px] w-14 bg-[#d9a400]" />
            </div>

            <span className="w-fit border border-[#d8d2cd] bg-white px-4 py-2 text-xs font-semibold tracking-wide text-[#55504b]">
              {bookings.length}{" "}
              {bookings.length === 1
                ? "Reservation"
                : "Reservations"}
            </span>

          </div>

          {loadingBookings ? (
            <div className="border border-[#e1dcd7] bg-white px-6 py-14 text-center">

              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#e1dcd7] border-t-[#8f1d2c]" />

              <p className="mt-5 text-sm text-[#6c6661]">
                Loading your reservations...
              </p>

            </div>
          ) : message ? (
            <div className="border border-[#e8caca] bg-[#fff6f6] px-6 py-5 text-sm text-[#8f1d2c]">
              {message}
            </div>
          ) : bookings.length === 0 ? (
            <div className="border border-[#e1dcd7] bg-white px-6 py-16 text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center border border-[#8f1d2c] text-[#8f1d2c]">
                <svg
                  className="h-7 w-7"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M3 20V9l9-5 9 5v11" />
                  <path d="M7 20v-6h10v6" />
                  <path d="M9 10h6" />
                </svg>
              </div>

              <h3 className="mt-6 text-2xl font-semibold tracking-tight">
                No reservations yet
              </h3>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#6c6661]">
                You haven't reserved a room yet. Explore our
                available rooms and plan your next stay.
              </p>

              <Link
                to="/rooms"
                className="mt-7 inline-flex items-center gap-3 bg-[#8f1d2c] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#741522]"
              >
                Browse Rooms

                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>

            </div>
          ) : (
            <div className="grid gap-7 lg:grid-cols-2">

              {bookings.map((booking) => (
                <article
                  className="overflow-hidden border border-[#e1dcd7] bg-white"
                  key={booking._id}
                >

                  <div className="relative h-60 overflow-hidden bg-[#171717] sm:h-72">

                    <img
                      src={
                        booking.roomId?.photos?.[0] ||
                        "https://images.unsplash.com/photo-1611892440504-42a792e24d32"
                      }
                      alt={
                        booking.roomId?.roomType ||
                        "LuxuryStay Room"
                      }
                      className="h-full w-full object-cover transition duration-500 hover:scale-105"
                    />

                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-5 pb-5 pt-12">

                      <div className="flex items-end justify-between gap-4">

                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#d9a400]">
                            {booking.roomId?.roomType}
                          </p>

                          <h3 className="mt-1 text-2xl font-semibold text-white">
                            Room {booking.roomId?.roomNumber}
                          </h3>
                        </div>

                        <strong className="shrink-0 text-xl font-semibold text-white">
                          ${booking.totalPrice}
                        </strong>

                      </div>

                    </div>

                    <span
                      className={`absolute right-5 top-5 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.15em] ${
                        booking.status === "confirmed"
                          ? "bg-white text-[#8f1d2c]"
                          : booking.status === "cancelled"
                          ? "bg-[#171717] text-white"
                          : "bg-[#d9a400] text-[#171717]"
                      }`}
                    >
                      {booking.status}
                    </span>

                  </div>

                  <div className="p-6 sm:p-7">

                    <div className="grid grid-cols-2 gap-px border border-[#e1dcd7] bg-[#e1dcd7] sm:grid-cols-4">

                      <div className="bg-white p-4">
                        <span className="block text-[9px] font-bold tracking-[0.15em] text-[#77716c]">
                          CHECK-IN
                        </span>

                        <strong className="mt-2 block text-xs font-semibold text-[#171717]">
                          {new Date(
                            booking.checkIn
                          ).toLocaleDateString()}
                        </strong>
                      </div>

                      <div className="bg-white p-4">
                        <span className="block text-[9px] font-bold tracking-[0.15em] text-[#77716c]">
                          CHECK-OUT
                        </span>

                        <strong className="mt-2 block text-xs font-semibold text-[#171717]">
                          {new Date(
                            booking.checkOut
                          ).toLocaleDateString()}
                        </strong>
                      </div>

                      <div className="bg-white p-4">
                        <span className="block text-[9px] font-bold tracking-[0.15em] text-[#77716c]">
                          GUESTS
                        </span>

                        <strong className="mt-2 block text-xs font-semibold text-[#171717]">
                          {booking.guests}
                        </strong>
                      </div>

                      <div className="bg-white p-4">
                        <span className="block text-[9px] font-bold tracking-[0.15em] text-[#77716c]">
                          NIGHTS
                        </span>

                        <strong className="mt-2 block text-xs font-semibold text-[#171717]">
                          {booking.nights}
                        </strong>
                      </div>

                    </div>

                    <div className="mt-5 grid gap-4 border-y border-[#e1dcd7] py-5 sm:grid-cols-2">

                      <div>
                        <span className="block text-[9px] font-bold tracking-[0.15em] text-[#77716c]">
                          BOOKING ID
                        </span>

                        <strong className="mt-2 block break-all text-xs font-semibold text-[#171717]">
                          {booking.bookingId}
                        </strong>
                      </div>

                      <div className="sm:text-right">
                        <span className="block text-[9px] font-bold tracking-[0.15em] text-[#77716c]">
                          PAYMENT
                        </span>

                        <strong className="mt-2 block text-xs font-semibold text-[#8f1d2c]">
                          {booking.paymentStatus === "paid"
                            ? "PAID"
                            : booking.paymentStatus}
                        </strong>
                      </div>

                    </div>

                    <div className="mt-5 flex flex-col gap-3">

                      <Link
                        to={`/booking-confirmation/${booking.bookingId}`}
                        state={{
                          booking
                        }}
                        className="flex items-center justify-center gap-3 bg-[#171717] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#8f1d2c]"
                      >
                        View Reservation

                        <svg
                          className="h-4 w-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      </Link>

                      {booking.status !== "cancelled" &&
                        booking.status !== "completed" && (
                          <button
                            type="button"
                            className="flex items-center justify-center gap-3 border border-[#d5cfca] bg-white px-5 py-3.5 text-sm font-semibold text-[#8f1d2c] transition hover:border-[#8f1d2c] hover:bg-[#fff7f7]"
                            onClick={() =>
                              openCancelPopup(
                                booking.bookingId
                              )
                            }
                          >
                            Cancel Reservation

                            <svg
                              className="h-4 w-4"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                            >
                              <path d="M6 6l12 12M18 6L6 18" />
                            </svg>
                          </button>
                        )}

                      {booking.status === "cancelled" &&
                        booking.refundStatus === "refunded" && (
                          <div className="flex items-center justify-center gap-3 border border-[#d8e5d9] bg-[#f6fbf6] px-5 py-3.5 text-sm font-semibold text-[#37643d]">
                            <svg
                              className="h-4 w-4"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                            >
                              <path d="M5 12l4 4L19 6" />
                            </svg>

                            Payment Refunded
                          </div>
                        )}

                    </div>

                  </div>

                </article>
              ))}

            </div>
          )}

        </section>

      </section>

      {cancelBookingId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-5 py-8"
          onClick={closeCancelPopup}
        >

          <div
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto bg-white shadow-2xl"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="flex items-center justify-between border-b border-[#e1dcd7] px-6 py-5 sm:px-8">

              <p className="text-xs font-semibold tracking-[0.2em] text-[#8f1d2c]">
                CANCEL RESERVATION
              </p>

              <button
                type="button"
                onClick={closeCancelPopup}
                className="flex h-9 w-9 items-center justify-center border border-[#d8d2cd] text-[#55504b] transition hover:border-[#8f1d2c] hover:text-[#8f1d2c]"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>

            </div>

            <div className="p-6 sm:p-8">

              <div className="flex h-14 w-14 items-center justify-center border border-[#8f1d2c] text-[#8f1d2c]">
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M12 8v5M12 16h.01" />
                  <circle cx="12" cy="12" r="9" />
                </svg>
              </div>

              <h2 className="mt-6 text-2xl font-semibold tracking-tight">
                Are you sure?
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#6c6661]">
                Your reservation will be cancelled and your
                payment will be marked as refunded.
              </p>

              <div className="mt-7">

                <label className="mb-2 block text-[10px] font-bold tracking-[0.16em] text-[#4f4a46]">
                  CURRENT PASSWORD
                </label>

                <input
                  type="password"
                  value={cancelPassword}
                  onChange={(event) =>
                    setCancelPassword(
                      event.target.value
                    )
                  }
                  placeholder="Enter your current password"
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleCancelReservation();
                    }
                  }}
                  className="h-12 w-full border border-[#d8d2cd] bg-white px-4 text-sm outline-none transition placeholder:text-[#aaa39e] focus:border-[#8f1d2c] focus:ring-1 focus:ring-[#8f1d2c]"
                />

              </div>

              {cancelMessage && (
                <div className="mt-4 border border-[#e8caca] bg-[#fff6f6] px-4 py-3 text-sm text-[#8f1d2c]">
                  {cancelMessage}
                </div>
              )}

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">

                <button
                  type="button"
                  className="flex-1 border border-[#d5cfca] bg-white px-5 py-3.5 text-sm font-semibold text-[#171717] transition hover:border-[#171717]"
                  onClick={closeCancelPopup}
                >
                  Keep Reservation
                </button>

                <button
                  type="button"
                  className="flex-1 bg-[#8f1d2c] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#741522] disabled:cursor-not-allowed disabled:opacity-60"
                  onClick={handleCancelReservation}
                  disabled={cancelLoading}
                >
                  {cancelLoading
                    ? "Cancelling..."
                    : "Cancel Reservation"}
                </button>

              </div>

            </div>

          </div>

        </div>
      )}

    </main>
  );
}

export default Profile;