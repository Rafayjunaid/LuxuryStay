import { useEffect, useState } from "react";
import {
  Link,
  useParams,
  useNavigate
} from "react-router-dom";

function RoomDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [activePhoto, setActivePhoto] = useState(0);

  useEffect(() => {
    const getRoom = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/rooms/${id}`
        );

        const data = await response.json();

        if (!response.ok) {
          setMessage(data.message);
          setLoading(false);
          return;
        }

        setRoom(data);
      } catch (error) {
        setMessage("Unable to load room details.");
      }

      setLoading(false);
    };

    getRoom();
  }, [id]);

  const handleReserve = () => {
    const user = localStorage.getItem("user");

    if (!user) {
      navigate("/login");
      return;
    }

    navigate("/booking", {
      state: {
        room
      }
    });
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f5f5f3]">
        <div className="text-center">

          <div className="mx-auto h-10 w-10 animate-spin border-2 border-[#e1dcd7] border-t-[#8f1d2c]" />

          <p className="mt-5 text-sm text-[#6c6661]">
            Loading room details...
          </p>

        </div>
      </main>
    );
  }

  if (message || !room) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f5f5f3] px-6">
        <div className="w-full max-w-xl border border-[#e1dcd7] bg-white p-8 text-center sm:p-12">

          <p className="text-xs font-bold tracking-[0.22em] text-[#8f1d2c]">
            LUXURYSTAY
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[#171717]">
            Room Not Found
          </h1>

          <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[#6c6661]">
            We couldn't find the room you're looking for.
            It may no longer be available.
          </p>

          <Link
            to="/rooms"
            className="mt-8 inline-flex items-center gap-3 bg-[#8f1d2c] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#741522]"
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
      </main>
    );
  }

  const photos =
    room.photos && room.photos.length > 0
      ? room.photos
      : [
          "https://images.unsplash.com/photo-1611892440504-42a792e24d32"
        ];

  const isLoggedIn = Boolean(
    localStorage.getItem("user")
  );

  return (
    <main className="min-h-screen bg-white text-[#171717]">

      <section className="relative overflow-hidden bg-[#171717]">

        <div className="absolute inset-0 bg-[#171717]/80" />

        <div className="relative mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10 lg:py-20">

          <Link
            to="/rooms"
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-[#d8d3cf] transition hover:text-white"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M19 12H5M11 18l-6-6 6-6" />
            </svg>

            Back to Available Rooms
          </Link>

          <div className="mt-10 max-w-3xl">

            <p className="text-xs font-bold tracking-[0.25em] text-[#d9a400]">
              LUXURYSTAY COLLECTION
            </p>

            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {room.roomType}
            </h1>

            <div className="mt-6 h-[2px] w-20 bg-[#8f1d2c]" />

            <p className="mt-5 text-sm text-[#c8c3be]">
              Room {room.roomNumber}
            </p>

          </div>

        </div>

      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-10 lg:py-16">

        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">

          <div>

            <div className="relative overflow-hidden bg-[#f5f5f3]">

              <img
                src={photos[activePhoto]}
                alt={room.roomType}
                className="aspect-[4/3] h-full w-full object-cover"
              />

              <div className="absolute left-5 top-5 flex items-center gap-2 bg-white px-4 py-2 text-xs font-semibold text-[#171717] shadow-sm">

                <span className="h-2 w-2 bg-[#3f8f50]" />

                Available

              </div>

              <div className="absolute bottom-5 right-5 bg-[#171717] px-4 py-2 text-xs font-semibold text-white">
                {activePhoto + 1} / {photos.length}
              </div>

            </div>

            {photos.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-5">

                {photos.map((photo, index) => (
                  <button
                    key={photo}
                    type="button"
                    onClick={() => setActivePhoto(index)}
                    className={`relative overflow-hidden border-2 bg-[#f5f5f3] ${
                      activePhoto === index
                        ? "border-[#8f1d2c]"
                        : "border-transparent"
                    }`}
                  >

                    <img
                      src={photo}
                      alt={`${room.roomType} ${index + 1}`}
                      className="aspect-square w-full object-cover"
                    />

                  </button>
                ))}

              </div>
            )}

          </div>

          <div className="flex flex-col">

            <div className="flex flex-col gap-6 border-b border-[#e1dcd7] pb-7 sm:flex-row sm:items-start sm:justify-between">

              <div>

                <p className="text-xs font-bold tracking-[0.2em] text-[#8f1d2c]">
                  {room.roomType}
                </p>

                <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                  Room {room.roomNumber}
                </h2>

              </div>

              <div className="sm:text-right">

                <strong className="text-3xl font-semibold text-[#171717]">
                  ${room.price}
                </strong>

                <span className="ml-1 text-sm text-[#77716c]">
                  / night
                </span>

              </div>

            </div>

            <div className="grid grid-cols-1 border-b border-[#e1dcd7] sm:grid-cols-3">

              <div className="border-b border-[#e1dcd7] py-5 sm:border-b-0 sm:border-r sm:pr-5">

                <span className="block text-[10px] font-bold tracking-[0.16em] text-[#88817b]">
                  CAPACITY
                </span>

                <strong className="mt-2 block text-sm font-semibold">
                  {room.capacity} Guests
                </strong>

              </div>

              <div className="border-b border-[#e1dcd7] py-5 sm:border-b-0 sm:px-5 sm:border-r">

                <span className="block text-[10px] font-bold tracking-[0.16em] text-[#88817b]">
                  ROOM TYPE
                </span>

                <strong className="mt-2 block text-sm font-semibold">
                  {room.roomType}
                </strong>

              </div>

              <div className="py-5 sm:pl-5">

                <span className="block text-[10px] font-bold tracking-[0.16em] text-[#88817b]">
                  AVAILABILITY
                </span>

                <strong className="mt-2 block text-sm font-semibold text-[#3f8f50]">
                  Available
                </strong>

              </div>

            </div>

            <div className="border-b border-[#e1dcd7] py-7">

              <p className="text-[10px] font-bold tracking-[0.2em] text-[#8f1d2c]">
                ABOUT THIS ROOM
              </p>

              <p className="mt-4 text-sm leading-7 text-[#625d58]">
                {room.description}
              </p>

            </div>

            <div className="border-b border-[#e1dcd7] py-7">

              <p className="text-[10px] font-bold tracking-[0.2em] text-[#8f1d2c]">
                ROOM AMENITIES
              </p>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">

                {room.amenities.map((amenity) => (
                  <div
                    className="flex items-center gap-3 border border-[#e1dcd7] bg-[#f8f7f5] px-4 py-3"
                    key={amenity}
                  >

                    <span className="flex h-5 w-5 shrink-0 items-center justify-center bg-[#8f1d2c] text-[10px] font-bold text-white">
                      ✓
                    </span>

                    <span className="min-w-0 text-sm text-[#4f4a46]">
                      {amenity}
                    </span>

                  </div>
                ))}

              </div>

            </div>

            <div className="mt-7 flex flex-col gap-5 border border-[#e1dcd7] bg-[#f5f5f3] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">

              <div>

                <span className="block text-[10px] font-bold tracking-[0.18em] text-[#88817b]">
                  FROM
                </span>

                <div className="mt-1">

                  <strong className="text-2xl font-semibold">
                    ${room.price}
                  </strong>

                  <span className="ml-1 text-sm text-[#77716c]">
                    / night
                  </span>

                </div>

              </div>

              <button
                className="flex w-full items-center justify-center gap-3 bg-[#8f1d2c] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#741522] sm:w-auto"
                type="button"
                onClick={handleReserve}
              >

                {isLoggedIn
                  ? "Reserve Room"
                  : "Login to Book"}

                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>

              </button>

            </div>

          </div>

        </div>

      </section>

      <section className="border-y border-[#e1dcd7] bg-[#f5f5f3]">

        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:px-8 lg:grid-cols-2 lg:px-10 lg:py-20">

          <div>

            <p className="text-xs font-bold tracking-[0.22em] text-[#8f1d2c]">
              THE LUXURYSTAY EXPERIENCE
            </p>

            <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              Designed for
              <br />
              unforgettable stays.
            </h2>

            <div className="mt-6 h-[2px] w-16 bg-[#d9a400]" />

          </div>

          <div className="flex items-center">

            <p className="text-sm leading-7 text-[#625d58]">
              Every LuxuryStay room is thoughtfully
              designed to give guests a refined,
              comfortable and relaxing experience.
              From carefully selected amenities to
              elegant interiors, every detail is
              created with your stay in mind.
            </p>

          </div>

        </div>

      </section>

    </main>
  );
}

export default RoomDetails;