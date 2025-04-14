import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import SubmitTimesheet from "./pages/SubmitTimesheet.js";
import ConsultantDashboard from "./pages/ConsultantDashboard.js";
import ManagerDashboard from "./pages/ManagerDashboard.js";
import ExecutiveDashboard from "./pages/ExecutiveDashboard.js";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Timesheet Page */}
                <Route path="/submit-timesheet" element={<SubmitTimesheet />} />

                {/* Role Dashboards */}
                <Route path="/consultant-dashboard" element={<ConsultantDashboard />} />
                <Route path="/manager-dashboard" element={<ManagerDashboard />} />
                <Route path="/executive-dashboard" element={<ExecutiveDashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
