import {
  useEffect,
  useState
} from "react";

import {
  useSearchParams,
  useNavigate
} from "react-router-dom";

import Sidebar from "./Sidebar";

function Billing() {

  const [searchParams] =
    useSearchParams();

  const navigate =
    useNavigate();

  const bookingId =
    searchParams.get("booking");

  const [booking, setBooking] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [additionalCharges, setAdditionalCharges] =
    useState("");

  const [paymentAmount, setPaymentAmount] =
    useState("");

  const [paymentMethod, setPaymentMethod] =
    useState("cash");

  const [message, setMessage] =
    useState("");

  const [processing, setProcessing] =
    useState(false);

  const loadBooking =
    async () => {

      if (!bookingId) {

        setMessage(
          "No reservation was selected."
        );

        setLoading(false);

        return;
      }

      try {

        const response =
          await fetch(
            "http://localhost:5000/api/receptionist/reservations"
          );

        const data =
          await response.json();

        if (!response.ok) {

          setMessage(
            data.message ||
            "Unable to load reservation."
          );

          setLoading(false);

          return;
        }

        const selected =
          data.find(
            (item) =>
              item._id === bookingId
          );

        if (!selected) {

          setMessage(
            "Reservation not found."
          );

          setLoading(false);

          return;
        }

        setBooking(selected);

        const alreadyPaid =
          Number(
            selected.amountPaid || 0
          );

        const existingExtraCharges =
          Number(
            selected.additionalCharges || 0
          );

        const extraDue =
          Math.max(
            existingExtraCharges,
            0
          );

        if (extraDue > 0) {
          setAdditionalCharges(
            existingExtraCharges.toString()
          );

          setPaymentAmount(
            extraDue.toString()
          );
        } else if (alreadyPaid >= Number(selected.totalPrice || 0)) {
          setPaymentAmount("");
        }

      } catch (error) {

        console.log(error);

        setMessage(
          "Unable to connect to the server."
        );
      }

      setLoading(false);
    };

  useEffect(() => {

    loadBooking();

  }, [bookingId]);

  const roomCharges =
    Number(
      booking?.totalPrice || 0
    );

  const alreadyPaid =
    Number(
      booking?.amountPaid || 0
    );

  const extraCharges =
    Number(
      additionalCharges || 0
    );

  const newPayment =
    Number(
      paymentAmount || 0
    );

  const finalTotal =
    roomCharges +
    extraCharges;

  const extraAmountDue =
    Math.max(
      extraCharges -
      Math.max(
        alreadyPaid -
        roomCharges,
        0
      ),
      0
    );

  const remainingExtra =
    Math.max(
      extraAmountDue -
      newPayment,
      0
    );

  const checkout =
    async () => {

      if (!booking) {
        return;
      }

      if (
        extraCharges < 0 ||
        newPayment < 0
      ) {

        setMessage(
          "Charges and payment cannot be negative."
        );

        return;
      }

      if (
        newPayment >
        extraAmountDue
      ) {

        setMessage(
          "Payment received cannot be greater than the extra charges."
        );

        return;
      }

      if (
        remainingExtra >
        0
      ) {

        setMessage(
          `Extra payment of PKR ${remainingExtra.toLocaleString()} is still required before checkout.`
        );

        return;
      }

      setProcessing(true);

      setMessage("");

      try {

        const response =
          await fetch(
            `http://localhost:5000/api/bookings/${booking._id}/checkout`,
            {
              method: "PUT",

              headers: {
                "Content-Type":
                  "application/json"
              },

              body: JSON.stringify({
                additionalCharges:
                  extraCharges,

                amountPaid:
                  newPayment,

                paymentMethod
              })
            }
          );

        const data =
          await response.json();

        if (!response.ok) {

          setMessage(
            data.message ||
            "Checkout failed."
          );

          setProcessing(false);

          return;
        }

        if (
          data.invoice?.invoiceNumber
        ) {

          navigate(
            `/dashboard/receptionist/invoices/${data.invoice.invoiceNumber}`
          );

          return;
        }

        setMessage(
          "Checkout completed, but invoice could not be opened."
        );

      } catch (error) {

        console.log(error);

        setMessage(
          "Something went wrong during checkout."
        );
      }

      setProcessing(false);
    };

  if (loading) {

    return (
      <div className="min-h-screen flex flex-col md:flex-row bg-[#f5f5f3]">

        <Sidebar />

        <main className="flex-1 min-w-0">

          <div className="px-5 py-6 md:px-8 md:py-8">

            <p className="text-sm text-gray-500">
              Loading billing information...
            </p>

          </div>

        </main>

      </div>
    );
  }

  if (!booking) {

    return (
      <div className="min-h-screen flex flex-col md:flex-row bg-[#f5f5f3]">

        <Sidebar />

        <main className="flex-1 min-w-0">

          <div className="px-5 py-6 md:px-8 md:py-8">

            <div className="border border-gray-200 bg-white px-5 py-8">

              <p className="text-sm text-red-600">
                {message ||
                  "Reservation not found."}
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

  const bookingFullyPaid =
    alreadyPaid >= roomCharges;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#f5f5f3]">

      <Sidebar />

      <main className="flex-1 min-w-0">

        <div className="px-5 py-6 md:px-8 md:py-8">

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-7">

            <div>

              <p className="text-xs uppercase tracking-[0.18em] text-gray-400 mb-2">
                Reception
              </p>

              <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
                Guest Checkout
              </h1>

              <p className="text-sm text-gray-500 mt-1">
                Record additional services and complete checkout
              </p>

            </div>

            <button
              type="button"
              onClick={() =>
                navigate(
                  "/dashboard/receptionist/reservations"
                )
              }
              className="h-10 px-4 border border-gray-200 bg-white text-sm text-gray-600 hover:bg-gray-50 transition cursor-pointer"
            >
              ← Reservations
            </button>

          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-5">

            <div className="border border-gray-200 bg-white">

              <div className="px-5 py-4 border-b border-gray-200">

                <div className="flex items-center justify-between gap-4">

                  <div>

                    <p className="text-[10px] uppercase tracking-[0.16em] text-gray-400">
                      Reservation
                    </p>

                    <h2 className="text-lg font-semibold text-gray-900 mt-1">
                      {booking.bookingId}
                    </h2>

                  </div>

                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#8f1d2c] capitalize">

                    <span className="w-2 h-2 rounded-full bg-[#8f1d2c]" />

                    {booking.status}

                  </span>

                </div>

              </div>

              <div className="p-5">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">

                  <div>

                    <p className="text-[10px] uppercase tracking-wider text-gray-400">
                      Guest
                    </p>

                    <p className="text-sm font-semibold text-gray-800 mt-1">
                      {booking.user?.name ||
                        "Unknown Guest"}
                    </p>

                    <p className="text-xs text-gray-500 mt-0.5">
                      {booking.user?.email ||
                        "No email available"}
                    </p>

                  </div>

                  <div>

                    <p className="text-[10px] uppercase tracking-wider text-gray-400">
                      Room
                    </p>

                    <p className="text-sm font-semibold text-gray-800 mt-1">
                      Room{" "}
                      {booking.room?.roomNumber ||
                        "—"}
                    </p>

                    <p className="text-xs text-gray-500 mt-0.5">
                      {booking.room?.roomType ||
                        ""}
                    </p>

                  </div>

                  <div>

                    <p className="text-[10px] uppercase tracking-wider text-gray-400">
                      Check In
                    </p>

                    <p className="text-sm text-gray-700 mt-1">
                      {booking.checkIn
                        ? new Date(
                            booking.checkIn
                          ).toLocaleDateString()
                        : "—"}
                    </p>

                  </div>

                  <div>

                    <p className="text-[10px] uppercase tracking-wider text-gray-400">
                      Check Out
                    </p>

                    <p className="text-sm text-gray-700 mt-1">
                      {booking.checkOut
                        ? new Date(
                            booking.checkOut
                          ).toLocaleDateString()
                        : "—"}
                    </p>

                  </div>

                  <div>

                    <p className="text-[10px] uppercase tracking-wider text-gray-400">
                      Stay Duration
                    </p>

                    <p className="text-sm text-gray-700 mt-1">
                      {booking.nights || 0}{" "}
                      {booking.nights === 1
                        ? "Night"
                        : "Nights"}
                    </p>

                  </div>

                  <div>

                    <p className="text-[10px] uppercase tracking-wider text-gray-400">
                      Guests
                    </p>

                    <p className="text-sm text-gray-700 mt-1">
                      {booking.guests || 0}
                    </p>

                  </div>

                </div>

              </div>

              <div className="border-t border-gray-200 px-5 py-5">

                <div className="flex items-center justify-between mb-4">

                  <div>

                    <p className="text-[10px] uppercase tracking-wider text-gray-400">
                      Room Payment
                    </p>

                    <p className="text-sm font-medium text-green-700 mt-1">
                      Fully Paid
                    </p>

                  </div>

                  <p className="text-sm font-semibold text-gray-800">
                    PKR{" "}
                    {alreadyPaid.toLocaleString()}
                  </p>

                </div>

                <div className="border-t border-gray-100 pt-5">

                  <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-4">
                    Additional Services
                  </p>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">

                    <div>

                      <p className="text-sm text-gray-700">
                        Extra services / charges
                      </p>

                      <p className="text-xs text-gray-400 mt-1">
                        Food, laundry, minibar, room service, etc.
                      </p>

                    </div>

                    <div className="relative sm:ml-auto w-full sm:w-40">

                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                        PKR
                      </span>

                      <input
                        type="number"
                        min="0"
                        value={
                          additionalCharges
                        }
                        onChange={(e) => {
                          const value =
                            e.target.value;

                          setAdditionalCharges(
                            value
                          );

                          const amount =
                            Number(value || 0);

                          setPaymentAmount(
                            amount > 0
                              ? amount.toString()
                              : ""
                          );

                          setMessage("");
                        }}
                        placeholder="0"
                        className="w-full h-10 pl-12 pr-3 border border-gray-200 bg-gray-50 text-sm text-gray-700 outline-none focus:border-[#8f1d2c] focus:bg-white"
                      />

                    </div>

                  </div>

                </div>

              </div>

            </div>

            <div className="border border-gray-200 bg-white h-fit">

              <div className="px-5 py-4 border-b border-gray-200">

                <p className="text-[10px] uppercase tracking-[0.16em] text-gray-400">
                  Checkout
                </p>

                <h2 className="text-lg font-semibold text-gray-900 mt-1">
                  Payment Summary
                </h2>

              </div>

              <div className="p-5">

                <div className="space-y-3">

                  <div className="flex items-center justify-between text-sm">

                    <span className="text-gray-500">
                      Room Charges
                    </span>

                    <span className="font-medium text-gray-800">
                      PKR{" "}
                      {roomCharges.toLocaleString()}
                    </span>

                  </div>

                  <div className="flex items-center justify-between text-sm">

                    <span className="text-gray-500">
                      Paid Online
                    </span>

                    <span className="font-medium text-green-700">
                      PKR{" "}
                      {alreadyPaid.toLocaleString()}
                    </span>

                  </div>

                  <div className="flex items-center justify-between text-sm">

                    <span className="text-gray-500">
                      Additional Services
                    </span>

                    <span className="font-medium text-gray-800">
                      PKR{" "}
                      {extraCharges.toLocaleString()}
                    </span>

                  </div>

                  <div className="border-t border-gray-200 pt-3 flex items-center justify-between">

                    <span className="text-sm font-semibold text-gray-800">
                      Final Bill
                    </span>

                    <span className="text-base font-semibold text-gray-900">
                      PKR{" "}
                      {finalTotal.toLocaleString()}
                    </span>

                  </div>

                  <div className="flex items-center justify-between text-sm">

                    <span className="text-gray-500">
                      Extra Amount Due
                    </span>

                    <span className="font-semibold text-[#8f1d2c]">
                      PKR{" "}
                      {extraAmountDue.toLocaleString()}
                    </span>

                  </div>

                  <div className="flex items-center justify-between text-sm">

                    <span className="text-gray-500">
                      Received Now
                    </span>

                    <span className="font-medium text-gray-800">
                      PKR{" "}
                      {newPayment.toLocaleString()}
                    </span>

                  </div>

                  <div className="border-t border-gray-200 pt-3 flex items-center justify-between">

                    <span className="text-sm font-semibold text-gray-800">
                      Remaining
                    </span>

                    <span
                      className={`text-base font-semibold ${
                        remainingExtra === 0
                          ? "text-green-700"
                          : "text-[#8f1d2c]"
                      }`}
                    >
                      PKR{" "}
                      {remainingExtra.toLocaleString()}
                    </span>

                  </div>

                </div>

                <div className="mt-6">

                  <label className="block text-xs text-gray-500 mb-1.5">
                    Extra Payment Method
                  </label>

                  <select
                    value={
                      paymentMethod
                    }
                    onChange={(e) =>
                      setPaymentMethod(
                        e.target.value
                      )
                    }
                    className="w-full h-10 px-3 border border-gray-200 bg-gray-50 text-sm text-gray-700 outline-none focus:border-[#8f1d2c]"
                  >

                    <option value="cash">
                      Cash
                    </option>

                    <option value="card">
                      Card
                    </option>

                    <option value="bank_transfer">
                      Bank Transfer
                    </option>

                    <option value="other">
                      Other
                    </option>

                  </select>

                </div>

                {message && (

                  <div className="mt-4 px-3 py-3 border border-red-200 bg-red-50 text-xs text-red-700">
                    {message}
                  </div>

                )}

                <button
                  type="button"
                  onClick={
                    checkout
                  }
                  disabled={
                    processing ||
                    remainingExtra > 0
                  }
                  className="w-full h-11 mt-5 bg-[#8f1d2c] text-white text-sm font-medium hover:bg-[#751722] disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
                >
                  {processing
                    ? "Processing Checkout..."
                    : "Complete Checkout & Generate Invoice"}
                </button>

                <p className="text-[11px] text-gray-400 text-center mt-3">
                  Room charges are already paid. Only additional service charges are collected at checkout.
                </p>

              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Billing;

