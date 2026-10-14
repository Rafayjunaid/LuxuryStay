import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function EditProfile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      navigate("/login");
      return;
    }

    const currentUser = JSON.parse(savedUser);

    setUser(currentUser);
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      return;
    }

    setMessage("");
    setLoading(true);

    try {
      const data = new FormData();

      data.append("name", name);
      data.append("email", email);

      if (password) {
        data.append("password", password);
      }

      if (profilePic) {
        data.append("profilePic", profilePic);
      }

      const response = await fetch(
        `http://localhost:5000/api/auth/profile/${user.id}`,
        {
          method: "PUT",
          body: data
        }
      );

      const result = await response.json();

      if (!response.ok) {
        setMessage(result.message);
        setLoading(false);
        return;
      }

      localStorage.setItem("user", JSON.stringify(result.user));

      window.dispatchEvent(new Event("userChanged"));

      setPassword("");
      setProfilePic(null);

      setMessage("Profile updated successfully!");

      setTimeout(() => {
        navigate("/profile");
      }, 800);
    } catch (error) {
      setMessage("Unable to connect to server");
    }

    setLoading(false);
  };

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#f5f5f3] text-[#171717]">
      <section className="bg-[#171717] text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold tracking-[0.25em] text-[#d9a400]">
              LUXURYSTAY MEMBER
            </p>

            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Edit Your
              <span className="block text-[#8f1d2c]">
                Profile
              </span>
            </h1>

            <div className="mt-6 h-1 w-20 bg-[#d9a400]" />

            <p className="mt-6 max-w-2xl text-base leading-7 text-[#d7d7d7] sm:text-lg">
              Keep your personal information up to date
              for a smoother LuxuryStay experience.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-12 sm:py-16 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="border border-[#e1dcd7] bg-white p-8 sm:p-10">
            <p className="text-sm font-semibold tracking-[0.2em] text-[#8f1d2c]">
              ACCOUNT SETTINGS
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight">
              Personal Information
            </h2>

            <div className="mt-5 h-1 w-12 bg-[#d9a400]" />

            <p className="mt-6 text-sm leading-7 text-[#666]">
              Update the information connected to your
              LuxuryStay account. Your changes will be
              reflected across your profile.
            </p>

            <div className="mt-10 border-t border-[#e7e3df] pt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#888]">
                Current Account
              </p>

              <p className="mt-2 break-all text-sm font-medium text-[#171717]">
                {user.email}
              </p>
            </div>
          </div>

          <div className="border border-[#e1dcd7] bg-white p-6 sm:p-10">
            <div className="mb-8">
              <p className="text-sm font-semibold tracking-[0.2em] text-[#8f1d2c]">
                PROFILE DETAILS
              </p>

              <h2 className="mt-3 text-2xl font-semibold">
                Update Your Account
              </h2>
            </div>

            {message && (
              <div className="mb-6 flex items-center gap-3 border border-[#d9a400] bg-[#fffaf0] px-4 py-3 text-sm text-[#171717]">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#d9a400] text-xs font-bold">
                  ✓
                </span>

                <span>{message}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#171717]">
                  Full Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                  className="w-full border border-[#d8d4d0] bg-white px-4 py-3 text-sm text-[#171717] outline-none transition focus:border-[#8f1d2c] focus:ring-1 focus:ring-[#8f1d2c]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#171717]">
                  Email Address
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full border border-[#d8d4d0] bg-white px-4 py-3 text-sm text-[#171717] outline-none transition focus:border-[#8f1d2c] focus:ring-1 focus:ring-[#8f1d2c]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#171717]">
                  New Password
                </label>

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Leave empty to keep current password"
                  minLength="6"
                  className="w-full border border-[#d8d4d0] bg-white px-4 py-3 text-sm text-[#171717] outline-none transition focus:border-[#8f1d2c] focus:ring-1 focus:ring-[#8f1d2c]"
                />

                <p className="mt-2 text-xs text-[#777]">
                  Leave this field empty if you do not want to
                  change your password.
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#171717]">
                  Profile Picture
                </label>

                <label className="flex cursor-pointer items-center justify-between gap-4 border border-dashed border-[#c9c4bf] bg-[#f8f7f5] px-4 py-4 transition hover:border-[#8f1d2c]">
                  <div>
                    <p className="text-sm font-medium text-[#171717]">
                      Choose a new profile picture
                    </p>

                    <p className="mt-1 text-xs text-[#777]">
                      PNG, JPG or WEBP
                    </p>
                  </div>

                  <span className="shrink-0 border border-[#8f1d2c] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#8f1d2c]">
                    Browse
                  </span>

                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/webp"
                    onChange={(e) =>
                      setProfilePic(e.target.files[0])
                    }
                    className="hidden"
                  />
                </label>

                {profilePic && (
                  <p className="mt-2 text-xs text-[#8f1d2c]">
                    {profilePic.name}
                  </p>
                )}
              </div>

              <div className="border-t border-[#e7e3df] pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#8f1d2c] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#741624] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading
                    ? "Saving Changes..."
                    : "Save Changes"}
                </button>

                <Link
                  to="/profile"
                  className="mt-3 block w-full border border-[#d8d4d0] px-6 py-3.5 text-center text-sm font-semibold text-[#171717] transition hover:border-[#171717] hover:bg-[#f5f5f3]"
                >
                  Back to Profile
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="bg-[#171717] px-6 py-10 text-white lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold tracking-[0.25em] text-[#d9a400]">
              LUXURYSTAY
            </p>

            <p className="mt-2 text-sm text-[#aaa]">
              Comfort. Quality. Hospitality.
            </p>
          </div>

          <Link
            to="/profile"
            className="text-sm font-semibold text-white transition hover:text-[#d9a400]"
          >
            Return to Profile
          </Link>
        </div>
      </section>
    </main>
  );
}

export default EditProfile;