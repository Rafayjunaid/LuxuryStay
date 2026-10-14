import { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate
} from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const checkUser = () => {
      const savedUser = localStorage.getItem("user");

      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        setUser(null);
      }
    };

    checkUser();

    window.addEventListener(
      "userChanged",
      checkUser
    );

    return () => {
      window.removeEventListener(
        "userChanged",
        checkUser
      );
    };
  }, [location]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const handleLogout = async () => {
    try {
      await fetch(
        "http://localhost:5000/api/auth/logout",
        {
          method: "POST"
        }
      );
    } catch (error) {
      console.log(error);
    }

    localStorage.removeItem("user");

    setUser(null);

    navigate("/login");
  };

  const navItems = [
    {
      name: "Home",
      path: "/"
    },
    {
      name: "About Us",
      path: "/about"
    },
    {
      name: "Feedback",
      path: "/feedback"
    },
    {
      name: "Available Rooms",
      path: "/rooms"
    },
    {
      name: "Gallery",
      path: "/gallery"
    },
    {
      name: "Contact",
      path: "/contact"
    }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-[#e8e4e0]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

        <div className="h-[76px] flex items-center justify-between gap-6">

          <Link
            to="/"
            className="flex items-center gap-3 shrink-0"
          >
            <div className="w-9 h-9 rounded-lg bg-[#171717] flex items-center justify-center">
              <span className="text-[#d9a400] text-sm font-semibold">
                LS
              </span>
            </div>

            <div className="leading-none">
              <span className="block text-xl font-semibold tracking-tight text-[#171717]">
                Luxury
                <span className="text-[#8f1d2c]">
                  Stay
                </span>
              </span>

              <span className="block text-[9px] uppercase tracking-[0.2em] text-[#999] mt-1">
                Hotel & Suites
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-7">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative py-2 text-sm font-medium transition ${
                  location.pathname === item.path
                    ? "text-[#8f1d2c]"
                    : "text-[#555] hover:text-[#8f1d2c]"
                }`}
              >
                {item.name}

                {location.pathname === item.path && (
                  <span className="absolute left-0 right-0 -bottom-1 h-[2px] bg-[#8f1d2c]" />
                )}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2 shrink-0">
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="px-4 py-2.5 text-sm font-semibold text-[#444] hover:text-[#8f1d2c] transition"
                >
                  Profile
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="px-5 py-2.5 rounded-lg bg-[#8f1d2c] text-white text-sm font-semibold hover:bg-[#751724] transition cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2.5 text-sm font-semibold text-[#444] hover:text-[#8f1d2c] transition"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="px-5 py-2.5 rounded-lg bg-[#8f1d2c] text-white text-sm font-semibold hover:bg-[#751724] transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden w-10 h-10 rounded-lg border border-[#dedbd7] flex items-center justify-center text-[#333] hover:border-[#8f1d2c] hover:text-[#8f1d2c] transition cursor-pointer"
            aria-label="Toggle navigation"
          >
            {menuOpen ? (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="w-5 h-5"
              >
                <path d="M6 6l12 12" />
                <path d="M18 6L6 18" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="w-5 h-5"
              >
                <path d="M4 7h16" />
                <path d="M4 12h16" />
                <path d="M4 17h16" />
              </svg>
            )}
          </button>

        </div>

        {menuOpen && (
          <div className="lg:hidden border-t border-[#eeeae6] py-4">

            <div className="flex flex-col">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-3 rounded-lg text-sm font-medium transition ${
                    location.pathname === item.path
                      ? "bg-[#f6eeee] text-[#8f1d2c]"
                      : "text-[#555] hover:bg-[#f7f7f5]"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="border-t border-[#eeeae6] mt-3 pt-4 flex gap-2">
              {user ? (
                <>
                  <Link
                    to="/profile"
                    className="flex-1 text-center px-4 py-2.5 rounded-lg border border-[#dedbd7] text-sm font-semibold text-[#444]"
                  >
                    Profile
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex-1 px-4 py-2.5 rounded-lg bg-[#8f1d2c] text-white text-sm font-semibold cursor-pointer"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="flex-1 text-center px-4 py-2.5 rounded-lg border border-[#dedbd7] text-sm font-semibold text-[#444]"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    className="flex-1 text-center px-4 py-2.5 rounded-lg bg-[#8f1d2c] text-white text-sm font-semibold"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>

          </div>
        )}

      </div>
    </nav>
  );
}

export default Navbar;
