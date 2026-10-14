
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminHome from "./dashboard/admin/Home";
import AdminRooms from "./dashboard/admin/Rooms";
// =========================
// Public Pages
// =========================

import Home from "./pages/Home";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import AvailableRooms from "./pages/AvailableRooms";
import RoomDetails from "./pages/RoomDetails";
import Booking from "./pages/Booking";
import Payment from "./pages/Payment";
import BookingConfirmation from "./pages/BookingConfirmation";
import Refund from "./pages/Refund";
import Feedback from "./pages/feedback";

// =========================
// Receptionist Dashboard
// =========================

import ReceptionistHome from "./dashboard/receptionist/Home";
import ReceptionistFeedback from "./dashboard/receptionist/Feedback";
import ReceptionistComplaints from "./dashboard/receptionist/Complaints";
import ReceptionistAvailableRooms from "./dashboard/receptionist/AvailableRooms";
import ReceptionistGuests from "./dashboard/receptionist/Guests";
import ReceptionistReservations from "./dashboard/receptionist/Reservations";
import ReceptionistBilling from "./dashboard/receptionist/Billing";
import CheckoutInvoice from "./dashboard/receptionist/CheckoutInvoice";

// =========================
// Manager Dashboard
// =========================
import AdminFeedback from "./dashboard/admin/Feedback";
import AdminComplaints from "./dashboard/admin/Complaints";
import ManagerHome from "./dashboard/manager/Home";
import ManagerRoomDetails from "./dashboard/manager/RoomDetails";
import ManagerRooms from  './dashboard/manager/Rooms'
import ManagerGuests from "./dashboard/manager/Guests";
import ManagerGuestDetails from "./dashboard/manager/GuestDetails";
import ManagerReservations from "./dashboard/manager/Reservations";
import ManagerPayments from "./dashboard/manager/Payments";
import ManagerFeedback from "./dashboard/manager/Feedback";
import ManagerComplaints from "./dashboard/manager/Complaints";
import ManagerLogout from "./dashboard/manager/Logout";
import AdminUsers from "./dashboard/admin/Users";
import AdminReservations from "./dashboard/admin/Reservations";
import AdminPayments from "./dashboard/admin/Payments";
import AdminInvoices from "./dashboard/admin/Invoices";
// =========================
// Housekeeping Dashboard
// =========================

import HousekeepingHome from "./dashboard/housekeeper/Home";
import RoomComplaints from "./dashboard/housekeeper/RoomComplaints";
import RoomMaintenance from "./dashboard/housekeeper/RoomMaintenance";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =========================
            PUBLIC WEBSITE
        ========================= */}

        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
              <Footer />
            </>
          }
        />

        <Route
          path="/about"
          element={
            <>
              <Navbar />
              <About />
              <Footer />
            </>
          }
        />

        <Route
          path="/gallery"
          element={
            <>
              <Navbar />
              <Gallery />
              <Footer />
            </>
          }
        />

        <Route
          path="/contact"
          element={
            <>
              <Navbar />
              <Contact />
              <Footer />
            </>
          }
        />

        <Route
          path="/login"
          element={
            <>
              <Navbar />
              <Login />
              <Footer />
            </>
          }
        />

        <Route
          path="/register"
          element={
            <>
              <Navbar />
              <Register />
              <Footer />
            </>
          }
        />
        <Route
          path="/feedback"
          element={
            <>
              <Navbar />
              <Feedback />
              <Footer />
            </>
          }
        />

        <Route
          path="/profile"
          element={
            <>
              <Navbar />
              <Profile />
              <Footer />
            </>
          }
        />

        <Route
          path="/edit-profile"
          element={
            <>
              <Navbar />
              <EditProfile />
              <Footer />
            </>
          }
        />

        <Route
          path="/rooms"
          element={
            <>
              <Navbar />
              <AvailableRooms />
              <Footer />
            </>
          }
        />

        <Route
          path="/room/:id"
          element={
            <>
              <Navbar />
              <RoomDetails />
              <Footer />
            </>
          }
        />

        <Route
          path="/booking"
          element={
            <>
              <Navbar />
              <Booking />
              <Footer />
            </>
          }
        />

        <Route
          path="/payment"
          element={
            <>
              <Navbar />
              <Payment />
              <Footer />
            </>
          }
        />

        <Route
          path="/booking-confirmation/:bookingId"
          element={
            <>
              <Navbar />
              <BookingConfirmation />
              <Footer />
            </>
          }
        />

        <Route
          path="/refund/:bookingId"
          element={
            <>
              <Navbar />
              <Refund />
              <Footer />
            </>
          }
        />

        {/* =========================
            RECEPTIONIST DASHBOARD
        ========================= */}

        <Route
          path="/dashboard/receptionist"
          element={
            <ProtectedRoute role="receptionist">
              <ReceptionistHome />
            </ProtectedRoute>
          }
        />
        <Route
  path="/dashboard/admin"
  element={
    <ProtectedRoute role="admin">
      <AdminHome />
    </ProtectedRoute>
  }
