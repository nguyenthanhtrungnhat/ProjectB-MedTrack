import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import NurseScreen from './Nurse/NurseScreen';
import BedsInRoom from './BedsInRoom';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import BedDetails from './BedDetails';
import ShiftChange from './Nurse/ShiftChange';
import DailyCheckingForm from './Nurse/DailyCheckingForm';
import HomePage from './HomePage';
import Header from './Header';
import LoginScreen from './Login/Login';
const Layout = () => (
  <>
    <Header />
    <Outlet />
  </>
);

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { index:true, element: <LoginScreen /> },
    ],
  },
  {
    path: "/home",
    element: <Layout />,
    children: [
      { index:true, element: <HomePage /> },
      { path: "/home/nurse-profile", element: <NurseScreen /> },
      { path: "/home/beds-in-room/:roomID", element: <BedsInRoom /> },
      { path: "/home/bed-details/:patientID", element: <BedDetails /> },
      { path: "/home/shift-change", element: <ShiftChange /> },
      { path: "/home/daily-checking", element: <DailyCheckingForm /> },
    ],
  }
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
