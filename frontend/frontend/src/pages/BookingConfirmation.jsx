import {
  Link,
  useLocation
} from "react-router-dom";

import jsPDF from "jspdf";

function BookingConfirmation() {
  const location = useLocation();

  const booking = location.state?.booking;

  const downloadPDF = () => {
    const pdf = new jsPDF();

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(24);
    pdf.text("LuxuryStay", 20, 25);

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(11);
    pdf.text(
      "Hotel Reservation Confirmation",
      20,
      34
    );

    pdf.setDrawColor(143, 29, 44);
    pdf.line(20, 42, 190, 42);

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(20);
    pdf.text(
      "Booking Confirmed",
      20,
      58
    );

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(11);

    pdf.text(
      "Your payment was successful and your reservation has been confirmed.",
      20,
      68
    );

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10);

    pdf.text(
      "BOOKING ID",
      20,
      88
    );

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(13);

    pdf.text(
      booking.bookingId,
      20,
      97
    );

    pdf.setDrawColor(220, 220, 220);
    pdf.line(20, 105, 190, 105);

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10);

    pdf.text(
      "ROOM",
      20,
      120
    );

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(16);

    pdf.text(
      booking.roomId?.roomType ||
        "Luxury Room",
      20,
      130
    );

    pdf.setFontSize(11);

    pdf.text(
      `Room ${booking.roomId?.roomNumber || ""}`,
      20,
      139
    );

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10);

    pdf.text(
      "TOTAL PAID",
      135,
      120
    );

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(18);

    pdf.text(
      `$${booking.totalPrice}`,
      135,
      132
    );

    pdf.setDrawColor(220, 220, 220);
    pdf.line(20, 150, 190, 150);

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10);

    pdf.text(
      "CHECK-IN",
      20,
      166
    );

    pdf.text(
      "CHECK-OUT",
      75,
      166
    );

    pdf.text(
      "GUESTS",
      130,
      166
    );

    pdf.text(
      "NIGHTS",
      165,
      166
    );

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(11);

    pdf.text(
      new Date(
        booking.checkIn
      ).toLocaleDateString(),
      20,
      177
    );

    pdf.text(
      new Date(
        booking.checkOut
      ).toLocaleDateString(),
      75,
      177
    );

    pdf.text(
      String(booking.guests),
      130,
      177
    );

    pdf.text(
      String(booking.nights),
      165,
      177
    );

    pdf.setDrawColor(220, 220, 220);
    pdf.line(20, 190, 190, 190);

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10);

    pdf.text(
      "PAYMENT STATUS",
      20,
      207
    );

    pdf.setTextColor(
      61,
      139,
      64
    );

    pdf.setFontSize(12);

    pdf.text(
      "PAID",
      20,
      217
    );

    pdf.setTextColor(
      0,
      0,
      0
    );

    pdf.setDrawColor(
      143,
      29,
      44
    );

    pdf.line(
      20,
      230,
      190,
      230
    );

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);

    pdf.text(
      "Thank you for choosing LuxuryStay.",
      20,
      245
    );

    pdf.text(
      "We look forward to welcoming you.",
      20,
      253
    );

    pdf.save(
      `LuxuryStay-${booking.bookingId}.pdf`
    );
  };

  if (!booking) {
    return (
      <main className="min-h-screen bg-[#f5f5f3] px-5 py-16 text-[#171717]">
        <div className="mx-auto flex min-h-[65vh] max-w-xl items-center justify-center">
          <div className="w-full border border-[#e1dcd7] bg-white px-6 py-12 text-center shadow-[0_15px_40px_rgba(23,23,23,0.05)] sm:px-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center border border-[#e1dcd7] text-[#8f1d2c]">
              <svg
                className="h-7 w-7"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <rect
                  x="4"
                  y="3"
                  width="16"
                  height="18"
                  rx="1"
                />
                <path d="M8 8h8" />
                <path d="M8 12h8" />
                <path d="M8 16h5" />
              </svg>
            </div>

            <p className="mt-7 text-xs font-bold tracking-[0.25em] text-[#8f1d2c]">
              LUXURYSTAY
            </p>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight">
              Booking Not Found
            </h1>

            <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[#666]">
              Please check your bookings to view your
              reservation details.
            </p>

            <Link
              to="/rooms"
              className="mt-7 inline-flex items-center gap-3 bg-[#8f1d2c] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#731622]"
            >
              Browse Rooms

              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M5 12h14" />
                <path d="m13 6 6 6-6 6" />
              </svg>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f5f3] text-[#171717]">
      <section className="bg-[#171717]">
        <div className="mx-auto max-w-5xl px-5 py-16 text-center sm:px-8 lg:py-20">
          <div className="mx-auto flex h-16 w-16 items-center justify-center border border-[#d9a400] text-[#d9a400]">
            <svg
              className="h-8 w-8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M5 12.5 9.5 17 19 7.5" />
            </svg>
          </div>

          <p className="mt-7 text-xs font-bold tracking-[0.3em] text-[#d9a400]">
            LUXURYSTAY
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Booking Confirmed
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/60 sm:text-base">
            Your payment was successful and your reservation
            has been confirmed.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-10 sm:px-8 lg:py-14">
        <div className="border border-[#e1dcd7] bg-white shadow-[0_18px_45px_rgba(23,23,23,0.06)]">
          <div className="flex flex-col gap-5 border-b border-[#e5e0db] px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] text-[#777]">
                BOOKING ID
              </p>

              <p className="mt-2 break-all text-sm font-semibold text-[#171717] sm:text-base">
                {booking.bookingId}
              </p>
            </div>

            <div className="inline-flex w-fit items-center gap-2 border border-[#c9dfca] bg-[#f4faf4] px-3 py-2 text-[10px] font-bold tracking-[0.15em] text-[#3d8b40]">
              <span className="h-2 w-2 rounded-full bg-[#3d8b40]" />
              CONFIRMED
            </div>
          </div>

          <div className="grid gap-8 px-6 py-8 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] text-[#8f1d2c]">
                ROOM
              </p>

              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#171717]">
                {booking.roomId?.roomType}
              </h2>

              <p className="mt-2 text-sm text-[#666]">
                Room {booking.roomId?.roomNumber}
              </p>
            </div>

            <div className="border-l-2 border-[#d9a400] pl-5 lg:min-w-[160px]">
              <p className="text-[10px] font-bold tracking-[0.2em] text-[#777]">
                TOTAL PAID
              </p>

              <p className="mt-2 text-3xl font-semibold text-[#171717]">
                ${booking.totalPrice}
              </p>
            </div>
          </div>

          <div className="grid border-y border-[#e5e0db] sm:grid-cols-2 lg:grid-cols-4">
            <div className="border-b border-[#e5e0db] px-6 py-6 sm:border-r lg:border-b-0">
              <p className="text-[10px] font-bold tracking-[0.18em] text-[#777]">
                CHECK-IN
              </p>

              <p className="mt-2 text-sm font-semibold text-[#171717]">
                {new Date(
                  booking.checkIn
                ).toLocaleDateString()}
              </p>
            </div>

            <div className="border-b border-[#e5e0db] px-6 py-6 lg:border-b-0 lg:border-r">
              <p className="text-[10px] font-bold tracking-[0.18em] text-[#777]">
                CHECK-OUT
              </p>

              <p className="mt-2 text-sm font-semibold text-[#171717]">
                {new Date(
                  booking.checkOut
                ).toLocaleDateString()}
              </p>
            </div>

            <div className="border-b border-[#e5e0db] px-6 py-6 sm:border-r lg:border-b-0">
              <p className="text-[10px] font-bold tracking-[0.18em] text-[#777]">
                GUESTS
              </p>

              <p className="mt-2 text-sm font-semibold text-[#171717]">
                {booking.guests}
              </p>
            </div>

            <div className="px-6 py-6">
              <p className="text-[10px] font-bold tracking-[0.18em] text-[#777]">
                NIGHTS
              </p>

              <p className="mt-2 text-sm font-semibold text-[#171717]">
                {booking.nights}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] text-[#777]">
                PAYMENT STATUS
              </p>

              <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-[#3d8b40]">
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12.5 9.5 17 19 7.5" />
                </svg>

                PAID
              </div>
            </div>

            <p className="text-sm text-[#777]">
              Thank you for choosing LuxuryStay.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <button
            type="button"
            onClick={downloadPDF}
            className="flex h-14 items-center justify-center gap-3 bg-[#8f1d2c] px-5 text-sm font-semibold text-white transition hover:bg-[#731622] sm:col-span-1"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <path d="M12 3v12" />
              <path d="m7 10 5 5 5-5" />
              <path d="M5 21h14" />
            </svg>

            Download PDF
          </button>

          <Link
            to="/rooms"
            className="flex h-14 items-center justify-center border border-[#d8d3ce] bg-white px-5 text-sm font-semibold text-[#171717] transition hover:border-[#8f1d2c] hover:text-[#8f1d2c]"
          >
            Browse More Rooms
          </Link>

          <Link
            to="/profile"
            className="flex h-14 items-center justify-center border border-[#d8d3ce] bg-white px-5 text-sm font-semibold text-[#171717] transition hover:border-[#8f1d2c] hover:text-[#8f1d2c]"
          >
            Go to Profile
          </Link>
        </div>

        <div className="mt-10 border-t border-[#ddd8d3] pt-7 text-center">
          <p className="text-xs leading-6 text-[#777]">
            Your reservation details are available in your
            profile. Please keep your booking ID for future
            reference.
          </p>
        </div>
      </section>
    </main>
  );
}

export default BookingConfirmation;