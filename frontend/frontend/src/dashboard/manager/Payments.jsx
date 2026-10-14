import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

function Payments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadPayments = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/manager/payments"
        );

        const data = await response.json();

        if (response.ok) {
          setPayments(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadPayments();
  }, []);

  const filteredPayments = payments.filter((payment) => {
    const bookingId =
      payment.bookingId?.toLowerCase() || "";

    const guestName =
      payment.userId?.name?.toLowerCase() || "";

    const roomNumber =
      payment.roomId?.roomNumber?.toLowerCase() || "";

    const searchValue = search.toLowerCase();

    return (
      bookingId.includes(searchValue) ||
      guestName.includes(searchValue) ||
      roomNumber.includes(searchValue)
    );
  });

  const totalAmount = payments.reduce(
    (sum, payment) =>
      sum + Number(payment.totalPrice || 0),
    0
  );

  const totalPaid = payments.reduce(
    (sum, payment) =>
      sum + Number(payment.amountPaid || 0),
    0
  );

  const totalOutstanding =
    totalAmount - totalPaid;

  const getPaymentStatusStyle = (status) => {
    if (status === "paid") {
      return "bg-green-50 text-green-700 border-green-200";
    }

    if (status === "partial") {
      return "bg-yellow-50 text-yellow-700 border-yellow-200";
    }

    if (status === "failed") {
      return "bg-red-50 text-red-700 border-red-200";
    }

    return "bg-gray-50 text-gray-600 border-gray-200";
  };

  const getPaymentStatusLabel = (status) => {
    if (status === "paid") return "Paid";
    if (status === "partial") return "Partial";
    if (status === "failed") return "Failed";
    return "Pending";
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#f5f5f3]">
      <Sidebar />

      <main className="flex-1 min-w-0">
        <div className="px-5 py-6 md:px-8 md:py-8">

          <div className="mb-7">
            <p className="text-xs uppercase tracking-[0.18em] text-gray-400 mb-2">
              Manager Portal
            </p>

            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
              Payments
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Monitor hotel payments and outstanding balances
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">

            <div className="bg-white border border-gray-200 px-5 py-5">
              <p className="text-[10px] uppercase tracking-[0.14em] text-gray-400">
                Total Revenue
              </p>

              <p className="text-2xl font-semibold text-gray-900 mt-2">
                PKR {totalAmount.toLocaleString()}
              </p>
            </div>

            <div className="bg-white border border-green-200 px-5 py-5">
              <p className="text-[10px] uppercase tracking-[0.14em] text-green-600">
                Amount Paid
              </p>

              <p className="text-2xl font-semibold text-gray-900 mt-2">
                PKR {totalPaid.toLocaleString()}
              </p>
            </div>

            <div className="bg-white border border-red-200 px-5 py-5">
              <p className="text-[10px] uppercase tracking-[0.14em] text-red-600">
                Outstanding
              </p>

              <p className="text-2xl font-semibold text-gray-900 mt-2">
                PKR {totalOutstanding.toLocaleString()}
              </p>
            </div>

          </div>

          <div className="bg-white border border-gray-200">

            <div className="px-5 py-5 border-b border-gray-200">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                <div>
                  <p className="text-[10px] uppercase tracking-[0.16em] text-gray-400">
                    Financial Records
                  </p>

                  <h2 className="text-lg font-semibold text-gray-900 mt-1">
                    Payment Records
                  </h2>
                </div>

                <input
                  type="text"
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search booking, guest or room..."
                  className="w-full md:w-72 h-10 px-3 border border-gray-200 text-sm text-gray-700 outline-none focus:border-[#8f1d2c]"
                />

              </div>
            </div>

            {loading ? (
              <div className="px-5 py-12 text-center">
                <p className="text-sm text-gray-500">
                  Loading payments...
                </p>
              </div>
            ) : filteredPayments.length === 0 ? (
              <div className="px-5 py-12 text-center">
                <p className="text-sm font-medium text-gray-700">
                  No payment records found
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  Payment records will appear here once bookings exist.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">

                <table className="w-full min-w-[900px]">

                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50/70">

                      <th className="text-left px-5 py-3 text-[10px] uppercase tracking-[0.12em] text-gray-400 font-medium">
                        Booking
                      </th>

                      <th className="text-left px-5 py-3 text-[10px] uppercase tracking-[0.12em] text-gray-400 font-medium">
                        Guest
                      </th>

                      <th className="text-left px-5 py-3 text-[10px] uppercase tracking-[0.12em] text-gray-400 font-medium">
                        Room
                      </th>

                      <th className="text-left px-5 py-3 text-[10px] uppercase tracking-[0.12em] text-gray-400 font-medium">
                        Total
                      </th>

                      <th className="text-left px-5 py-3 text-[10px] uppercase tracking-[0.12em] text-gray-400 font-medium">
                        Paid
                      </th>

                      <th className="text-left px-5 py-3 text-[10px] uppercase tracking-[0.12em] text-gray-400 font-medium">
                        Outstanding
                      </th>

                      <th className="text-left px-5 py-3 text-[10px] uppercase tracking-[0.12em] text-gray-400 font-medium">
                        Method
                      </th>

                      <th className="text-left px-5 py-3 text-[10px] uppercase tracking-[0.12em] text-gray-400 font-medium">
                        Status
                      </th>

                    </tr>
                  </thead>

                  <tbody>

                    {filteredPayments.map((payment) => {

                      const total =
                        Number(payment.totalPrice || 0);

                      const paid =
                        Number(payment.amountPaid || 0);

                      const outstanding =
                        Math.max(total - paid, 0);

                      return (
                        <tr
                          key={payment._id}
                          className="border-b border-gray-100 hover:bg-gray-50/60 transition"
                        >

                          <td className="px-5 py-4">
                            <p className="text-sm font-medium text-gray-900">
                              {payment.bookingId || "—"}
                            </p>
                          </td>

                          <td className="px-5 py-4">
                            <p className="text-sm text-gray-800">
                              {payment.userId?.name || "Unknown"}
                            </p>

                            <p className="text-xs text-gray-400 mt-1">
                              {payment.userId?.email || "—"}
                            </p>
                          </td>

                          <td className="px-5 py-4">
                            <p className="text-sm text-gray-800">
                              Room{" "}
                              {payment.roomId?.roomNumber || "—"}
                            </p>

                            <p className="text-xs text-gray-400 mt-1">
                              {payment.roomId?.roomType || "—"}
                            </p>
                          </td>

                          <td className="px-5 py-4">
                            <p className="text-sm font-medium text-gray-900">
                              PKR {total.toLocaleString()}
                            </p>
                          </td>

                          <td className="px-5 py-4">
                            <p className="text-sm text-green-700">
                              PKR {paid.toLocaleString()}
                            </p>
                          </td>

                          <td className="px-5 py-4">
                            <p className="text-sm text-red-700">
                              PKR {outstanding.toLocaleString()}
                            </p>
                          </td>

                          <td className="px-5 py-4">
                            <span className="text-xs text-gray-600 capitalize">
                              {payment.paymentMethod
                                ?.replace("_", " ") || "—"}
                            </span>
                          </td>

                          <td className="px-5 py-4">
                            <span
                              className={`inline-flex px-2.5 py-1 border text-[11px] font-medium ${getPaymentStatusStyle(
                                payment.paymentStatus
                              )}`}
                            >
                              {getPaymentStatusLabel(
                                payment.paymentStatus
                              )}
                            </span>
                          </td>

                        </tr>
                      );
                    })}

                  </tbody>

                </table>

              </div>
            )}

          </div>

        </div>
      </main>
    </div>
  );
}

export default Payments;