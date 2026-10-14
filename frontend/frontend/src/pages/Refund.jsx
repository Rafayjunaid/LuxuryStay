import { useEffect, useState } from "react";

import {
  Link,
  useParams
} from "react-router-dom";

function Refund() {
  const { bookingId } = useParams();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getBooking = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/bookings/${bookingId}`
        );

        const data = await response.json();

        if (!response.ok) {
          setMessage(
            data.message ||
              "Unable to load refund details."
          );

          setLoading(false);
          return;
        }

        setBooking(data);
      } catch (error) {
        setMessage(
          "Unable to load refund details."
        );
      }

      setLoading(false);
    };

    getBooking();
  }, [bookingId]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f5f5f3] text-[#171717]">

        <section className="bg-[#171717] px-6 py-20 text-white">
          <div className="mx-auto max-w-7xl">

            <p className="text-xs font-semibold tracking-[0.25em] text-[#d9a400]">
              LUXURYSTAY
            </p>

            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Processing refund
            </h1>

            <div className="mt-6 h-[2px] w-20 bg-[#8f1d2c]" />

          </div>
        </section>

        <div className="mx-auto flex min-h-[400px] max-w-3xl items-center justify-center px-6">

          <div className="w-full border border-[#e1dcd7] bg-white px-6 py-14 text-center">

            <div className="mx-auto h-9 w-9 animate-spin rounded-full border-2 border-[#e1dcd7] border-t-[#8f1d2c]" />

            <p className="mt-5 text-sm text-[#6c6661]">
              Loading refund details...
            </p>

          </div>

        </div>

      </main>
    );
  }

  if (message || !booking) {
    return (
      <main className="min-h-screen bg-[#f5f5f3] text-[#171717]">

        <section className="bg-[#171717] px-6 py-20 text-white">
          <div className="mx-auto max-w-7xl">

            <p className="text-xs font-semibold tracking-[0.25em] text-[#d9a400]">
              LUXURYSTAY
            </p>

            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Refund Details
            </h1>

            <div className="mt-6 h-[2px] w-20 bg-[#8f1d2c]" />

          </div>
        </section>

        <div className="mx-auto flex min-h-[450px] max-w-3xl items-center px-6 py-12">

          <div className="w-full border border-[#e1dcd7] bg-white px-6 py-12 text-center sm:px-10">

            <div className="mx-auto flex h-16 w-16 items-center justify-center border border-[#8f1d2c] text-[#8f1d2c]">

              <svg
                className="h-7 w-7"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 8v5M12 16h.01" />
              </svg>

            </div>

            <p className="mt-6 text-xs font-semibold tracking-[0.2em] text-[#8f1d2c]">
              REFUND
            </p>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight">
              Refund Details Unavailable
            </h1>

            <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[#6c6661]">
              {message ||
                "We couldn't find this reservation."}
            </p>

            <Link
              to="/profile"
              className="mt-8 inline-flex items-center gap-3 bg-[#8f1d2c] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#741522]"
            >
              Back to Profile

              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M19 12H5M11 18l-6-6 6-6" />
              </svg>
            </Link>

          </div>

        </div>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f5f3] text-[#171717]">

      <section className="bg-[#171717] px-6 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-7xl">

          <p className="text-xs font-semibold tracking-[0.25em] text-[#d9a400]">
            LUXURYSTAY
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Refund Confirmed
          </h1>

          <div className="mt-6 h-[2px] w-20 bg-[#8f1d2c]" />

          <p className="mt-6 max-w-2xl text-sm leading-7 text-[#d2cfcc] sm:text-base">
            Your reservation has been cancelled successfully and
            the refund has been recorded.
          </p>

        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-12 sm:py-16">

        <div className="flex flex-col items-center text-center">

          <div className="flex h-20 w-20 items-center justify-center border border-[#d9a400] bg-white">

            <div className="flex h-12 w-12 items-center justify-center bg-[#8f1d2c] text-white">

              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M5 12l4 4L19 6" />
              </svg>

            </div>

          </div>

          <p className="mt-7 text-xs font-semibold tracking-[0.22em] text-[#8f1d2c]">
            REFUND COMPLETED
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Your payment has been refunded.
          </h2>

          <p className="mt-4 max-w-xl text-sm leading-6 text-[#6c6661]">
            The reservation has been cancelled and the refund
            information has been successfully recorded in the
            LuxuryStay system.
          </p>

        </div>

        <div className="mt-12 border border-[#e1dcd7] bg-white">

          <div className="flex flex-col gap-5 border-b border-[#e1dcd7] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">

            <div>
              <span className="block text-[10px] font-bold tracking-[0.18em] text-[#77716c]">
                REFUND STATUS
              </span>

              <strong className="mt-2 block text-lg font-semibold text-[#37643d]">
                REFUNDED
              </strong>
            </div>

            <div className="flex w-fit items-center gap-2 border border-[#d8e5d9] bg-[#f6fbf6] px-4 py-2 text-[10px] font-bold tracking-[0.15em] text-[#37643d]">

              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <path d="M5 12l4 4L19 6" />
              </svg>

              COMPLETED

            </div>

          </div>

          <div className="border-b border-[#e1dcd7] bg-[#faf9f7] px-6 py-8 text-center sm:px-8">

            <p className="text-sm text-[#6c6661]">
              Refund Amount
            </p>

            <strong className="mt-2 block text-4xl font-semibold tracking-tight text-[#171717] sm:text-5xl">
              ${booking.totalPrice}
            </strong>

            <p className="mt-3 text-xs text-[#8f1d2c]">
              Payment refund recorded successfully
            </p>

          </div>

          <div className="grid sm:grid-cols-2">

            <div className="border-b border-[#e1dcd7] p-6 sm:border-r sm:p-8">

              <span className="block text-[10px] font-bold tracking-[0.18em] text-[#77716c]">
                BOOKING ID
              </span>

              <strong className="mt-3 block break-all text-sm font-semibold text-[#171717]">
                {booking.bookingId}
              </strong>

            </div>

            <div className="border-b border-[#e1dcd7] p-6 sm:p-8">

              <span className="block text-[10px] font-bold tracking-[0.18em] text-[#77716c]">
                ROOM
              </span>

              <strong className="mt-3 block text-sm font-semibold text-[#171717]">
                {booking.roomId?.roomType}
              </strong>

            </div>

            <div className="border-b border-[#e1dcd7] p-6 sm:border-r sm:p-8">

              <span className="block text-[10px] font-bold tracking-[0.18em] text-[#77716c]">
                ROOM NUMBER
              </span>

              <strong className="mt-3 block text-sm font-semibold text-[#171717]">
                {booking.roomId?.roomNumber}
              </strong>

            </div>

            <div className="border-b border-[#e1dcd7] p-6 sm:p-8">

              <span className="block text-[10px] font-bold tracking-[0.18em] text-[#77716c]">
                RESERVATION STATUS
              </span>

              <strong className="mt-3 block text-sm font-semibold text-[#8f1d2c]">
                CANCELLED
              </strong>

            </div>

          </div>

          <div className="flex items-start gap-3 border-t border-[#e1dcd7] px-6 py-6 sm:px-8">

            <svg
              className="mt-0.5 h-5 w-5 shrink-0 text-[#d9a400]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 11v5M12 8h.01" />
            </svg>

            <p className="text-xs leading-5 text-[#6c6661]">
              Your payment refund has been recorded successfully
              in the LuxuryStay system.
            </p>

          </div>

        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">

          <Link
            to="/profile"
            className="flex items-center justify-center gap-3 bg-[#8f1d2c] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#741522]"
          >
            View My Reservations

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

          <Link
            to="/rooms"
            className="flex items-center justify-center border border-[#d5cfca] bg-white px-7 py-3.5 text-sm font-semibold text-[#171717] transition hover:border-[#8f1d2c] hover:text-[#8f1d2c]"
          >
            Browse Rooms
          </Link>

        </div>

      </section>

      <section className="border-t border-[#343434] bg-[#171717] px-6 py-12 text-white">

        <div className="mx-auto max-w-5xl">

          <p className="text-xs font-semibold tracking-[0.25em] text-[#d9a400]">
            LUXURYSTAY
          </p>

          <div className="mt-4 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Thank you for staying with us.
              </h2>

              <p className="mt-2 text-sm text-[#aaa5a0]">
                We hope to welcome you again in the future.
              </p>
            </div>

            <Link
              to="/rooms"
              className="text-sm font-semibold text-white transition hover:text-[#d9a400]"
            >
              Explore Rooms
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}

export default Refund;