import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AvailableRooms() {
  const [rooms, setRooms] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("1");
  const [type, setType] = useState("all");

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const getRooms = async () => {
    setLoading(true);
    setMessage("");

    try {
      const params = new URLSearchParams();

      if (checkIn) {
        params.append("checkIn", checkIn);
      }

      if (checkOut) {
        params.append("checkOut", checkOut);
      }

      if (guests) {
        params.append("guests", guests);
      }

      if (type !== "all") {
        params.append("type", type);
      }

      const response = await fetch(
        `http://localhost:5000/api/rooms?${params.toString()}`
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message);
        setRooms([]);
        setLoading(false);
        return;
      }

      setRooms(data);
    } catch (error) {
      setMessage("Unable to load rooms right now.");
    }

    setLoading(false);
  };

  const getRoomTypes = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/rooms/types"
      );

      const data = await response.json();

      if (response.ok) {
        setRoomTypes(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRooms();
    getRoomTypes();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    if (checkIn && checkOut && checkIn >= checkOut) {
      setMessage("Please select a valid check-out date.");
      return;
    }

    getRooms();
  };

  const handleClear = () => {
    setCheckIn("");
    setCheckOut("");
    setGuests("1");
    setType("all");
    setMessage("");

    setTimeout(() => {
      getRooms();
    }, 0);
  };

  const availableRooms = rooms.filter((room) => room.available);

  return (
    <main className="min-h-screen bg-[#f5f5f3] text-[#171717]">
      <section className="relative overflow-hidden bg-[#171717]">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="max-w-3xl">
            <p className="mb-5 text-sm font-semibold tracking-[0.3em] text-[#d9a400]">
              LUXURYSTAY COLLECTION
            </p>

            <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Find Your
              <br />
              <span className="text-[#8f1d2c]">Perfect Stay</span>
            </h1>

            <div className="mt-7 h-1 w-16 bg-[#d9a400]" />

            <p className="mt-7 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
              Discover elegant rooms and suites designed around comfort,
              privacy and unforgettable experiences.
            </p>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto -mt-8 max-w-7xl px-5 sm:px-8 lg:px-12">
        <form
          onSubmit={handleSearch}
          className="border border-[#e3dfdb] bg-white p-5 shadow-[0_15px_45px_rgba(23,23,23,0.08)] lg:p-6"
        >
          <div className="grid gap-5 lg:grid-cols-[1fr_1fr_0.9fr_1fr_auto]">
            <div>
              <label className="mb-2 block text-[11px] font-bold tracking-[0.18em] text-[#777]">
                CHECK-IN
              </label>

              <input
                type="date"
                min={today}
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="h-12 w-full border border-[#ddd8d3] bg-white px-4 text-sm text-[#171717] outline-none transition focus:border-[#8f1d2c]"
              />
            </div>

            <div>
              <label className="mb-2 block text-[11px] font-bold tracking-[0.18em] text-[#777]">
                CHECK-OUT
              </label>

              <input
                type="date"
                min={checkIn || today}
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="h-12 w-full border border-[#ddd8d3] bg-white px-4 text-sm text-[#171717] outline-none transition focus:border-[#8f1d2c]"
              />
            </div>

            <div>
              <label className="mb-2 block text-[11px] font-bold tracking-[0.18em] text-[#777]">
                GUESTS
              </label>

              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="h-12 w-full border border-[#ddd8d3] bg-white px-4 text-sm text-[#171717] outline-none transition focus:border-[#8f1d2c]"
              >
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests</option>
                <option value="5">5 Guests</option>
                <option value="6">6 Guests</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-[11px] font-bold tracking-[0.18em] text-[#777]">
                ROOM TYPE
              </label>

              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="h-12 w-full border border-[#ddd8d3] bg-white px-4 text-sm text-[#171717] outline-none transition focus:border-[#8f1d2c]"
              >
                <option value="all">All Rooms</option>

                {roomTypes.map((roomType) => (
                  <option key={roomType} value={roomType}>
                    {roomType}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end gap-3 lg:flex-col">
              <button
                type="submit"
                className="h-12 flex-1 bg-[#8f1d2c] px-6 text-sm font-semibold text-white transition hover:bg-[#731622] lg:w-full"
              >
                Search Rooms
              </button>

              <button
                type="button"
                onClick={handleClear}
                className="h-12 border border-[#d8d3ce] bg-white px-6 text-sm font-semibold text-[#171717] transition hover:border-[#8f1d2c] hover:text-[#8f1d2c] lg:w-full"
              >
                Clear
              </button>
            </div>
          </div>
        </form>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="mb-10 flex flex-col gap-6 border-b border-[#ddd8d3] pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-xs font-bold tracking-[0.25em] text-[#8f1d2c]">
              OUR ROOMS
            </p>

            <h2 className="text-4xl font-semibold leading-tight tracking-tight text-[#171717] sm:text-5xl">
              Stay Somewhere
              <br />
              Exceptional
            </h2>
          </div>

          <div className="text-sm font-medium text-[#666]">
            {checkIn && checkOut
              ? `${availableRooms.length} rooms available for your dates`
              : `${availableRooms.length} rooms available`}
          </div>
        </div>

        {message && (
          <div className="mb-8 border-l-4 border-[#8f1d2c] bg-white px-5 py-4 text-sm text-[#555] shadow-sm">
            {message}
          </div>
        )}

        {loading ? (
          <div className="flex min-h-[300px] flex-col items-center justify-center bg-white border border-[#e3dfdb]">
            <div className="h-9 w-9 animate-spin rounded-full border-2 border-[#ddd8d3] border-t-[#8f1d2c]" />

            <p className="mt-5 text-sm text-[#666]">
              Finding your perfect room...
            </p>
          </div>
        ) : availableRooms.length === 0 ? (
          <div className="border border-[#e3dfdb] bg-white px-6 py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center border border-[#e1dcd7] text-[#8f1d2c]">
              <svg
                className="h-7 w-7"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <path d="M3 11h18" />
                <path d="M5 11V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4" />
                <path d="M3 19v-8h18v8" />
                <path d="M5 19v-2" />
                <path d="M19 19v-2" />
              </svg>
            </div>

            <h3 className="mt-6 text-2xl font-semibold text-[#171717]">
              No rooms available
            </h3>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#777]">
              Try changing your dates, guest count or room type to find
              another available room.
            </p>

            <button
              onClick={handleClear}
              className="mt-7 bg-[#8f1d2c] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#731622]"
            >
              View All Rooms
            </button>
          </div>
        ) : (
          <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
            {availableRooms.map((room) => (
              <article
                key={room._id}
                className="group overflow-hidden border border-[#e1dcd7] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(23,23,23,0.08)]"
              >
                <div className="relative h-72 overflow-hidden bg-[#e9e5e1]">
                  <img
                    src={
                      room.photos && room.photos.length > 0
                        ? room.photos[0]
                        : "https://images.unsplash.com/photo-1611892440504-42a792e24d32"
                    }
                    alt={room.roomType}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />

                  <div className="absolute left-4 top-4 flex items-center gap-2 bg-white px-3 py-2 text-xs font-semibold text-[#171717] shadow-sm">
                    <span className="h-2 w-2 rounded-full bg-[#3d8b40]" />
                    Available
                  </div>

                  <div className="absolute bottom-4 right-4 bg-[#171717] px-4 py-3 text-white">
                    <div className="text-lg font-semibold">
                      ${room.price}
                    </div>

                    <div className="text-[10px] uppercase tracking-[0.16em] text-white/60">
                      Per Night
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between gap-4 border-b border-[#e8e3de] pb-5">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8f1d2c]">
                        {room.roomType}
                      </p>

                      <h3 className="mt-2 text-2xl font-semibold text-[#171717]">
                        Room {room.roomNumber}
                      </h3>
                    </div>

                    <div className="flex shrink-0 items-center gap-2 text-xs font-medium text-[#666]">
                      <svg
                        className="h-4 w-4 text-[#8f1d2c]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                      >
                        <circle cx="12" cy="8" r="3" />
                        <path d="M5 20c.8-3.4 3.2-5 7-5s6.2 1.6 7 5" />
                      </svg>

                      {room.capacity} Guests
                    </div>
                  </div>

                  <p className="mt-5 min-h-[72px] text-sm leading-6 text-[#666]">
                    {room.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {room.amenities.slice(0, 4).map((amenity) => (
                      <span
                        key={amenity}
                        className="border border-[#e1dcd7] bg-[#f8f7f5] px-3 py-2 text-[11px] font-medium text-[#555]"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 border-t border-[#e8e3de] pt-5">
                    <Link
                      to={`/room/${room._id}`}
                      className="flex items-center justify-between bg-[#171717] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#8f1d2c]"
                    >
                      <span>View Room Details</span>

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
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default AvailableRooms;