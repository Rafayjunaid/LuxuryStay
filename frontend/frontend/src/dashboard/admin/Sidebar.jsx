import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const menuItems = [
    {
      label: "Dashboard",
      path: "/dashboard/admin"
    },
    {
      label: "Users",
      path: "/dashboard/admin/users"
    },
    {
      label: "Rooms",
      path: "/dashboard/admin/rooms"
    },
    {
      label: "Reservations",
      path: "/dashboard/admin/reservations"
    },
    {
      label: "Payments",
      path: "/dashboard/admin/payments"
    },
    {
      label: "Invoices",
      path: "/dashboard/admin/invoices"
    },
    {
      label: "Feedback",
      path: "/dashboard/admin/feedback"
    },
    {
      label: "Complaints",
      path: "/dashboard/admin/complaints"
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <aside className="w-full md:w-64 md:min-h-screen bg-[#171717] text-white flex-shrink-0">

      <div className="px-6 py-7 border-b border-white/10">

        <h1 className="text-xl font-semibold tracking-wide">
          LuxuryStay
        </h1>

        <p className="text-xs text-gray-400 mt-1 uppercase tracking-[0.15em]">
          Admin Panel
        </p>

      </div>

      <nav className="p-4">

        <p className="px-3 mb-3 text-[10px] uppercase tracking-[0.18em] text-gray-500">
          Management
        </p>

        <div className="space-y-1">

          {menuItems.map((item) => (

            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/dashboard/admin"}
              className={({ isActive }) =>
                `block px-3 py-3 text-sm transition ${
                  isActive
                    ? "bg-[#8f1d2c] text-white"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              {item.label}
            </NavLink>

          ))}

        </div>

        <div className="border-t border-white/10 mt-6 pt-5">

          <button
            type="button"
            onClick={handleLogout}
            className="w-full text-left px-3 py-3 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition"
          >
            Logout
          </button>

        </div>

      </nav>

    </aside>
  );
}

export default Sidebar;