/>

<Route
  path="/dashboard/admin/rooms"
  element={
    <ProtectedRoute role="admin">
      <AdminRooms />
    </ProtectedRoute>
  }
/>

        <Route
          path="/dashboard/receptionist/rooms"
          element={
            <ProtectedRoute role="receptionist">
              <ReceptionistAvailableRooms />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/receptionist/feedback"
          element={
            <ProtectedRoute role="receptionist">
              <ReceptionistFeedback />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/receptionist/complaints"
          element={
            <ProtectedRoute role="receptionist">
              <ReceptionistComplaints />
            </ProtectedRoute>
          }
        />

        <Route
  path="/dashboard/admin/users"
  element={
    <ProtectedRoute role="admin">
      <AdminUsers />
    </ProtectedRoute>
  }
/>

<Route
  path="/dashboard/admin/reservations"
  element={
    <ProtectedRoute role="admin">
      <AdminReservations />
    </ProtectedRoute>
  }
/>

<Route
  path="/dashboard/admin/payments"
  element={
    <ProtectedRoute role="admin">
      <AdminPayments />
    </ProtectedRoute>
  }
/>


<Route
  path="/dashboard/admin/feedback"
  element={
    <ProtectedRoute role="admin">
      <AdminFeedback />
    </ProtectedRoute>
  }
/>

<Route
  path="/dashboard/admin/complaints"
  element={
    <ProtectedRoute role="admin">
      <AdminComplaints />
    </ProtectedRoute>
  }
/>
<Route
  path="/dashboard/admin/invoices"
  element={
    <ProtectedRoute role="admin">
      <AdminInvoices />
    </ProtectedRoute>
  }
/>

        <Route
          path="/dashboard/receptionist/guests"
          element={
            <ProtectedRoute role="receptionist">
              <ReceptionistGuests />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/receptionist/reservations"
          element={
            <ProtectedRoute role="receptionist">
              <ReceptionistReservations />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/receptionist/billing"
          element={
            <ProtectedRoute role="receptionist">
              <ReceptionistBilling />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/receptionist/invoices/:invoiceNumber"
          element={
            <ProtectedRoute role="receptionist">
              <CheckoutInvoice />
            </ProtectedRoute>
          }
        />

        {/* =========================
            MANAGER DASHBOARD
        ========================= */}

        <Route
          path="/dashboard/manager"
          element={
            <ProtectedRoute role="manager">
              <ManagerHome />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/manager/rooms/:id"
          element={
            <ProtectedRoute role="manager">
              <ManagerRoomDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/manager/feedback"
          element={
            <ProtectedRoute role="manager">
              <ManagerFeedback />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/manager/complaints"
          element={
            <ProtectedRoute role="manager">
              <ManagerComplaints />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/manager/guests"
          element={
            <ProtectedRoute role="manager">
              <ManagerGuests />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/manager/rooms"
          element={
            <ProtectedRoute role="manager">
              <ManagerRooms />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/manager/guests/:id"
          element={
            <ProtectedRoute role="manager">
              <ManagerGuestDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/manager/reservations"
          element={
            <ProtectedRoute role="manager">
              <ManagerReservations />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/manager/payments"
          element={
            <ProtectedRoute role="manager">
              <ManagerPayments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/manager/logout"
          element={
            <ProtectedRoute role="manager">
              <ManagerLogout />
            </ProtectedRoute>
          }
        />

        {/* =========================
            HOUSEKEEPING DASHBOARD
        ========================= */}

        <Route
          path="/dashboard/housekeeping"
          element={
            <ProtectedRoute role="housekeeping">
              <HousekeepingHome />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/housekeeping/maintenance"
          element={
            <ProtectedRoute role="housekeeping">
              <RoomMaintenance />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/housekeeping/complaints"
          element={
            <ProtectedRoute role="housekeeping">
              <RoomComplaints />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
