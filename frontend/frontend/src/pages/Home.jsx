import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="min-h-screen bg-[#f5f5f3] text-[#171717]">

      <section className="relative min-h-[680px] overflow-hidden bg-[#171717]">

        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1800&q=85"
          alt="LuxuryStay hotel"
          className="absolute inset-0 h-full w-full object-cover opacity-45"
        />

        <div className="absolute inset-0 bg-[#171717]/65" />

        <div className="relative mx-auto flex min-h-[680px] max-w-7xl items-center px-6 lg:px-8">

          <div className="max-w-3xl py-20 text-white">

            <p className="text-sm font-semibold tracking-[0.25em] text-[#d9a400]">
              WELCOME TO LUXURYSTAY
            </p>

            <h1 className="mt-5 text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Where Luxury
              <span className="block text-[#8f1d2c]">
                Meets Comfort
              </span>
            </h1>

            <div className="mt-7 h-1 w-20 bg-[#d9a400]" />

            <p className="mt-7 max-w-2xl text-base leading-7 text-[#e0e0e0] sm:text-lg">
              Discover an unforgettable stay with elegant rooms,
              exceptional hospitality and everything you need
              to relax in comfort.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">

              <Link
                to="/rooms"
                className="inline-flex items-center justify-center bg-[#8f1d2c] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#741624]"
              >
                Explore Rooms
                <span className="ml-5 text-lg">
                  →
                </span>
              </Link>

              <Link
                to="/about"
                className="inline-flex items-center justify-center border border-white/40 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-white hover:bg-white hover:text-[#171717]"
              >
                Discover More
              </Link>

            </div>

          </div>

        </div>

        <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-[#171717]/70">
          <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-white/10 sm:grid-cols-4">

            <div className="px-5 py-5 text-center sm:text-left">
              <p className="text-xl font-semibold text-white">
                Luxury
              </p>
              <p className="mt-1 text-xs text-[#aaa]">
                Designed for comfort
              </p>
            </div>

            <div className="px-5 py-5 text-center sm:text-left">
              <p className="text-xl font-semibold text-white">
                Quality
              </p>
              <p className="mt-1 text-xs text-[#aaa]">
                Attention to detail
              </p>
            </div>

            <div className="px-5 py-5 text-center sm:text-left">
              <p className="text-xl font-semibold text-white">
                Service
              </p>
              <p className="mt-1 text-xs text-[#aaa]">
                Guest focused
              </p>
            </div>

            <div className="px-5 py-5 text-center sm:text-left">
              <p className="text-xl font-semibold text-white">
                Comfort
              </p>
              <p className="mt-1 text-xs text-[#aaa]">
                Made to feel like home
              </p>
            </div>

          </div>
        </div>

      </section>


      <section className="bg-white">

        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-24">

          <div>

            <p className="text-sm font-semibold tracking-[0.2em] text-[#8f1d2c]">
              WELCOME
            </p>

            <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              A Stay You'll
              <span className="block">
                Remember
              </span>
            </h2>

            <div className="mt-6 h-1 w-12 bg-[#d9a400]" />

          </div>

          <div className="max-w-2xl">

            <p className="text-base leading-8 text-[#444]">
              LuxuryStay is designed for guests who appreciate
              comfort, elegance and exceptional service.
            </p>

            <p className="mt-5 text-base leading-8 text-[#666]">
              From peaceful rooms to premium facilities, every
              detail is designed to make your stay comfortable,
              relaxing and memorable.
            </p>

            <Link
              to="/about"
              className="mt-8 inline-flex items-center gap-4 text-sm font-semibold text-[#8f1d2c] transition hover:text-[#741624]"
            >
              Learn More
              <span className="text-lg">
                →
              </span>
            </Link>

          </div>

        </div>

      </section>


      <section className="border-y border-[#e1dcd7] bg-[#f5f5f3]">

        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">

          <div className="mx-auto max-w-2xl text-center">

            <p className="text-sm font-semibold tracking-[0.2em] text-[#8f1d2c]">
              OUR SERVICES
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Everything You Need
            </h2>

            <div className="mx-auto mt-5 h-1 w-12 bg-[#d9a400]" />

            <p className="mt-6 text-sm leading-7 text-[#666] sm:text-base">
              Thoughtfully designed spaces and services created
              around your comfort.
            </p>

          </div>


          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            <div className="border border-[#e1dcd7] bg-white p-7 transition hover:-translate-y-1 hover:border-[#8f1d2c]">

              <div className="flex h-12 w-12 items-center justify-center bg-[#171717] text-white">

                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    d="M3 10h18v8H3z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 18v2M21 18v2M5 10V7a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v3"
                    strokeLinecap="round"
                  />
                </svg>

              </div>

              <p className="mt-6 text-xs font-semibold tracking-[0.15em] text-[#8f1d2c]">
                01
              </p>

              <h3 className="mt-2 text-xl font-semibold">
                Luxury Rooms
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#666]">
                Beautifully designed rooms with premium
                comfort and a relaxing atmosphere.
              </p>

            </div>


            <div className="border border-[#e1dcd7] bg-white p-7 transition hover:-translate-y-1 hover:border-[#8f1d2c]">

              <div className="flex h-12 w-12 items-center justify-center bg-[#171717] text-white">

                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    d="M4 10h16M6 10V6h12v4M5 10v8M19 10v8M3 18h18"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 6V4M16 6V4"
                    strokeLinecap="round"
                  />
                </svg>

              </div>

              <p className="mt-6 text-xs font-semibold tracking-[0.15em] text-[#8f1d2c]">
                02
              </p>

              <h3 className="mt-2 text-xl font-semibold">
                Fine Dining
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#666]">
                Enjoy carefully prepared meals and a dining
                experience designed around quality.
              </p>

            </div>


            <div className="border border-[#e1dcd7] bg-white p-7 transition hover:-translate-y-1 hover:border-[#8f1d2c]">

              <div className="flex h-12 w-12 items-center justify-center bg-[#171717] text-white">

                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    d="M3 15c2.5-3 5.5-3 8 0s5.5 3 8 0"
                    strokeLinecap="round"
                  />
                  <path
                    d="M5 18c2 2 4 2 6 0s4-2 6 0 4 2 6 0"
                    strokeLinecap="round"
                  />
                  <path
                    d="M12 4v7M9 7l3-3 3 3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

              </div>

              <p className="mt-6 text-xs font-semibold tracking-[0.15em] text-[#8f1d2c]">
                03
              </p>

              <h3 className="mt-2 text-xl font-semibold">
                Swimming Pool
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#666]">
                Relax and refresh yourself in a comfortable
                space designed for unwinding.
              </p>

            </div>


            <div className="border border-[#e1dcd7] bg-white p-7 transition hover:-translate-y-1 hover:border-[#8f1d2c]">

              <div className="flex h-12 w-12 items-center justify-center bg-[#171717] text-white">

                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    d="M12 3c2 3 5 5 5 9a5 5 0 1 1-10 0c0-4 3-6 5-9Z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 13c1 1 1.5 2 1.5 3"
                    strokeLinecap="round"
                  />
                </svg>

              </div>

              <p className="mt-6 text-xs font-semibold tracking-[0.15em] text-[#8f1d2c]">
                04
              </p>

              <h3 className="mt-2 text-xl font-semibold">
                Spa & Wellness
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#666]">
                Take some time for yourself with peaceful
                wellness services and relaxing spaces.
              </p>

            </div>

          </div>

        </div>

      </section>


      <section className="bg-[#171717] text-white">

        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">

          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <p className="text-sm font-semibold tracking-[0.2em] text-[#d9a400]">
                YOUR PERFECT STAY AWAITS
              </p>

              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Make Your Next Stay
                <span className="block text-[#8f1d2c]">
                  Truly Special
                </span>
              </h2>

            </div>

            <div className="flex flex-col gap-3 sm:flex-row">

              <Link
                to="/rooms"
                className="inline-flex items-center justify-center bg-[#8f1d2c] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#741624]"
              >
                Explore Rooms
                <span className="ml-5 text-lg">
                  →
                </span>
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center justify-center border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-white"
              >
                Contact Us
              </Link>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}

export default Home;