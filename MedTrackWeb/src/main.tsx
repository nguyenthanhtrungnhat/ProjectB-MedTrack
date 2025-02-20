import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import NurseScreen from './NurseScreen';
import BedsInRoom from './BedsInRoom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BedDetails from './BedDetails';
import ShiftChange from './ShiftChange';
import DailyCheckingForm from './DailyCheckingForm';
import HomePage from './HomePage';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <Router>
            <Routes>
                <Route path="/nurse-profile" element={<NurseScreen />} />
                <Route path="/beds-in-room/:roomID" element={<BedsInRoom />} />
                <Route path="/bed-details/:patientID" element={<BedDetails />} />
                <Route path="/shift-change" element={<ShiftChange />} />
                <Route path="/daily-checking" element={<DailyCheckingForm/>} />
                <Route path="/" element={<HomePage/>} />
            </Routes>
        </Router>
  </StrictMode>
)
