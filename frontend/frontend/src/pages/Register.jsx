import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [profilePic, setProfilePic] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      const data = new FormData();

      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("password", formData.password);

      if (profilePic) {
        data.append("profilePic", profilePic);
      }

      const response = await fetch(
        "http://localhost:5000/api/auth/signup",
        {
          method: "POST",
          body: data
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

      setMessage("Account created successfully!");

      setFormData({
        name: "",
        email: "",
        password: ""
      });

      setProfilePic(null);

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      setMessage("Unable to connect to server");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#f5f5f3] text-[#171717]">

      <div className="grid min-h-screen lg:grid-cols-2">

        <section className="relative hidden overflow-hidden bg-[#171717] lg:flex">

          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945"
            alt="LuxuryStay hotel"
            className="absolute inset-0 h-full w-full object-cover opacity-35"
          />

          <div className="absolute inset-0 bg-[#171717]/80" />

          <div className="relative z-10 flex w-full flex-col justify-between p-10 xl:p-14">

            <Link
              to="/"
              className="flex w-fit items-center gap-3"
            >
              <span className="flex h-11 w-11 items-center justify-center bg-[#8f1d2c] text-sm font-bold text-white">
                LS
              </span>

              <div>
                <span className="block text-lg font-semibold tracking-wide text-white">
                  LuxuryStay
                </span>

                <span className="block text-[9px] tracking-[0.2em] text-[#aaa5a0]">
                  HOTEL & SUITES
                </span>
              </div>
            </Link>

            <div className="max-w-xl">

              <p className="text-xs font-semibold tracking-[0.25em] text-[#d9a400]">
                JOIN LUXURYSTAY
              </p>

              <h1 className="mt-5 text-5xl font-semibold leading-[1.05] tracking-tight text-white xl:text-6xl">
                Begin Your{" "}
                <span className="text-[#8f1d2c]">
                  Experience
                </span>
              </h1>

              <div className="mt-7 h-[2px] w-20 bg-[#d9a400]" />

              <p className="mt-7 max-w-lg text-sm leading-7 text-[#d2cfcc]">
                Create your LuxuryStay account and enjoy
                a comfortable, refined and memorable
                hotel experience.
              </p>

            </div>

            <div className="flex items-center gap-8 text-[10px] font-semibold tracking-[0.16em] text-[#aaa5a0]">

              <span>
                COMFORT
              </span>

              <span className="h-1 w-1 bg-[#8f1d2c]" />

              <span>
                QUALITY
              </span>

              <span className="h-1 w-1 bg-[#8f1d2c]" />

              <span>
                HOSPITALITY
              </span>

            </div>

          </div>

        </section>

        <section className="flex min-h-screen items-center justify-center px-6 py-10 sm:px-10">

          <div className="w-full max-w-xl">

            <div className="mb-8 lg:hidden">

              <Link
                to="/"
                className="flex w-fit items-center gap-3"
              >
                <span className="flex h-10 w-10 items-center justify-center bg-[#8f1d2c] text-xs font-bold text-white">
                  LS
                </span>

                <div>
                  <span className="block text-lg font-semibold">
                    LuxuryStay
                  </span>

                  <span className="block text-[8px] tracking-[0.2em] text-[#77716c]">
                    HOTEL & SUITES
                  </span>
                </div>
              </Link>

            </div>

            <div className="border border-[#e1dcd7] bg-white">

              <div className="border-b border-[#e1dcd7] p-6 sm:p-8">

                <p className="text-xs font-semibold tracking-[0.2em] text-[#8f1d2c]">
                  CREATE ACCOUNT
                </p>

                <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                  Welcome to LuxuryStay
                </h2>

                <div className="mt-5 h-[2px] w-14 bg-[#d9a400]" />

                <p className="mt-5 text-sm leading-6 text-[#6c6661]">
                  Create your account to manage reservations,
                  view your stays and enjoy the LuxuryStay experience.
                </p>

              </div>

              <div className="p-6 sm:p-8">

                {message && (
                  <div
                    className={`mb-6 border px-4 py-3 text-sm ${
                      message === "Account created successfully!"
                        ? "border-[#d8e5d9] bg-[#f6fbf6] text-[#37643d]"
                        : "border-[#e8caca] bg-[#fff6f6] text-[#8f1d2c]"
                    }`}
                  >
                    {message}
                  </div>
                )}

                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >

                  <div>
                    <label className="mb-2 block text-[10px] font-bold tracking-[0.16em] text-[#4f4a46]">
                      FULL NAME
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                      className="h-12 w-full border border-[#d8d2cd] bg-white px-4 text-sm outline-none transition placeholder:text-[#aaa39e] focus:border-[#8f1d2c] focus:ring-1 focus:ring-[#8f1d2c]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-[10px] font-bold tracking-[0.16em] text-[#4f4a46]">
                      EMAIL ADDRESS
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                      className="h-12 w-full border border-[#d8d2cd] bg-white px-4 text-sm outline-none transition placeholder:text-[#aaa39e] focus:border-[#8f1d2c] focus:ring-1 focus:ring-[#8f1d2c]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-[10px] font-bold tracking-[0.16em] text-[#4f4a46]">
                      PASSWORD
                    </label>

                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a password"
                      minLength="6"
                      required
                      className="h-12 w-full border border-[#d8d2cd] bg-white px-4 text-sm outline-none transition placeholder:text-[#aaa39e] focus:border-[#8f1d2c] focus:ring-1 focus:ring-[#8f1d2c]"
                    />

                    <p className="mt-2 text-[11px] text-[#88817b]">
                      Password must contain at least 6 characters.
                    </p>
                  </div>

                  <div>
                    <label className="mb-2 block text-[10px] font-bold tracking-[0.16em] text-[#4f4a46]">
                      PROFILE PICTURE
                    </label>

                    <label className="flex min-h-12 cursor-pointer items-center justify-between gap-4 border border-[#d8d2cd] bg-[#faf9f7] px-4 py-3 transition hover:border-[#8f1d2c]">

                      <span className="min-w-0 truncate text-sm text-[#6c6661]">
                        {profilePic
                          ? profilePic.name
                          : "Choose a profile picture"}
                      </span>

                      <span className="shrink-0 bg-[#171717] px-4 py-2 text-[10px] font-bold tracking-[0.12em] text-white">
                        BROWSE
                      </span>

                      <input
                        type="file"
                        accept="image/png, image/jpeg, image/webp"
                        className="hidden"
                        onChange={(e) =>
                          setProfilePic(
                            e.target.files[0]
                          )
                        }
                      />

                    </label>

                    <p className="mt-2 text-[11px] text-[#88817b]">
                      PNG, JPG or WEBP
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex h-13 w-full items-center justify-center gap-3 bg-[#8f1d2c] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#741522] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading
                      ? "Creating Account..."
                      : "Create Account"}

                    {!loading && (
                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    )}
                  </button>

                </form>

                <div className="mt-7 border-t border-[#e1dcd7] pt-6 text-center">

                  <p className="text-sm text-[#6c6661]">
                    Already have an account?{" "}

                    <Link
                      to="/login"
                      className="font-semibold text-[#8f1d2c] transition hover:text-[#741522]"
                    >
                      Login
                    </Link>
                  </p>

                </div>

              </div>

            </div>

            <Link
              to="/"
              className="mt-6 flex items-center justify-center gap-2 text-xs font-semibold text-[#6c6661] transition hover:text-[#8f1d2c]"
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

              Back to LuxuryStay
            </Link>

          </div>

        </section>

      </div>

    </main>
  );
}

export default Register;