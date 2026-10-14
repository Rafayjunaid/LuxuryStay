import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
// import Sidebar from "./Sidebar";

const API_URL = "http://localhost:5000/api/rooms";

const emptyForm = {
  roomNumber: "",
  roomType: "",
  price: "",
  capacity: "",
  amenities: "",
  description: "",
  photos: "",
  status: "available"
};

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadRooms = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to load rooms"
        );
      }

      setRooms(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRooms();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value
    }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");
    setSaving(true);

    const payload = {
      roomNumber: form.roomNumber.trim(),
      roomType: form.roomType.trim(),
      price: Number(form.price),
      capacity: Number(form.capacity),

      amenities: form.amenities
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),

      description: form.description.trim(),

      photos: form.photos
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),

      status: form.status
    };

    try {
      const response = await fetch(
        editingId
          ? `${API_URL}/${editingId}`
          : API_URL,
        {
          method: editingId ? "PUT" : "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(payload)
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            `Unable to ${
              editingId ? "update" : "create"
            } room`
        );
      }

      setMessage(data.message);

      resetForm();

      await loadRooms();

    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (room) => {
    setError("");
    setMessage("");

    setEditingId(room._id);

    setForm({
      roomNumber: room.roomNumber || "",
      roomType: room.roomType || "",
      price: room.price ?? "",
      capacity: room.capacity ?? "",

      amenities: Array.isArray(room.amenities)
        ? room.amenities.join(", ")
        : "",

      description: room.description || "",

      photos: Array.isArray(room.photos)
        ? room.photos.join(", ")
        : "",

      status: room.status || "available"
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleDelete = async (room) => {
    const confirmed = window.confirm(
      `Delete room ${room.roomNumber}? This cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    setMessage("");
    setError("");

    try {
      const response = await fetch(
        `${API_URL}/${room._id}`,
        {
          method: "DELETE"
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to delete room"
        );
      }

      setMessage(data.message);

      if (editingId === room._id) {
        resetForm();
      }

      await loadRooms();

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#f5f5f3]">

      <Sidebar />

      <main className="flex-1 min-w-0">

        <div className="px-5 py-6 md:px-8 md:py-8">

          <div className="mb-8">

            <p className="text-xs uppercase tracking-[0.18em] text-gray-400 mb-2">
              Administration
            </p>

            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
              Room Management
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Create, edit and delete LuxuryStay rooms
            </p>

          </div>

          {message && (
            <div className="mb-5 border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              {message}
            </div>
          )}

          {error && (
            <div className="mb-5 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* CREATE / EDIT FORM */}

          <section className="bg-white border border-gray-200 mb-7">

            <div className="px-5 py-5 border-b border-gray-200 flex items-center justify-between gap-4">

              <div>

                <p className="text-[10px] uppercase tracking-[0.16em] text-gray-400">
                  {editingId ? "Edit Room" : "New Room"}
                </p>

                <h2 className="text-lg font-semibold text-gray-900 mt-1">
                  {editingId
                    ? "Update Room Details"
                    : "Create a Room"}
                </h2>

              </div>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="text-xs font-semibold text-gray-500 hover:text-gray-900"
                >
                  Cancel Edit
                </button>
              )}

            </div>

            <form
              onSubmit={handleSubmit}
              className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5"
            >

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Room Number
                </label>

                <input
                  name="roomNumber"
                  value={form.roomNumber}
                  onChange={handleChange}
                  placeholder="e.g. 101"
                  required
                  className="w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#8f1d2c]"
                />

              </div>

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Room Type
                </label>

                <input
                  name="roomType"
                  value={form.roomType}
                  onChange={handleChange}
                  placeholder="e.g. Deluxe"
                  required
                  className="w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#8f1d2c]"
                />

              </div>

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price per Night
                </label>

                <input
                  name="price"
                  type="number"
                  min="0"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="e.g. 15000"
                  required
                  className="w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#8f1d2c]"
                />

              </div>

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Capacity
                </label>

                <input
                  name="capacity"
                  type="number"
                  min="1"
                  value={form.capacity}
                  onChange={handleChange}
                  placeholder="e.g. 2"
                  required
                  className="w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#8f1d2c]"
                />

              </div>

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amenities
                </label>

                <input
                  name="amenities"
                  value={form.amenities}
                  onChange={handleChange}
                  placeholder="WiFi, TV, AC"
                  className="w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#8f1d2c]"
                />

                <p className="text-xs text-gray-400 mt-1">
                  Separate amenities with commas.
                </p>

              </div>

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Photo URLs
                </label>

                <input
                  name="photos"
                  value={form.photos}
                  onChange={handleChange}
                  placeholder="https://example.com/room.jpg"
                  className="w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#8f1d2c]"
                />

                <p className="text-xs text-gray-400 mt-1">
                  Optional. Separate multiple URLs with commas.
                </p>

              </div>

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>

                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-[#8f1d2c]"
                >
                  <option value="available">
                    Available
                  </option>

                  <option value="reserved">
                    Reserved
                  </option>

                  <option value="occupied">
                    Occupied
                  </option>

                  <option value="maintenance">
                    Maintenance
                  </option>
                </select>

              </div>

              <div className="md:col-span-2">

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe the room..."
                  rows="4"
                  required
                  className="w-full border border-gray-300 px-4 py-3 text-sm outline-none resize-y focus:border-[#8f1d2c]"
                />

              </div>

              <div className="md:col-span-2 flex justify-end">

                <button
                  type="submit"
                  disabled={saving}
                  className="bg-[#8f1d2c] px-6 py-3 text-sm font-semibold text-white hover:bg-[#741624] disabled:opacity-60"
                >
                  {saving
                    ? "Saving..."
                    : editingId
                      ? "Update Room"
                      : "Create Room"}
                </button>

              </div>

            </form>

          </section>

          {/* ROOMS TABLE */}

          <section className="bg-white border border-gray-200">

            <div className="px-5 py-5 border-b border-gray-200 flex items-center justify-between">

              <div>

                <p className="text-[10px] uppercase tracking-[0.16em] text-gray-400">
                  Inventory
                </p>

                <h2 className="text-lg font-semibold text-gray-900 mt-1">
                  All Rooms
                </h2>

              </div>

              <span className="text-sm text-gray-500">
                {rooms.length} room
                {rooms.length === 1 ? "" : "s"}
              </span>

            </div>

            {loading ? (
              <div className="p-8 text-sm text-gray-500">
                Loading rooms...
              </div>
            ) : rooms.length === 0 ? (
              <div className="p-8 text-sm text-gray-500">
                No rooms found. Create your first room above.
              </div>
            ) : (

              <div className="overflow-x-auto">

                <table className="w-full text-left">

                  <thead>

                    <tr className="border-b border-gray-200 bg-gray-50">

                      <th className="px-5 py-3 text-[10px] uppercase tracking-[0.12em] text-gray-500">
                        Room
                      </th>

                      <th className="px-5 py-3 text-[10px] uppercase tracking-[0.12em] text-gray-500">
                        Type
                      </th>

                      <th className="px-5 py-3 text-[10px] uppercase tracking-[0.12em] text-gray-500">
                        Price
                      </th>

                      <th className="px-5 py-3 text-[10px] uppercase tracking-[0.12em] text-gray-500">
                        Capacity
                      </th>

                      <th className="px-5 py-3 text-[10px] uppercase tracking-[0.12em] text-gray-500">
                        Status
                      </th>

                      <th className="px-5 py-3 text-[10px] uppercase tracking-[0.12em] text-gray-500 text-right">
                        Actions
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {rooms.map((room) => (

                      <tr
                        key={room._id}
                        className="border-b border-gray-100 last:border-0"
                      >

                        <td className="px-5 py-4">

                          <p className="text-sm font-semibold text-gray-900">
                            {room.roomNumber}
                          </p>

                        </td>

                        <td className="px-5 py-4 text-sm text-gray-600">
                          {room.roomType}
                        </td>

                        <td className="px-5 py-4 text-sm text-gray-600">
                          PKR{" "}
                          {Number(
                            room.price || 0
                          ).toLocaleString()}
                        </td>

                        <td className="px-5 py-4 text-sm text-gray-600">
                          {room.capacity}
                        </td>

                        <td className="px-5 py-4">

                          <span className="inline-flex px-2.5 py-1 text-xs font-medium capitalize bg-gray-100 text-gray-700">
                            {room.status}
                          </span>

                        </td>

                        <td className="px-5 py-4">

                          <div className="flex justify-end gap-2">

                            <button
                              type="button"
                              onClick={() => handleEdit(room)}
                              className="border border-gray-300 px-3 py-2 text-xs font-semibold text-gray-700 hover:border-[#8f1d2c] hover:text-[#8f1d2c]"
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                handleDelete(room)
                              }
                              className="border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
                            >
                              Delete
                            </button>

                          </div>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            )}

          </section>

        </div>

      </main>

    </div>
  );
}

export default Rooms;