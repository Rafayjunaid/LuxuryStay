import { NavLink } from "react-router-dom";

function Sidebar() {
  const navItem = ({ isActive }) =>
    `flex items-center gap-3 min-w-max md:min-w-0 px-4 py-3 text-sm font-medium transition ${
      isActive
        ? "bg-[#8f1d2c] text-white"
        : "text-white/65 hover:bg-white/5 hover:text-white"
    }`;

  return (
    <aside className="w-full md:w-64 bg-[#171717] text-white shrink-0">
      <div className="px-5 py-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#8f1d2c] flex items-center justify-center">
            <span className="text-[#d9a400] text-sm font-semibold">
              LS
            </span>
          </div>

          <div>
            <p className="text-sm font-semibold">
              LuxuryStay
            </p>

            <p className="text-[10px] uppercase tracking-[0.14em] text-white/40">
              Manager Portal
            </p>
          </div>
        </div>
      </div>

      <nav className="md:py-3 flex md:block overflow-x-auto">

        <NavLink
          to="/dashboard/manager"
          end
          className={navItem}
        >
          <span className="w-1.5 h-1.5 bg-white/40" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/dashboard/manager/rooms"
          className={navItem}
        >
          <span className="w-1.5 h-1.5 bg-white/40" />
          <span>Rooms</span>
        </NavLink>

        <NavLink
          to="/dashboard/manager/guests"
          className={navItem}
        >
          <span className="w-1.5 h-1.5 bg-white/40" />
          <span>Guests</span>
        </NavLink>

        <NavLink
          to="/dashboard/manager/reservations"
          className={navItem}
        >
          <span className="w-1.5 h-1.5 bg-white/40" />
          <span>Reservations</span>
        </NavLink>

        <NavLink
          to="/dashboard/manager/payments"
          className={navItem}
        >
          <span className="w-1.5 h-1.5 bg-white/40" />
          <span>Payments</span>
        </NavLink>

        <NavLink
          to="/dashboard/manager/feedback"
          className={navItem}
        >
          <span className="w-1.5 h-1.5 bg-white/40" />
          <span>Feedback</span>
        </NavLink>

        <NavLink
          to="/dashboard/manager/complaints"
          className={navItem}
        >
          <span className="w-1.5 h-1.5 bg-white/40" />
          <span>Complaints</span>
        </NavLink>

        <NavLink
          to="/dashboard/manager/logout"
          className={navItem}
        >
          <span className="w-1.5 h-1.5 bg-white/40" />
          <span>Logout</span>
        </NavLink>

      </nav>
    </aside>
  );
}

export default Sidebar;