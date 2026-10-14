import Sidebar from "./Sidebar";

function Home() {

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#f5f5f3] text-[#171717]">

      <Sidebar />


      <main className="flex-1 min-w-0">

        <div className="px-5 py-6 md:px-8 md:py-8">

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-7">

            <div>

              <p className="text-xs uppercase tracking-[0.18em] text-gray-400 mb-2">
                Front Desk
              </p>

              <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
                Receptionist Dashboard
              </h1>

              <p className="text-sm text-gray-500 mt-1">
                Daily guest services and reception operations
              </p>

            </div>


            <div className="text-sm">

              <p className="text-xs uppercase tracking-wider text-gray-400">
                Department
              </p>

              <p className="font-medium text-gray-800 mt-1">
                Reception & Guest Services
              </p>

            </div>

          </div>


          <div className="border border-gray-200 bg-white mb-7">

            <div className="grid grid-cols-1 sm:grid-cols-3">

              <div className="px-5 py-4 border-b sm:border-b-0 sm:border-r border-gray-200">

                <div className="flex items-center gap-2">

                  <span className="w-2 h-2 rounded-full bg-green-500" />

                  <p className="text-xs uppercase tracking-wider text-gray-400">
                    Rooms
                  </p>

                </div>

                <p className="text-sm font-semibold text-gray-800 mt-2">
                  Availability
                </p>

                <p className="text-xs text-gray-400 mt-0.5">
                  Check current room status
                </p>

              </div>


              <div className="px-5 py-4 border-b sm:border-b-0 sm:border-r border-gray-200">

                <div className="flex items-center gap-2">

                  <span className="w-2 h-2 rounded-full bg-[#d9a400]" />

                  <p className="text-xs uppercase tracking-wider text-gray-400">
                    Guest Services
                  </p>

                </div>

                <p className="text-sm font-semibold text-gray-800 mt-2">
                  Active
                </p>

                <p className="text-xs text-gray-400 mt-0.5">
                  Reception operations
                </p>

              </div>


              <div className="px-5 py-4">

                <div className="flex items-center gap-2">

                  <span className="w-2 h-2 rounded-full bg-[#8f1d2c]" />

                  <p className="text-xs uppercase tracking-wider text-gray-400">
                    Feedback
                  </p>

                </div>

                <p className="text-sm font-semibold text-gray-800 mt-2">
                  Guest Reviews
                </p>

                <p className="text-xs text-gray-400 mt-0.5">
                  Monitor customer experiences
                </p>

              </div>

            </div>

          </div>


          <div className="mb-3">

            <p className="text-xs uppercase tracking-[0.16em] text-gray-400">
              Reception Operations
            </p>

            <h2 className="text-lg font-semibold text-gray-900 mt-1">
              Quick Access
            </h2>

          </div>


          <div className="border border-gray-200 bg-white">

            <div
              onClick={() =>
                window.location.href =
                  "/dashboard/receptionist/rooms"
              }
              className="group px-5 py-5 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition"
            >

              <div className="flex items-center gap-4">

                <div className="w-9 h-9 bg-[#171717] text-white flex items-center justify-center shrink-0">

                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="w-4 h-4"
                  >
                    <path d="M3 10.5L12 4l9 6.5" />
                    <path d="M5 10v9h14v-9" />
                    <path d="M9 19v-5h6v5" />
                  </svg>

                </div>


                <div className="flex-1 min-w-0">

                  <h3 className="text-sm font-semibold text-gray-900">
                    Room Management
                  </h3>

                  <p className="text-xs text-gray-500 mt-1">
                    Check availability, reservations, and current room occupancy.
                  </p>

                </div>


                <span className="text-gray-400 group-hover:text-[#8f1d2c] group-hover:translate-x-1 transition">
                  →
                </span>

              </div>

            </div>


            <div
              onClick={() =>
                window.location.href =
                  "/dashboard/receptionist/feedback"
              }
              className="group px-5 py-5 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition"
            >

              <div className="flex items-center gap-4">

                <div className="w-9 h-9 bg-[#8f1d2c] text-white flex items-center justify-center shrink-0">

                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="w-4 h-4"
                  >
                    <path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H8l-4 2v-4.5A7.5 7.5 0 1 1 20 11.5Z" />
                    <path d="M8 11h8" />
                    <path d="M8 14h5" />
                  </svg>

                </div>


                <div className="flex-1 min-w-0">

                  <h3 className="text-sm font-semibold text-gray-900">
                    Customer Feedback
                  </h3>

                  <p className="text-xs text-gray-500 mt-1">
                    Review, approve, or block guest feedback.
                  </p>

                </div>


                <span className="text-gray-400 group-hover:text-[#8f1d2c] group-hover:translate-x-1 transition">
                  →
                </span>

              </div>

            </div>


            <div
              className="group px-5 py-5 hover:bg-gray-50 transition"
            >

              <div className="flex items-center gap-4">

                <div className="w-9 h-9 bg-[#d9a400] text-[#171717] flex items-center justify-center shrink-0">

                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="w-4 h-4"
                  >
                    <path d="M16 20v-1.5a4.5 4.5 0 0 0-4.5-4.5h-3A4.5 4.5 0 0 0 4 18.5V20" />
                    <circle cx="10" cy="7" r="3" />
                    <path d="M16 11a3 3 0 1 0 0-6" />
                    <path d="M17 14.5a4.5 4.5 0 0 1 3 4.25V20" />
                  </svg>

                </div>


                <div className="flex-1 min-w-0">

                  <h3 className="text-sm font-semibold text-gray-900">
                    Guest Management
                  </h3>

                  <p className="text-xs text-gray-500 mt-1">
                    Access guest information and handle front desk activities.
                  </p>

                </div>


                <span className="text-gray-300">
                  Coming soon
                </span>

              </div>

            </div>

          </div>


          <div className="mt-7 border border-[#292929] bg-[#171717] px-5 py-5">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

              <div>

                <p className="text-[10px] uppercase tracking-[0.18em] text-[#d9a400] font-semibold">
                  LuxuryStay
                </p>

                <p className="text-sm font-medium text-white mt-1">
                  Guest experience starts at the front desk.
                </p>

                <p className="text-xs text-white/50 mt-1">
                  Keep rooms organized and guest services running smoothly.
                </p>

              </div>


              <div className="text-xs text-white/40">
                Reception Panel
              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Home;