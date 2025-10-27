import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate
} from "react-router-dom";
import NurseScreen from "./Nurse/NurseScreen";
import BedsInRoom from "./BedsInRoom";
import BedDetails from "./BedDetails";
import ShiftChange from "./Nurse/ShiftChange";
import DailyCheckingForm from "./Nurse/DailyCheckingForm";
import HomePage from "./HomePage";
import Header from "./Header";
import LoginScreen from "./Login/Login";
import DoctorScreen from "./Doctor/DoctorScreen";
import AdminScreen from "./Admin/Admin";
import PatientScreen from "./Patient/PatientScreen";
import Schedule from "./Schedule";
import 'bootstrap/dist/css/bootstrap.min.css';        // Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js';   // Bootstrap JS with Popper
import Register from "./Login/Register";


const Layout = () => (
  <>
    <Header />
    <Outlet />
  </>
);
const ProtectedRoute = () => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace />; // Redirect to login if no token
  }

  return <Outlet />; // Render the requested page if authenticated
};
const router = createBrowserRouter([
  {
    path: "/",
    children: [{
      path: "/",
      element: <Layout />, // Wrap children with layout
      children: [
        { index: true, element: <HomePage /> },
        { path: "login", element: <LoginScreen /> },
        { path: "register", element: <Register /> },
      ],
    },],
  },
  {
    path: "/home",
    element: <ProtectedRoute />, // Wrap in ProtectedRoute
    children: [
      {
        path: "/home", element: <Layout />, children: [
          { index: true, element: <HomePage /> },
          { path: "nurse-profile", element: <NurseScreen /> },
          { path: "beds-in-room/:roomID", element: <BedsInRoom /> },
          { path: "bed-details/:patientID", element: <BedDetails /> },
          { path: "shift-change", element: <ShiftChange /> },
          { path: "daily-checking", element: <DailyCheckingForm /> },
          { path: "schedule", element: <Schedule /> },
          { path: "register", element: <Register /> },
        ]
      },
    ],
  },
  {
    path: "/doctor",
    element: <ProtectedRoute />, // Wrap in ProtectedRoute
    children: [
      {
        path: "/doctor", element: <Layout />, children: [
          { index: true, element: <HomePage /> },
          { path: "doctor-profile", element: <DoctorScreen /> },
        ]
      },
    ],
  },
  {
    path: "/patient",
    element: <ProtectedRoute />, // Wrap in ProtectedRoute
    children: [
      {
        path: "/patient", element: <Layout />, children: [
          { index: true, element: <HomePage /> },
          { path: "patient-profile", element: <PatientScreen /> },
        ]
      },
    ],
  },
  {
    path: "/admin",
    element: <ProtectedRoute />, // Wrap in ProtectedRoute
    children: [
      {
        path: "/admin", children: [
          { index: true, element: <AdminScreen /> },
        ]
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
