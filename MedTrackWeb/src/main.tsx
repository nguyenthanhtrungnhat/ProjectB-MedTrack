import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Screen from './Screen';
import BedsInRoom from './BedsInRoom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BedDetails from './BedDetails';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <Router>
            <Routes>
                <Route path="/" element={<Screen />} />
                <Route path="/beds-in-room" element={<BedsInRoom />} />
                <Route path="/bed-details" element={<BedDetails />} />
            </Routes>
        </Router>
  </StrictMode>
)
