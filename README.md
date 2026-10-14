[README-LuxuryStay.md](https://github.com/user-attachments/files/33417353/README-LuxuryStay.md)
# LuxuryStay — Hotel Management System

LuxuryStay is a full-stack hotel management web application built with the MERN stack. It brings the guest booking experience and day-to-day hotel operations into one system, with separate dashboards for hotel staff.

> **Project status:** This is an academic/portfolio project under active development. Some payment flows are simulated for demonstration purposes. The Admin dashboard and its advanced management features should be checked against the version of the Admin patch integrated into your branch before describing every feature as production-ready.

## Features

### Guest website
- Browse the hotel website, about page, gallery, and contact page.
- Register and log in to an account.
- Upload a profile picture and update profile details.
- Browse available rooms and view room information, pricing, capacity, amenities, and photos.
- Create reservations with check-in/check-out dates and guest counts.
- Complete the project's demonstration payment flow and view booking confirmation.
- View bookings from the profile area and request cancellation/refund through the implemented flow.
- Submit feedback and ratings.

### Receptionist dashboard
- View guests and reservations.
- Review room availability and reservation information.
- Verify reservations and mark guests as occupying a room.
- Manage billing and checkout invoices.
- Review and update guest feedback.
- Record room complaints and follow their status.

### Manager dashboard
- View operational summaries and room information.
- Inspect room and guest details.
- Review reservations, payments, invoices, feedback, and complaints.

### Housekeeping dashboard
- View room-cleaning tasks and maintenance status.
- Mark rooms as cleaned.
- View room complaints and update their status.
- Receive dashboard/sidebar indicators for work that needs attention.

### Admin dashboard
The project contains Admin dashboard UI and route scaffolding. User role assignment/blocking, complete room and reservation administration, and revenue reporting depend on the Admin backend and frontend files being integrated and tested in the current project branch. If you are using the separate LuxuryStay Admin Panel patch, merge its files before presenting those capabilities as complete.

## Tech stack

**Frontend**
- React
- Vite
- React Router
- Tailwind CSS 4 with the Vite plugin
- jsPDF for PDF generation

**Backend**
- Node.js
- Express
- MongoDB
- Mongoose
- bcryptjs for password hashing
- Multer for profile-photo uploads
- dotenv for environment configuration
- CORS

## Project structure

```text
LuxuryStay/
├── backend/
│   ├── controllers/
│   ├── database/
│   ├── models/
│   ├── routers/
│   ├── services/
│   ├── uploads/
│   ├── .env
│   └── server.js
└── frontend/
    └── frontend/
        ├── public/
        ├── src/
        │   ├── components/
        │   ├── dashboard/
        │   │   ├── admin/
        │   │   ├── housekeeper/
        │   │   ├── manager/
        │   │   └── receptionist/
        │   └── pages/
        ├── package.json
        └── vite.config.js
```

## Requirements

Install the following before running the project:

- Node.js and npm
- MongoDB running locally, or a MongoDB connection URI
- Git (optional, for cloning the repository)

## Installation and setup

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd LuxuryStay
```

Replace `<YOUR_GITHUB_REPOSITORY_URL>` with your repository URL.

### 2. Configure the backend environment

Open a terminal in the backend folder:

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```env
MONGO_URI=mongodb://127.0.0.1:27017/luxurystay
```

Use your own MongoDB connection string if you use MongoDB Atlas. Never commit database credentials or secrets to GitHub.

### 3. Start the backend

From `LuxuryStay/backend`:

```bash
node server.js
```

For automatic restarts during development, install/use nodemon if needed:

```bash
npx nodemon server.js
```

The backend runs on:

```text
http://localhost:5000
```

The server serves uploaded files from the `/uploads` path and starts the room-maintenance scheduler after MongoDB connects.

### 4. Install and start the frontend

Open a **second terminal**:

```bash
cd LuxuryStay/frontend/frontend
npm install
npm run dev
```

Vite will print the local development URL in the terminal, commonly:

```text
http://localhost:5173
```

Open the URL printed by Vite in your browser.

## Main application routes

### Public pages

| Route | Purpose |
|---|---|
| `/` | Home page |
| `/about` | About the hotel |
| `/gallery` | Hotel gallery |
| `/contact` | Contact page |
| `/register` | Create an account |
| `/login` | Sign in |
| `/profile` | Guest profile and booking information |
| `/edit-profile` | Edit profile details |
| `/rooms` | Browse rooms |
| `/room/:id` | Room details |
| `/booking` | Booking flow |
| `/payment` | Demonstration payment flow |
| `/booking-confirmation/:bookingId` | Booking confirmation |
| `/refund/:bookingId` | Cancellation/refund flow |
| `/feedback` | Guest feedback |

### Staff dashboards

| Route | Purpose |
|---|---|
| `/dashboard/receptionist` | Receptionist dashboard |
| `/dashboard/manager` | Manager dashboard |
| `/dashboard/housekeeping` | Housekeeping dashboard |
| `/dashboard/admin` | Admin dashboard entry point |

Additional staff routes are defined in the frontend router for rooms, guests, reservations, billing, feedback, complaints, maintenance, and related details.

## Data models

The backend includes Mongoose models for:

- **User** — account details, password hash, profile picture, and role.
- **Room** — room number, type, price, capacity, amenities, description, photos, and status.
- **RoomType** — room-type information.
- **Booking** — guest, room, dates, guest count, nights, charges, payment status, refund status, and reservation status.
- **CheckoutInvoice** — checkout and invoice information.
- **Feedback** — guest rating, message, and moderation status.
- **Complaint** — room complaint details and resolution status.
- **RoomMaintenance** — cleaning status and cleaning schedule information.

## User roles

The User model supports these roles:

- `guest`
- `admin`
- `receptionist`
- `manager`
- `housekeeping`

The frontend includes a `ProtectedRoute` component for role-based dashboard navigation. This is a learning-project access check, not a replacement for server-side authentication and authorization on every protected API endpoint.

## API route groups

The Express server mounts these API route groups:

| Base path | Purpose |
|---|---|
| `/api/auth` | Signup, login, profile update, logout |
| `/api/rooms` | Room listing, room types, room details, and room availability data |
| `/api/bookings` | Reservations, payment flow, user bookings, cancellation, checkout, and invoices |
| `/api/feedback` | Guest feedback and feedback status operations |
| `/api/receptionist` | Receptionist guest and reservation operations |
| `/api/complaints` | Create and manage room complaints |
| `/api/room-maintenance` | Room-cleaning status and maintenance operations |
| `/api/manager` | Manager dashboard, rooms, guests, reservations, payments, invoices, feedback, and complaints |

An Admin API route group must be mounted in `backend/server.js` when the corresponding Admin backend is added to the project.

## Important notes

- The payment flow is for project demonstration and should not be treated as a real payment-gateway integration unless you separately configure one.
- The frontend uses local browser storage for its current login state. Client-side route protection can be bypassed and is not sufficient for production security.
- Before deploying publicly, add server-side authentication and role authorization, validate and sanitize all inputs, restrict upload types and sizes, configure production CORS, and store secrets only in environment variables.
- Do not upload `node_modules`, real `.env` credentials, private user data, or production uploads to a public repository.
- Revenue reporting should be based on recorded payment timestamps and successful payments. Do not infer payment dates from reservation creation dates.

## Development commands

Run these from their respective folders:

**Backend**

```bash
npm install
node server.js
```

**Frontend**

```bash
npm install
npm run dev
npm run build
npm run lint
```

## Future improvements

- Complete and secure the Admin management API.
- Add server-side authentication and role-based authorization.
- Integrate a real payment gateway and verified payment records.
- Add automated tests for booking, payment, cancellation, and role permissions.
- Add deployment configuration and production logging.

## Author

**Rafay Junaid**

Built as a hotel management system project using React, Express, Node.js, and MongoDB.

---

If you found this project useful, consider giving the repository a ⭐ on GitHub.
