import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

function Payments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/admin/payments"
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load payments"
          );
        }

        setPayments(data);
      } catch (error) {
        console.error(error);
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  return (
    <div className="min-h-screen bg-[#f6f6f6] md:flex">

      <Sidebar />

      <main className="flex-1 p-5 md:p-8">

        <div className="mb-8">
          <p className="text-sm text-gray-500">
            Admin / Payments
          </p>

          <h1 className="text-3xl font-semibold text-gray-900 mt-1">
            Payments
          </h1>

          <p className="text-gray-500 mt-2">
            Monitor booking payments and outstanding amounts.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">

          {loading ? (
            <div className="p-10 text-center text-gray-500">
              Loading payments...
            </div>
          ) : payments.length === 0 ? (
            <div className="p-10 text-center text-gray-500">
              No payment records found.
            </div>
          ) : (

            <div className="overflow-x-auto">

              <table className="w-full text-sm">

                <thead className="bg-[#171717] text-white">

                  <tr>
                    <th className="text-left px-5 py-4">
                      Booking
                    </th>

                    <th className="text-left px-5 py-4">
                      Guest
                    </th>

                    <th className="text-left px-5 py-4">
                      Room
                    </th>

                    <th className="text-left px-5 py-4">
                      Total
                    </th>

                    <th className="text-left px-5 py-4">
                      Paid
                    </th>

                    <th className="text-left px-5 py-4">
                      Outstanding
                    </th>

                    <th className="text-left px-5 py-4">
                      Method
                    </th>

                    <th className="text-left px-5 py-4">
                      Status
                    </th>
                  </tr>

                </thead>

                <tbody>

                  {payments.map((payment) => {

                    const total =
                      Number(payment.totalPrice || 0) +
                      Number(
                        payment.additionalCharges || 0
                      );

                    const paid =
                      Number(payment.amountPaid || 0);

                    const outstanding =
                      Math.max(total - paid, 0);

                    return (
                      <tr
                        key={payment._id}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >

                        <td className="px-5 py-4 font-medium">
                          {payment.bookingId}
                        </td>

                        <td className="px-5 py-4">
                          {payment.userId?.name || "-"}
                        </td>

                        <td className="px-5 py-4">
                          {payment.roomId?.roomNumber ||
                            "-"}
                        </td>

                        <td className="px-5 py-4">
                          Rs.{" "}
                          {total.toLocaleString()}
                        </td>

                        <td className="px-5 py-4 text-green-700 font-medium">
                          Rs.{" "}
                          {paid.toLocaleString()}
                        </td>

                        <td className="px-5 py-4 text-red-700 font-medium">
                          Rs.{" "}
                          {outstanding.toLocaleString()}
                        </td>

                        <td className="px-5 py-4 capitalize">
                          {payment.paymentMethod ||
                            "-"}
                        </td>

                        <td className="px-5 py-4">

                          <span className="px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-700 capitalize">
                            {payment.paymentStatus ||
                              "pending"}
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

      </main>

    </div>
  );
}

export default Payments;