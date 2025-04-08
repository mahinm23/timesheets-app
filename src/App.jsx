
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import LoginPage from './pages/LoginPage';
import SubmitTimesheet from './pages/SubmitTimesheet';

import ConsultantDashboard from './pages/consultant-dashboard';
import ManagerDashboard from './pages/manager-dashboard';
import ExecutiveDashboard from './pages/executive-dashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Login Route */}
          <Route path="/" element={<LoginPage />} />

          {/* Timesheet Page */}
          <Route path="/submit-timesheet" element={<SubmitTimesheet />} />

          {/* Role Dashboards */}
          <Route path="/consultant-dashboard" element={<ConsultantDashboard />} />
          <Route path="/manager-dashboard" element={<ManagerDashboard />} />
          <Route path="/executive-dashboard" element={<ExecutiveDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;