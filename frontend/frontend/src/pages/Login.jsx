import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            password
          })
        }
      );

      const result = await response.json();

      if (!response.ok) {
        setMessage(result.message);
        setLoading(false);
        return;
      }

      localStorage.setItem(
        "user",
        JSON.stringify(result.user)
      );

      window.dispatchEvent(
        new Event("userChanged")
      );

      setMessage("Login successful!");

      const rolePaths = {
        guest: "/",
        receptionist: "/dashboard/receptionist",
        admin: "/dashboard/admin",
        manager: "/dashboard/manager",
        housekeeping: "/dashboard/housekeeping"
      };

      setTimeout(() => {
        navigate(
          rolePaths[result.user.role] || "/"
        );
      }, 800);

    } catch (error) {
      setMessage(
        "Unable to connect to server"
      );
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#f5f5f3] text-[#171717]">

      <div className="grid min-h-screen lg:grid-cols-2">

        <section className="relative hidden overflow-hidden bg-[#171717] lg:flex">

          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=85"
            alt="LuxuryStay hotel"
            className="absolute inset-0 h-full w-full object-cover opacity-35"
          />

          <div className="absolute inset-0 bg-[#171717]/75" />

          <div className="relative flex w-full flex-col justify-between p-12 xl:p-16">

            <div>
              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center bg-[#8f1d2c] text-sm font-bold text-white">
                  LS
                </div>

                <div>
                  <p className="text-lg font-semibold text-white">
                    LuxuryStay
                  </p>

                  <p className="text-[10px] tracking-[0.2em] text-[#aaa]">
                    HOTEL & SUITES
                  </p>
                </div>

              </div>
            </div>

            <div className="max-w-xl">

              <p className="text-sm font-semibold tracking-[0.25em] text-[#d9a400]">
                WELCOME BACK
              </p>

              <h1 className="mt-5 text-5xl font-semibold leading-tight text-white xl:text-6xl">
                Your Stay
                <span className="block text-[#8f1d2c]">
                  Awaits
                </span>
              </h1>

              <div className="mt-7 h-1 w-20 bg-[#d9a400]" />

              <p className="mt-7 max-w-lg text-base leading-7 text-[#d5d5d5]">
                Login to your LuxuryStay account and
                continue your journey with us.
              </p>

            </div>

            <p className="text-xs tracking-[0.15em] text-[#777]">
              COMFORT. QUALITY. HOSPITALITY.
            </p>

          </div>

        </section>


        <section className="flex min-h-screen items-center justify-center px-6 py-12 sm:px-10 lg:px-12 xl:px-20">

          <div className="w-full max-w-md">

            <div className="mb-10 lg:hidden">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center bg-[#8f1d2c] text-sm font-bold text-white">
                  LS
                </div>

                <div>
                  <p className="text-lg font-semibold">
                    LuxuryStay
                  </p>

                  <p className="text-[10px] tracking-[0.2em] text-[#888]">
                    HOTEL & SUITES
                  </p>
                </div>

              </div>

            </div>


            <div className="mb-8">

              <p className="text-sm font-semibold tracking-[0.2em] text-[#8f1d2c]">
                MEMBER LOGIN
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Welcome Back
              </h2>

              <div className="mt-5 h-1 w-12 bg-[#d9a400]" />

              <p className="mt-5 text-sm leading-6 text-[#666]">
                Login to your account to manage your
                reservations and LuxuryStay profile.
              </p>

            </div>


            <div className="border border-[#e1dcd7] bg-white p-6 shadow-sm sm:p-8">

              {message && (
                <div
                  className={`mb-6 border px-4 py-3 text-sm leading-6 ${
                    message === "Login successful!"
                      ? "border-[#d9a400] bg-[#fffaf0] text-[#171717]"
                      : "border-[#8f1d2c] bg-[#fff5f6] text-[#8f1d2c]"
                  }`}
                >
                  {message}
                </div>
              )}


              <form
                onSubmit={handleSubmit}
                className="space-y-6"
              >

                <div>

                  <label className="mb-2 block text-sm font-semibold text-[#171717]">
                    Email Address
                  </label>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    placeholder="Enter your email"
                    required
                    className="w-full border border-[#d5d0cb] bg-white px-4 py-3.5 text-sm text-[#171717] outline-none transition placeholder:text-[#999] focus:border-[#8f1d2c] focus:ring-1 focus:ring-[#8f1d2c]"
                  />

                </div>


                <div>

                  <label className="mb-2 block text-sm font-semibold text-[#171717]">
                    Password
                  </label>

                  <input
                    type="password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    placeholder="Enter your password"
                    required
                    className="w-full border border-[#d5d0cb] bg-white px-4 py-3.5 text-sm text-[#171717] outline-none transition placeholder:text-[#999] focus:border-[#8f1d2c] focus:ring-1 focus:ring-[#8f1d2c]"
                  />

                </div>


                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-between bg-[#8f1d2c] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#741624] disabled:cursor-not-allowed disabled:opacity-60"
                >

                  <span>
                    {loading
                      ? "Logging in..."
                      : "Login"}
                  </span>

                  <span className="text-lg">
                    →
                  </span>

                </button>

              </form>


              <div className="mt-7 border-t border-[#e7e3df] pt-6 text-center">

                <p className="text-sm text-[#666]">
                  Don't have an account?
                </p>

                <Link
                  to="/register"
                  className="mt-2 inline-block text-sm font-semibold text-[#8f1d2c] transition hover:text-[#741624]"
                >
                  Create Account →
                </Link>

              </div>

            </div>


            <div className="mt-8 text-center">

              <Link
                to="/"
                className="text-xs font-medium tracking-wide text-[#888] transition hover:text-[#8f1d2c]"
              >
                ← Back to LuxuryStay
              </Link>

            </div>

          </div>

        </section>

      </div>

    </main>
  );
}

export default Login;