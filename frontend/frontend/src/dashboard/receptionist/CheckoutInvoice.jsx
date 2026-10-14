import {
  useEffect,
  useState
} from "react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import Sidebar from "./Sidebar";

function CheckoutInvoice() {

  const {
    invoiceNumber
  } = useParams();

  const navigate =
    useNavigate();

  const [invoice, setInvoice] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [message, setMessage] =
    useState("");

  useEffect(() => {

    const loadInvoice =
      async () => {

        try {

          const response =
            await fetch(
              `http://localhost:5000/api/bookings/invoice/${invoiceNumber}`
            );

          const data =
            await response.json();

          if (!response.ok) {

            setMessage(
              data.message ||
              "Unable to load invoice."
            );

            setLoading(false);

            return;
          }

          setInvoice(data);

        } catch (error) {

          console.log(error);

          setMessage(
            "Unable to connect to the server."
          );

        }

        setLoading(false);
      };

    loadInvoice();

  }, [invoiceNumber]);

  const printInvoice =
    () => {

      window.print();

    };

  if (loading) {

    return (
      <div className="min-h-screen flex flex-col md:flex-row bg-[#f5f5f3]">

        <Sidebar />

        <main className="flex-1 min-w-0">

          <div className="px-5 py-8">

            <p className="text-sm text-gray-500">
              Loading invoice...
            </p>

          </div>

        </main>

      </div>
    );
  }

  if (!invoice) {

    return (
      <div className="min-h-screen flex flex-col md:flex-row bg-[#f5f5f3]">

        <Sidebar />

        <main className="flex-1 min-w-0">

          <div className="px-5 py-8">

            <div className="border border-gray-200 bg-white px-5 py-8">

              <p className="text-sm text-red-600">
                {message ||
                  "Invoice not found."}
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/dashboard/receptionist/reservations"
                  )
                }
                className="mt-5 h-10 px-4 bg-[#8f1d2c] text-white text-sm cursor-pointer"
              >
                Back to Reservations
              </button>

            </div>

          </div>

        </main>

      </div>
    );
  }

  const roomCharges =
    Number(
      invoice.roomCharges || 0
    );

  const additionalCharges =
    Number(
      invoice.additionalCharges || 0
    );

  const totalAmount =
    Number(
      invoice.totalAmount || 0
    );

  const amountPaid =
    Number(
      invoice.amountPaid || 0
    );

  const remainingAmount =
    Number(
      invoice.remainingAmount || 0
    );

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#f5f5f3]">

      <Sidebar />

      <main className="flex-1 min-w-0">

        <div className="px-5 py-6 md:px-8 md:py-8">

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-7 print:hidden">

            <div>

              <p className="text-xs uppercase tracking-[0.18em] text-gray-400 mb-2">
                Reception
              </p>

              <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
                Checkout Invoice
              </h1>

              <p className="text-sm text-gray-500 mt-1">
                Final guest billing record
              </p>

            </div>

            <div className="flex gap-2">

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/dashboard/receptionist/reservations"
                  )
                }
                className="h-10 px-4 border border-gray-200 bg-white text-sm text-gray-600 hover:bg-gray-50 cursor-pointer"
              >
                ← Reservations
              </button>

              <button
                type="button"
                onClick={
                  printInvoice
                }
                className="h-10 px-4 bg-[#8f1d2c] text-white text-sm hover:bg-[#751722] cursor-pointer"
              >
                Print Invoice
              </button>

            </div>

          </div>

          <div className="max-w-4xl mx-auto bg-white border border-gray-200">

            <div className="px-6 py-6 md:px-10 md:py-8 border-b border-gray-200">

              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">

                <div>

                  <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
                    LuxuryStay
                  </p>

                  <h2 className="text-2xl font-semibold text-gray-900 mt-2">
                    Checkout Invoice
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Final payment receipt
                  </p>

                </div>

                <div className="sm:text-right">

                  <p className="text-[10px] uppercase tracking-wider text-gray-400">
                    Invoice Number
                  </p>

                  <p className="text-sm font-semibold text-gray-900 mt-1">
                    {invoice.invoiceNumber}
                  </p>

                  <p className="text-xs text-gray-500 mt-2">
                    {invoice.checkoutDate
                      ? new Date(
                          invoice.checkoutDate
                        ).toLocaleString()
                      : "—"}
                  </p>

                </div>

              </div>

            </div>

            <div className="px-6 py-6 md:px-10 border-b border-gray-200">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>

                  <p className="text-[10px] uppercase tracking-wider text-gray-400">
                    Guest
                  </p>

                  <p className="text-sm font-semibold text-gray-900 mt-1">
                    {invoice.guestName}
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    {invoice.guestEmail}
                  </p>

                </div>

                <div>

                  <p className="text-[10px] uppercase tracking-wider text-gray-400">
                    Booking
                  </p>

                  <p className="text-sm font-semibold text-gray-900 mt-1">
                    {invoice.bookingNumber}
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    {invoice.guests}{" "}
                    {invoice.guests === 1
                      ? "Guest"
                      : "Guests"}
                  </p>

                </div>

                <div>

                  <p className="text-[10px] uppercase tracking-wider text-gray-400">
                    Room
                  </p>

                  <p className="text-sm font-semibold text-gray-900 mt-1">
                    Room{" "}
                    {invoice.roomNumber}
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    {invoice.roomType}
                  </p>

                </div>

                <div>

                  <p className="text-[10px] uppercase tracking-wider text-gray-400">
                    Stay
                  </p>

                  <p className="text-sm text-gray-700 mt-1">
                    {invoice.checkIn
                      ? new Date(
                          invoice.checkIn
                        ).toLocaleDateString()
                      : "—"}
                    {" → "}
                    {invoice.checkOut
                      ? new Date(
                          invoice.checkOut
                        ).toLocaleDateString()
                      : "—"}
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    {invoice.nights}{" "}
                    {invoice.nights === 1
                      ? "Night"
                      : "Nights"}
                  </p>

                </div>

              </div>

            </div>

            <div className="px-6 py-6 md:px-10">

              <div className="border border-gray-200">

                <div className="grid grid-cols-[1fr_auto] px-4 py-3 bg-gray-50 border-b border-gray-200">

                  <span className="text-[10px] uppercase tracking-wider text-gray-400">
                    Description
                  </span>

                  <span className="text-[10px] uppercase tracking-wider text-gray-400">
                    Amount
                  </span>

                </div>

                <div className="grid grid-cols-[1fr_auto] px-4 py-4 border-b border-gray-100">

                  <span className="text-sm text-gray-700">
                    Room Charges
                  </span>

                  <span className="text-sm font-medium text-gray-800">
                    PKR{" "}
                    {roomCharges.toLocaleString()}
                  </span>

                </div>

                <div className="grid grid-cols-[1fr_auto] px-4 py-4 border-b border-gray-100">

                  <span className="text-sm text-gray-700">
                    Additional Services
                  </span>

                  <span className="text-sm font-medium text-gray-800">
                    PKR{" "}
                    {additionalCharges.toLocaleString()}
                  </span>

                </div>

                <div className="grid grid-cols-[1fr_auto] px-4 py-4 border-b border-gray-200">

                  <span className="text-sm font-semibold text-gray-900">
                    Total Bill
                  </span>

                  <span className="text-base font-semibold text-gray-900">
                    PKR{" "}
                    {totalAmount.toLocaleString()}
                  </span>

                </div>

                <div className="grid grid-cols-[1fr_auto] px-4 py-4 border-b border-gray-100">

                  <span className="text-sm text-gray-500">
                    Total Paid
                  </span>

                  <span className="text-sm font-medium text-green-700">
                    PKR{" "}
                    {amountPaid.toLocaleString()}
                  </span>

                </div>

                <div className="grid grid-cols-[1fr_auto] px-4 py-4">

                  <span className="text-sm font-semibold text-gray-900">
                    Remaining
                  </span>

                  <span className="text-sm font-semibold text-green-700">
                    PKR{" "}
                    {remainingAmount.toLocaleString()}
                  </span>

                </div>

              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>

                  <p className="text-[10px] uppercase tracking-wider text-gray-400">
                    Payment Method
                  </p>

                  <p className="text-sm font-medium text-gray-800 mt-1 capitalize">
                    {invoice.paymentMethod
                      ? invoice.paymentMethod.replace(
                          "_",
                          " "
                        )
                      : "—"}
                  </p>

                </div>

                <div>

                  <p className="text-[10px] uppercase tracking-wider text-gray-400">
                    Payment Status
                  </p>

                  <p className="text-sm font-medium text-green-700 mt-1 capitalize">
                    {invoice.paymentStatus}
                  </p>

                </div>

              </div>

            </div>

            <div className="px-6 py-5 md:px-10 border-t border-gray-200">

              <p className="text-xs text-gray-400 text-center">
                Thank you for staying with LuxuryStay.
              </p>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default CheckoutInvoice;

