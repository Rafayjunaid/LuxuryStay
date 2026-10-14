import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleCancel = () => {
    navigate("/dashboard/manager");
  };

  return (
    <div className="min-h-screen bg-[#f5f5f3] flex items-center justify-center px-5">
      <div className="w-full max-w-md bg-white border border-gray-200">
        <div className="px-6 py-7 border-b border-gray-200">
          <div className="w-10 h-10 bg-[#8f1d2c] flex items-center justify-center mb-5">
            <span className="text-[#d9a400] text-sm font-semibold">
              LS
            </span>
          </div>

          <p className="text-[10px] uppercase tracking-[0.16em] text-gray-400">
            LuxuryStay Manager
          </p>

          <h1 className="text-2xl font-semibold text-gray-900 mt-2">
            Sign out
          </h1>

          <p className="text-sm text-gray-500 mt-2 leading-6">
            Are you sure you want to sign out of the manager portal?
          </p>
        </div>

        <div className="px-6 py-6 flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 h-11 border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="flex-1 h-11 bg-[#8f1d2c] text-white text-sm font-medium hover:bg-[#751722] transition cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Logout;