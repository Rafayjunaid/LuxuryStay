import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#171717] text-white">

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-14 sm:py-16">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1fr] gap-10 lg:gap-20">

          <div className="max-w-md">
            <Link
              to="/"
              className="inline-flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-lg bg-[#8f1d2c] flex items-center justify-center">
                <span className="text-[#d9a400] text-sm font-semibold">
                  LS
                </span>
              </div>

              <div className="leading-none">
                <span className="block text-xl font-semibold tracking-tight">
                  Luxury
                  <span className="text-[#d9a400]">
                    Stay
                  </span>
                </span>

                <span className="block text-[9px] uppercase tracking-[0.2em] text-white/40 mt-1">
                  Hotel & Suites
                </span>
              </div>
            </Link>

            <p className="text-sm sm:text-base leading-7 text-white/55 mt-6">
              Experience comfort, elegance and unforgettable hospitality
              at LuxuryStay.
            </p>

            <div className="w-12 h-[2px] bg-[#8f1d2c] mt-7" />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#d9a400] mb-5">
              Explore
            </p>

            <div className="flex flex-col gap-3">
              <Link
                to="/"
                className="text-sm text-white/60 hover:text-white transition"
              >
                Home
              </Link>

              <Link
                to="/about"
                className="text-sm text-white/60 hover:text-white transition"
              >
                About Us
              </Link>

              <Link
                to="/rooms"
                className="text-sm text-white/60 hover:text-white transition"
              >
                Available Rooms
              </Link>

              <Link
                to="/gallery"
                className="text-sm text-white/60 hover:text-white transition"
              >
                Gallery
              </Link>

              <Link
                to="/feedback"
                className="text-sm text-white/60 hover:text-white transition"
              >
                Guest Feedback
              </Link>

              <Link
                to="/contact"
                className="text-sm text-white/60 hover:text-white transition"
              >
                Contact
              </Link>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#d9a400] mb-5">
              Contact
            </p>

            <div className="space-y-5">

              <div className="flex items-start gap-3">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  className="w-5 h-5 text-[#8f1d2c] shrink-0 mt-0.5"
                >
                  <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>

                <p className="text-sm leading-6 text-white/60">
                  Karachi, Pakistan
                </p>
              </div>

              <div className="flex items-start gap-3">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  className="w-5 h-5 text-[#8f1d2c] shrink-0 mt-0.5"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3.08 5.18 2 2 0 0 1 5.08 3h3a2 2 0 0 1 2 1.72c.12.9.34 1.78.65 2.63a2 2 0 0 1-.45 2.11L9 10.73a16 16 0 0 0 4.27 4.27l1.27-1.28a2 2 0 0 1 2.11-.45c.85.31 1.73.53 2.63.65A2 2 0 0 1 22 16.92Z" />
                </svg>

                <p className="text-sm leading-6 text-white/60">
                  +92 300 1234567
                </p>
              </div>

              <div className="flex items-start gap-3">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  className="w-5 h-5 text-[#8f1d2c] shrink-0 mt-0.5"
                >
                  <rect
                    x="3"
                    y="5"
                    width="18"
                    height="14"
                    rx="2"
                  />
                  <path d="m3 7 9 6 9-6" />
                </svg>

                <p className="text-sm leading-6 text-white/60">
                  info@luxurystay.com
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-xs sm:text-sm text-white/40">
            © 2026 LuxuryStay. All rights reserved.
          </p>

          <p className="text-xs sm:text-sm text-white/30">
            Comfort. Quality. Hospitality.
          </p>
        </div>
      </div>

    </footer>
  );
}

export default Footer;
