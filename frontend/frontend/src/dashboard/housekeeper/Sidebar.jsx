import {
  NavLink,
  useNavigate
} from "react-router-dom";

function Sidebar() {

  const navigate =
    useNavigate();

  const logout = () => {

    localStorage.removeItem(
      "user"
    );

    navigate("/login");

  };

  return (
    <aside className="w-full md:w-64 md:min-h-screen bg-[#171717] text-white flex flex-col shrink-0 border-b md:border-b-0 md:border-r border-[#292929]">

      <div className="px-5 py-5 md:px-6 md:py-7 border-b border-white/10">

        <div className="flex items-center gap-3">

          <div className="w-9 h-9 bg-[#8f1d2c] flex items-center justify-center shrink-0">

            <span className="text-[#d9a400] text-sm font-semibold">
              LS
            </span>

          </div>

          <div>

            <h1 className="text-lg font-semibold tracking-tight">
              LuxuryStay
            </h1>

            <p className="text-[10px] uppercase tracking-[0.16em] text-white/40 mt-0.5">
              Housekeeping
            </p>

          </div>

        </div>

      </div>

      <nav className="flex md:flex-col gap-1.5 p-3 md:p-4 overflow-x-auto">

        <NavLink
          to="/dashboard/housekeeping"
          end
          className={({ isActive }) =>
            `relative flex items-center gap-3 min-w-max md:min-w-0 px-4 py-3 text-sm font-medium transition ${
              isActive
                ? "bg-[#8f1d2c] text-white"
                : "text-white/65 hover:bg-white/7 hover:text-white"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="w-[18px] h-[18px]"
              >
                <path d="M3 10.5L12 4l9 6.5" />
                <path d="M5 10v9h14v-9" />
                <path d="M9 19v-5h6v5" />
              </svg>

              <span>
                Dashboard
              </span>

              {isActive && (
                <span className="absolute right-3 w-1.5 h-1.5 rounded-full bg-[#d9a400]" />
              )}
            </>
          )}
        </NavLink>

        <NavLink
          to="/dashboard/housekeeping/maintenance"
          className={({ isActive }) =>
            `relative flex items-center gap-3 min-w-max md:min-w-0 px-4 py-3 text-sm font-medium transition ${
              isActive
                ? "bg-[#8f1d2c] text-white"
                : "text-white/65 hover:bg-white/7 hover:text-white"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="w-[18px] h-[18px]"
              >
                <path d="M14.7 6.3l3 3" />
                <path d="M4 20l6.8-6.8" />
                <path d="M13.2 4.8a2.8 2.8 0 0 1 4 4L9 17l-4 1 1-4 7.2-7.2Z" />
                <path d="M14 17h6" />
                <path d="M14 21h4" />
              </svg>

              <span>
                Room Maintenance
              </span>

              {isActive && (
                <span className="absolute right-3 w-1.5 h-1.5 rounded-full bg-[#d9a400]" />
              )}
            </>
          )}
        </NavLink>

        <NavLink
          to="/dashboard/housekeeping/complaints"
          className={({ isActive }) =>
            `relative flex items-center gap-3 min-w-max md:min-w-0 px-4 py-3 text-sm font-medium transition ${
              isActive
                ? "bg-[#8f1d2c] text-white"
                : "text-white/65 hover:bg-white/7 hover:text-white"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="w-[18px] h-[18px]"
              >
                <path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H8l-4 2v-4.5A7.5 7.5 0 1 1 20 11.5Z" />
                <path d="M8 10h8" />
                <path d="M8 14h5" />
              </svg>

              <span>
                Room Complaints
              </span>

              {isActive && (
                <span className="absolute right-3 w-1.5 h-1.5 rounded-full bg-[#d9a400]" />
              )}
            </>
          )}
        </NavLink>

      </nav>

      <div className="hidden md:block flex-1" />

      <div className="p-3 md:p-4 border-t border-white/10">

        <button
          type="button"
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-white/60 hover:bg-[#8f1d2c]/20 hover:text-white transition cursor-pointer"
        >

          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="w-[18px] h-[18px]"
          >
            <path d="M10 17l5-5-5-5" />
            <path d="M15 12H3" />
            <path d="M21 19V5a2 2 0 0 0-2-2h-6" />
          </svg>

          <span>
            Logout
          </span>

        </button>

      </div>

    </aside>
  );
}

export default Sidebar;