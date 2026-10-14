import { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate
} from "react-router-dom";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  const booking = location.state?.booking;

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  if (!booking) {
    return (
      <main className="min-h-screen bg-[#f5f5f3] text-[#171717] flex items-center justify-center px-6">
        <div className="w-full max-w-lg border border-[#e1dcd7] bg-white p-8 sm:p-10 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center border border-[#8f1d2c] text-[#8f1d2c]">
            <svg
              className="h-7 w-7"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="M7 9h10M7 13h4" />
            </svg>
          </div>

          <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-[#8f1d2c]">
            PAYMENT
          </p>

          <h1 className="text-3xl font-semibold tracking-tight">
            Payment Session Not Found
          </h1>

          <p className="mt-4 text-sm leading-6 text-[#66615d]">
            Your booking session could not be found. Please start your
            reservation again.
          </p>

          <Link
            to="/rooms"
            className="mt-8 inline-flex items-center justify-center bg-[#8f1d2c] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#741522]"
          >
            Browse Rooms
          </Link>
        </div>
      </main>
    );
  }

  const handlePayment = async (event) => {
    event.preventDefault();

    setMessage("");

    if (!cardName || !cardNumber || !expiry || !cvv) {
      setMessage("Please complete all payment details.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/bookings/payment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            bookingId: booking.bookingId,
            cardNumber: cardNumber.replace(/\s/g, "")
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Payment failed.");
        setLoading(false);
        return;
      }

      navigate(
        `/booking-confirmation/${booking.bookingId}`,
        {
          state: {
            booking: data.booking
          }
        }
      );
    } catch (error) {
      setMessage("Payment service is unavailable.");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#f5f5f3] text-[#171717]">

      <section className="bg-[#171717] px-6 py-20 text-white sm:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-xs font-semibold tracking-[0.25em] text-[#d9a400]">
            SECURE CHECKOUT
          </p>

          <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Complete your{" "}
            <span className="text-[#8f1d2c]">
              payment.
            </span>
          </h1>

          <div className="mt-7 h-[2px] w-20 bg-[#d9a400]" />

          <p className="mt-6 max-w-2xl text-sm leading-7 text-[#d2cfcc] sm:text-base">
            You're one step away from confirming your LuxuryStay
            reservation. Review your booking and complete the secure
            checkout below.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-12 lg:grid-cols-[1fr_380px] lg:items-start lg:py-16">

        <div className="border border-[#e1dcd7] bg-white">

          <div className="flex flex-col gap-5 border-b border-[#e1dcd7] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-[#8f1d2c]">
                MOCK STRIPE CHECKOUT
              </p>

              <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                Payment Details
              </h2>
            </div>

            <span className="inline-flex w-fit items-center border border-[#d9a400] px-3 py-2 text-[10px] font-bold tracking-[0.18em] text-[#8a6900]">
              TEST MODE
            </span>
          </div>

          <form
            onSubmit={handlePayment}
            className="space-y-6 p-6 sm:p-8"
          >

            <div>
              <label className="mb-2 block text-[11px] font-bold tracking-[0.16em] text-[#4f4a46]">
                CARDHOLDER NAME
              </label>

              <input
                type="text"
                placeholder="John Doe"
                value={cardName}
                onChange={(event) =>
                  setCardName(event.target.value)
                }
                className="h-12 w-full border border-[#d8d2cd] bg-white px-4 text-sm outline-none transition placeholder:text-[#aaa39e] focus:border-[#8f1d2c] focus:ring-1 focus:ring-[#8f1d2c]"
              />
            </div>

            <div>
              <label className="mb-2 block text-[11px] font-bold tracking-[0.16em] text-[#4f4a46]">
                CARD NUMBER
              </label>

              <div className="relative">
                <input
                  type="text"
                  placeholder="4242 4242 4242 4242"
                  maxLength={19}
                  value={cardNumber}
                  onChange={(event) =>
                    setCardNumber(event.target.value)
                  }
                  className="h-12 w-full border border-[#d8d2cd] bg-white px-4 pr-12 text-sm tracking-wide outline-none transition placeholder:text-[#aaa39e] focus:border-[#8f1d2c] focus:ring-1 focus:ring-[#8f1d2c]"
                />

                <svg
                  className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8f1d2c]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 10h18" />
                </svg>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

              <div>
                <label className="mb-2 block text-[11px] font-bold tracking-[0.16em] text-[#4f4a46]">
                  EXPIRY DATE
                </label>

                <input
                  type="text"
                  placeholder="MM/YY"
                  maxLength={5}
                  value={expiry}
                  onChange={(event) =>
                    setExpiry(event.target.value)
                  }
                  className="h-12 w-full border border-[#d8d2cd] bg-white px-4 text-sm outline-none transition placeholder:text-[#aaa39e] focus:border-[#8f1d2c] focus:ring-1 focus:ring-[#8f1d2c]"
                />
              </div>

              <div>
                <label className="mb-2 block text-[11px] font-bold tracking-[0.16em] text-[#4f4a46]">
                  CVV
                </label>

                <input
                  type="password"
                  placeholder="123"
                  maxLength={4}
                  value={cvv}
                  onChange={(event) =>
                    setCvv(event.target.value)
                  }
                  className="h-12 w-full border border-[#d8d2cd] bg-white px-4 text-sm outline-none transition placeholder:text-[#aaa39e] focus:border-[#8f1d2c] focus:ring-1 focus:ring-[#8f1d2c]"
                />
              </div>

            </div>

            {message && (
              <div className="flex items-start gap-3 border border-[#e8caca] bg-[#fff6f6] px-4 py-4 text-sm text-[#8f1d2c]">
                <svg
                  className="mt-0.5 h-5 w-5 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 8v5M12 16h.01" />
                </svg>

                <span>{message}</span>
              </div>
            )}

            <button
              className="flex h-13 w-full items-center justify-center gap-4 bg-[#8f1d2c] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#741522] disabled:cursor-not-allowed disabled:opacity-60"
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Processing Payment..."
                : `Pay $${booking.totalPrice}`}

              {!loading && (
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              )}
            </button>

          </form>

          <div className="border-t border-[#e1dcd7] bg-[#faf9f7] px-6 py-5 sm:px-8">
            <div className="flex items-start gap-3">
              <svg
                className="mt-0.5 h-5 w-5 shrink-0 text-[#8f1d2c]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <rect x="5" y="10" width="14" height="10" rx="2" />
                <path d="M8 10V7a4 4 0 018 0v3" />
              </svg>

              <p className="text-xs leading-5 text-[#6c6661]">
                This is a mock payment gateway. No real payment will
                be charged.
              </p>
            </div>
          </div>

        </div>

        <aside className="bg-[#171717] text-white lg:sticky lg:top-24">

          <div className="border-b border-[#343434] p-6 sm:p-8">
            <p className="text-xs font-semibold tracking-[0.2em] text-[#d9a400]">
              BOOKING SUMMARY
            </p>

            <h2 className="mt-3 text-2xl font-semibold tracking-tight">
              {booking.roomId?.roomType}
            </h2>

            {booking.roomId?.roomNumber && (
              <p className="mt-2 text-sm text-[#aaa5a0]">
                Room {booking.roomId.roomNumber}
              </p>
            )}
          </div>

          <div className="space-y-0 px-6 sm:px-8">

            <div className="flex items-center justify-between gap-6 border-b border-[#343434] py-5">
              <span className="text-xs text-[#aaa5a0]">
                Booking ID
              </span>

              <strong className="max-w-[180px] truncate text-right text-xs font-semibold text-white">
                {booking.bookingId}
              </strong>
            </div>

            <div className="flex items-center justify-between gap-6 border-b border-[#343434] py-5">
              <span className="text-xs text-[#aaa5a0]">
                Check-in
              </span>

              <strong className="text-right text-sm font-medium text-white">
                {new Date(
                  booking.checkIn
                ).toLocaleDateString()}
              </strong>
            </div>

            <div className="flex items-center justify-between gap-6 border-b border-[#343434] py-5">
              <span className="text-xs text-[#aaa5a0]">
                Check-out
              </span>

              <strong className="text-right text-sm font-medium text-white">
                {new Date(
                  booking.checkOut
                ).toLocaleDateString()}
              </strong>
            </div>

            <div className="flex items-center justify-between gap-6 border-b border-[#343434] py-5">
              <span className="text-xs text-[#aaa5a0]">
                Guests
              </span>

              <strong className="text-sm font-medium text-white">
                {booking.guests}
              </strong>
            </div>

            <div className="flex items-center justify-between gap-6 py-5">
              <span className="text-xs text-[#aaa5a0]">
                Nights
              </span>

              <strong className="text-sm font-medium text-white">
                {booking.nights}
              </strong>
            </div>

          </div>

          <div className="mx-6 h-px bg-[#343434] sm:mx-8" />

          <div className="flex items-end justify-between gap-6 p-6 sm:p-8">
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] text-[#d9a400]">
                TOTAL
              </p>

              <p className="mt-2 text-xs text-[#aaa5a0]">
                Reservation amount
              </p>
            </div>

            <strong className="text-3xl font-semibold tracking-tight text-white">
              ${booking.totalPrice}
            </strong>
          </div>

          <div className="border-t border-[#343434] bg-[#111111] px-6 py-5 sm:px-8">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 bg-[#d9a400]" />

              <p className="text-[10px] font-semibold tracking-[0.15em] text-[#aaa5a0]">
                PAYMENT REQUIRED TO CONFIRM
              </p>
            </div>
          </div>

        </aside>

      </section>

      <section className="border-t border-[#343434] bg-[#171717] px-6 py-12 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold tracking-[0.25em] text-[#d9a400]">
            LUXURYSTAY
          </p>

          <div className="mt-4 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Your stay starts here.
              </h2>

              <p className="mt-2 text-sm text-[#aaa5a0]">
                Secure checkout. Comfortable stay. Memorable experience.
              </p>
            </div>

            <Link
              to="/rooms"
              className="text-sm font-semibold text-white transition hover:text-[#d9a400]"
            >
              Back to Rooms
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}

export default Payment;