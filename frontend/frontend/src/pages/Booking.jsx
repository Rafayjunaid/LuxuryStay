import { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate
} from "react-router-dom";

function Booking() {
  const location = useLocation();
  const navigate = useNavigate();

  const room = location.state?.room;

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  const [nights, setNights] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!room) {
      navigate("/rooms");
    }
  }, [room, navigate]);

  useEffect(() => {
    if (!checkIn || !checkOut) {
      setNights(0);
      setTotalPrice(0);
      return;
    }

    const start = new Date(checkIn);
    const end = new Date(checkOut);

    if (end <= start) {
      setNights(0);
      setTotalPrice(0);
      return;
    }

    const difference = end.getTime() - start.getTime();

    const calculatedNights = Math.ceil(
      difference / (1000 * 60 * 60 * 24)
    );

    setNights(calculatedNights);
    setTotalPrice(calculatedNights * room.price);
  }, [checkIn, checkOut, room]);

  if (!room) {
    return null;
  }

  const today = new Date().toISOString().split("T")[0];

  const handleContinue = async () => {
    setMessage("");

    if (!user) {
      navigate("/login");
      return;
    }

    if (!checkIn || !checkOut) {
      setMessage(
        "Please select your check-in and check-out dates."
      );
      return;
    }

    if (new Date(checkOut) <= new Date(checkIn)) {
      setMessage(
        "Check-out date must be after check-in date."
      );
      return;
    }

    if (guests > room.capacity) {
      setMessage(
        `This room can accommodate up to ${room.capacity} guests.`
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/rooms?" +
          new URLSearchParams({
            checkIn,
            checkOut,
            guests,
            type: room.roomType
          })
      );

      const rooms = await response.json();

      if (!response.ok) {
        setMessage(
          rooms.message || "Unable to check availability."
        );
        setLoading(false);
        return;
      }

      const selectedRoom = rooms.find(
        (item) => item._id === room._id
      );

      if (!selectedRoom || !selectedRoom.available) {
        setMessage(
          "Sorry, this room is not available for these dates."
        );
        setLoading(false);
        return;
      }

      const bookingResponse = await fetch(
        "http://localhost:5000/api/bookings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userId: user.id,
            roomId: room._id,
            checkIn,
            checkOut,
            guests
          })
        }
      );

      const bookingData = await bookingResponse.json();

      if (!bookingResponse.ok) {
        setMessage(
          bookingData.message || "Unable to create booking."
        );
        setLoading(false);
        return;
      }

      navigate("/payment", {
        state: {
          booking: bookingData.booking
        }
      });
    } catch (error) {
      setMessage(
        "Something went wrong. Please try again."
      );
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#f5f5f3] text-[#171717]">
      <section className="bg-[#171717]">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
          <div className="max-w-3xl">
            <p className="mb-4 text-xs font-bold tracking-[0.3em] text-[#d9a400]">
              LUXURYSTAY RESERVATION
            </p>

            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Complete your stay.
            </h1>

            <div className="mt-6 h-1 w-14 bg-[#8f1d2c]" />

            <p className="mt-6 max-w-xl text-base leading-7 text-white/65">
              Select your dates and guests to continue with
              your reservation.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-12 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="border border-[#e1dcd7] bg-white">
            <div className="border-b border-[#e5e0db] px-6 py-7 sm:px-8">
              <p className="text-xs font-bold tracking-[0.25em] text-[#8f1d2c]">
                YOUR STAY
              </p>

              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#171717]">
                Reservation Details
              </h2>
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex flex-col gap-5 border border-[#e3ded9] bg-[#faf9f7] p-4 sm:flex-row sm:items-center">
                <div className="h-32 w-full shrink-0 overflow-hidden sm:h-28 sm:w-40">
                  <img
                    src={
                      room.photos?.[0] ||
                      "https://images.unsplash.com/photo-1611892440504-42a792e24d32"
                    }
                    alt={room.roomType}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8f1d2c]">
                    {room.roomType}
                  </p>

                  <h3 className="mt-1 text-2xl font-semibold text-[#171717]">
                    Room {room.roomNumber}
                  </h3>

                  <div className="mt-3 flex items-center gap-3">
                    <span className="text-lg font-semibold text-[#171717]">
                      ${room.price}
                    </span>

                    <span className="text-sm text-[#777]">
                      per night
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <p className="mb-5 text-xs font-bold tracking-[0.2em] text-[#777]">
                  SELECT YOUR DATES
                </p>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-[11px] font-bold tracking-[0.18em] text-[#666]">
                      CHECK-IN
                    </label>

                    <input
                      type="date"
                      min={today}
                      value={checkIn}
                      onChange={(event) =>
                        setCheckIn(event.target.value)
                      }
                      className="h-13 w-full border border-[#dcd6d1] bg-white px-4 text-sm text-[#171717] outline-none transition focus:border-[#8f1d2c]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-[11px] font-bold tracking-[0.18em] text-[#666]">
                      CHECK-OUT
                    </label>

                    <input
                      type="date"
                      min={checkIn || today}
                      value={checkOut}
                      onChange={(event) =>
                        setCheckOut(event.target.value)
                      }
                      className="h-13 w-full border border-[#dcd6d1] bg-white px-4 text-sm text-[#171717] outline-none transition focus:border-[#8f1d2c]"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-[#e6e1dc] pt-8">
                <p className="mb-5 text-xs font-bold tracking-[0.2em] text-[#777]">
                  GUEST DETAILS
                </p>

                <div className="max-w-sm">
                  <label className="mb-2 block text-[11px] font-bold tracking-[0.18em] text-[#666]">
                    NUMBER OF GUESTS
                  </label>

                  <select
                    value={guests}
                    onChange={(event) =>
                      setGuests(Number(event.target.value))
                    }
                    className="h-13 w-full border border-[#dcd6d1] bg-white px-4 text-sm text-[#171717] outline-none transition focus:border-[#8f1d2c]"
                  >
                    {Array.from(
                      {
                        length: room.capacity
                      },
                      (_, index) => (
                        <option
                          key={index + 1}
                          value={index + 1}
                        >
                          {index + 1}{" "}
                          {index === 0 ? "Guest" : "Guests"}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>

              {message && (
                <div className="mt-7 flex items-start gap-3 border-l-4 border-[#8f1d2c] bg-[#faf5f5] px-5 py-4 text-sm leading-6 text-[#555]">
                  <svg
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#8f1d2c]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 8v5" />
                    <path d="M12 16h.01" />
                  </svg>

                  <span>{message}</span>
                </div>
              )}
            </div>
          </div>

          <aside className="h-fit border border-[#e1dcd7] bg-[#171717] text-white lg:sticky lg:top-24">
            <div className="border-b border-white/10 p-7 sm:p-8">
              <p className="text-xs font-bold tracking-[0.25em] text-[#d9a400]">
                RESERVATION SUMMARY
              </p>

              <h2 className="mt-3 text-2xl font-semibold">
                {room.roomType}
              </h2>

              <p className="mt-1 text-sm text-white/50">
                Room {room.roomNumber}
              </p>
            </div>

            <div className="p-7 sm:p-8">
              <div className="space-y-5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/55">
                    Guests
                  </span>

                  <strong className="font-medium">
                    {guests}
                  </strong>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/55">
                    Nights
                  </span>

                  <strong className="font-medium">
                    {nights}
                  </strong>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/55">
                    Price / night
                  </span>

                  <strong className="font-medium">
                    ${room.price}
                  </strong>
                </div>
              </div>

              <div className="my-7 h-px bg-white/10" />

              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[11px] font-bold tracking-[0.2em] text-white/45">
                    TOTAL
                  </p>

                  <p className="mt-2 text-sm text-white/50">
                    Before payment
                  </p>
                </div>

                <strong className="text-3xl font-semibold text-white">
                  ${totalPrice}
                </strong>
              </div>

              <button
                onClick={handleContinue}
                disabled={loading}
                className="mt-8 flex h-14 w-full items-center justify-between bg-[#8f1d2c] px-5 text-sm font-semibold text-white transition hover:bg-[#a32234] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span>
                  {loading
                    ? "Checking..."
                    : "Continue to Payment"}
                </span>

                {!loading && (
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="M5 12h14" />
                    <path d="m13 6 6 6-6 6" />
                  </svg>
                )}
              </button>

              <Link
                to={`/room/${room._id}`}
                className="mt-5 flex items-center justify-center gap-2 text-sm font-medium text-white/55 transition hover:text-white"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M19 12H5" />
                  <path d="m11 18-6-6 6-6" />
                </svg>

                Back to Room
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

export default Booking;