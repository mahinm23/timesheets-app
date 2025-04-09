import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import SubmitTimesheet from "./pages/SubmitTimesheet";
import ConsultantDashboard from "./pages/ConsultantDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import ExecutiveDashboard from "./pages/ExecutiveDashboard";

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
