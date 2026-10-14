import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/admin/invoices"
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load invoices"
          );
        }

        setInvoices(data);
      } catch (error) {
        console.error(error);
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  return (
    <div className="min-h-screen bg-[#f6f6f6] md:flex">

      <Sidebar />

      <main className="flex-1 p-5 md:p-8">

        <div className="mb-8">
          <p className="text-sm text-gray-500">
            Admin / Invoices
          </p>

          <h1 className="text-3xl font-semibold text-gray-900 mt-1">
            Invoices
          </h1>

          <p className="text-gray-500 mt-2">
            View generated checkout invoices.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">

          {loading ? (
            <div className="p-10 text-center text-gray-500">
              Loading invoices...
            </div>
          ) : invoices.length === 0 ? (
            <div className="p-10 text-center text-gray-500">
              No invoices found.
            </div>
          ) : (

            <div className="overflow-x-auto">

              <table className="w-full text-sm">

                <thead className="bg-[#171717] text-white">

                  <tr>
                    <th className="text-left px-5 py-4">
                      Invoice
                    </th>

                    <th className="text-left px-5 py-4">
                      Guest
                    </th>

                    <th className="text-left px-5 py-4">
                      Booking
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
                      Remaining
                    </th>

                    <th className="text-left px-5 py-4">
                      Status
                    </th>
                  </tr>

                </thead>

                <tbody>

                  {invoices.map((invoice) => (

                    <tr
                      key={invoice._id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >

                      <td className="px-5 py-4 font-medium">
                        {invoice.invoiceNumber}
                      </td>

                      <td className="px-5 py-4">

                        <p className="font-medium">
                          {invoice.guestName || "-"}
                        </p>

                        <p className="text-xs text-gray-500">
                          {invoice.email || "-"}
                        </p>

                      </td>

                      <td className="px-5 py-4">
                        {invoice.bookingNumber || "-"}
                      </td>

                      <td className="px-5 py-4">
                        {invoice.roomNumber || "-"}
                      </td>

                      <td className="px-5 py-4 font-medium">
                        Rs.{" "}
                        {Number(
                          invoice.totalAmount || 0
                        ).toLocaleString()}
                      </td>

                      <td className="px-5 py-4 text-green-700">
                        Rs.{" "}
                        {Number(
                          invoice.amountPaid || 0
                        ).toLocaleString()}
                      </td>

                      <td className="px-5 py-4 text-red-700">
                        Rs.{" "}
                        {Number(
                          invoice.remainingAmount || 0
                        ).toLocaleString()}
                      </td>

                      <td className="px-5 py-4">

                        <span className="px-3 py-1 rounded-full text-xs bg-gray-100 capitalize">
                          {invoice.paymentStatus ||
                            "unpaid"}
                        </span>

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

export default Invoices;