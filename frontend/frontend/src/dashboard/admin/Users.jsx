import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

const API = "http://localhost:5000/api/admin";

const roles = [
  "guest",
  "receptionist",
  "admin",
  "manager",
  "housekeeping"
];

function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${API}/users`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load users");
      }

      setUsers(data);
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const changeRole = async (userId, role) => {
    try {
      const response = await fetch(
        `${API}/users/${userId}/role`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ role })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update role"
        );
      }

      setUsers((currentUsers) =>
        currentUsers.map((user) =>
          user._id === userId
            ? data.user
            : user
        )
      );

    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const toggleBlock = async (userId) => {
    try {
      const response = await fetch(
        `${API}/users/${userId}/block`,
        {
          method: "PUT"
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update user"
        );
      }

      setUsers((currentUsers) =>
        currentUsers.map((user) =>
          user._id === userId
            ? data.user
            : user
        )
      );

    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const filteredUsers = users.filter((user) => {
    const value = search.toLowerCase();

    return (
      user.name?.toLowerCase().includes(value) ||
      user.email?.toLowerCase().includes(value) ||
      user.role?.toLowerCase().includes(value)
    );
  });

  return (
    <div className="min-h-screen bg-[#f6f6f6] md:flex">

      <Sidebar />

      <main className="flex-1 p-5 md:p-8">

        <div className="mb-8">
          <p className="text-sm text-gray-500">
            Admin / Users
          </p>

          <h1 className="text-3xl font-semibold text-gray-900 mt-1">
            User Management
          </h1>

          <p className="text-gray-500 mt-2">
            Manage users, roles and account access.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-5">

          <input
            type="text"
            placeholder="Search by name, email or role..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full md:w-96 border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#8f1d2c]"
          />

        </div>

        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">

          {loading ? (
            <div className="p-10 text-center text-gray-500">
              Loading users...
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="p-10 text-center text-gray-500">
              No users found.
            </div>
          ) : (

            <div className="overflow-x-auto">

              <table className="w-full text-sm">

                <thead className="bg-[#171717] text-white">

                  <tr>
                    <th className="text-left px-5 py-4">
                      User
                    </th>

                    <th className="text-left px-5 py-4">
                      Email
                    </th>

                    <th className="text-left px-5 py-4">
                      Role
                    </th>

                    <th className="text-left px-5 py-4">
                      Status
                    </th>

                    <th className="text-left px-5 py-4">
                      Action
                    </th>
                  </tr>

                </thead>

                <tbody>

                  {filteredUsers.map((user) => (

                    <tr
                      key={user._id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >

                      <td className="px-5 py-4">

                        <div className="flex items-center gap-3">

                          <div className="w-10 h-10 rounded-full bg-[#8f1d2c] text-white flex items-center justify-center font-semibold">
                            {user.name
                              ?.charAt(0)
                              ?.toUpperCase()}
                          </div>

                          <div>
                            <p className="font-medium text-gray-900">
                              {user.name}
                            </p>
                          </div>

                        </div>

                      </td>

                      <td className="px-5 py-4 text-gray-600">
                        {user.email}
                      </td>

                      <td className="px-5 py-4">

                        <select
                          value={user.role}
                          onChange={(e) =>
                            changeRole(
                              user._id,
                              e.target.value
                            )
                          }
                          className="border border-gray-300 rounded-lg px-3 py-2 bg-white outline-none focus:border-[#8f1d2c]"
                        >

                          {roles.map((role) => (
                            <option
                              key={role}
                              value={role}
                            >
                              {role.charAt(0).toUpperCase() +
                                role.slice(1)}
                            </option>
                          ))}

                        </select>

                      </td>

                      <td className="px-5 py-4">

                        {user.isBlocked ? (
                          <span className="px-3 py-1 rounded-full text-xs bg-red-100 text-red-700">
                            Blocked
                          </span>
                        ) : (
                          <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700">
                            Active
                          </span>
                        )}

                      </td>

                      <td className="px-5 py-4">

                        <button
                          type="button"
                          onClick={() =>
                            toggleBlock(user._id)
                          }
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                            user.isBlocked
                              ? "bg-green-600 text-white hover:bg-green-700"
                              : "bg-red-600 text-white hover:bg-red-700"
                          }`}
                        >
                          {user.isBlocked
                            ? "Unblock"
                            : "Block"}
                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </main>

    </div>
  );
}

export default Users;