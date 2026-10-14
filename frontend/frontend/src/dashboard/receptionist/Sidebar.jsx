import {
  useEffect,
  useState
} from "react";

import {
  NavLink,
  useNavigate
} from "react-router-dom";

function Sidebar() {

  const navigate = useNavigate();

  const [newFeedback, setNewFeedback] =
    useState(false);

  const checkPendingFeedback =
    async () => {

      try {

        const response =
          await fetch(
            "http://localhost:5000/api/feedback/admin"
          );

        const data =
          await response.json();

        if (!Array.isArray(data)) {
          return;
        }

        const pendingFeedback =
          data.filter(
            (item) =>
              item.status === "pending"
          );

        const seenFeedback =
          JSON.parse(
            localStorage.getItem(
              "seenFeedback"
            ) || "[]"
          );

        const hasUnreadFeedback =
          pendingFeedback.some(
            (item) =>
              !seenFeedback.includes(
                item._id
              )
          );

        setNewFeedback(
          hasUnreadFeedback
        );

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    checkPendingFeedback();

    const interval =
      setInterval(
        checkPendingFeedback,
        3000
      );

    return () =>
      clearInterval(interval);

  }, []);

  const openFeedback =
    async () => {

      try {

        const response =
          await fetch(
            "http://localhost:5000/api/feedback/admin"
          );

        const data =
          await response.json();

        if (Array.isArray(data)) {

          const pendingIds =
            data
              .filter(
                (item) =>
                  item.status === "pending"
              )
              .map(
                (item) =>
                  item._id
              );

          localStorage.setItem(
            "seenFeedback",
            JSON.stringify(
              pendingIds
            )
          );

        }

      } catch (error) {

        console.log(error);

      }

      setNewFeedback(false);

      navigate(
        "/dashboard/receptionist/feedback"
      );

    };

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
              Reception
            </p>

          </div>

        </div>

      </div>

      <nav className="flex md:flex-col gap-1.5 p-3 md:p-4 overflow-x-auto">

        <NavLink
          to="/dashboard/receptionist"
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
          to="/dashboard/receptionist/rooms"
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
                <path d="M8 19v-5h8v5" />
                <path d="M8 14h8" />
              </svg>

              <span>
                Rooms
              </span>

              {isActive && (
                <span className="absolute right-3 w-1.5 h-1.5 rounded-full bg-[#d9a400]" />
              )}

            </>
          )}

        </NavLink>

        <NavLink
          to="/dashboard/receptionist/guests"
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
                <path d="M16 20v-1.5a4.5 4.5 0 0 0-4.5-4.5h-3A4.5 4.5 0 0 0 4 18.5V20" />
                <circle
                  cx="10"
                  cy="7"
                  r="3"
                />
                <path d="M16 11a3 3 0 1 0 0-6" />
                <path d="M17 14.5a4.5 4.5 0 0 1 3 4.25V20" />
              </svg>

              <span>
                Guests
              </span>

              {isActive && (
                <span className="absolute right-3 w-1.5 h-1.5 rounded-full bg-[#d9a400]" />
              )}

            </>
          )}

        </NavLink>

        <NavLink
          to="/dashboard/receptionist/reservations"
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
                <rect
                  x="4"
                  y="5"
                  width="16"
                  height="15"
                  rx="1"
                />

                <path d="M8 3v4" />
                <path d="M16 3v4" />
                <path d="M4 9h16" />
                <path d="M8 13h3" />
                <path d="M8 17h5" />

              </svg>

              <span>
                Reservations
              </span>

              {isActive && (
                <span className="absolute right-3 w-1.5 h-1.5 rounded-full bg-[#d9a400]" />
              )}

            </>
          )}

        </NavLink>

        {/* <NavLink
          to="/dashboard/receptionist/billing"
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
                <rect
                  x="4"
                  y="3"
                  width="16"
                  height="18"
                  rx="1"
                />

                <path d="M8 7h8" />
                <path d="M8 11h2" />
                <path d="M14 11h2" />
                <path d="M8 15h2" />
                <path d="M14 15h2" />
                <path d="M8 19h8" />

              </svg>

              <span>
                Billing
              </span>

              {isActive && (
                <span className="absolute right-3 w-1.5 h-1.5 rounded-full bg-[#d9a400]" />
              )}

            </>
          )}

        </NavLink> */}

        <NavLink
          to="/dashboard/receptionist/complaints"
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
                Complaints
              </span>

              {isActive && (
                <span className="absolute right-3 w-1.5 h-1.5 rounded-full bg-[#d9a400]" />
              )}

            </>
          )}

        </NavLink>

        <button
          type="button"
          onClick={openFeedback}
          className="relative flex items-center justify-between gap-3 min-w-max md:min-w-0 px-4 py-3 text-sm font-medium text-white/65 hover:bg-white/7 hover:text-white transition cursor-pointer"
        >

          <span className="flex items-center gap-3">

            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="w-[18px] h-[18px]"
            >
              <path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H8l-4 2v-4.5A7.5 7.5 0 1 1 20 11.5Z" />
              <path d="M8 11h8" />
              <path d="M8 14h5" />
            </svg>

            <span>
              Feedback
            </span>

          </span>

          {newFeedback && (

            <span className="relative flex h-3 w-3 ml-2">

              <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-70 animate-ping" />

              <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500 shadow-[0_0_5px_#ef4444,0_0_12px_#ef4444,0_0_20px_#ef4444]" />

            </span>

          )}

        </button>

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
