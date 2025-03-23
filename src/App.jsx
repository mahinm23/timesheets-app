import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import SubmitTimesheet from './pages/SubmitTimesheet';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route for Login Page */}
          <Route path="/" element={<LoginPage />} />

          {/* Route for Submit Timesheet Page */}
          <Route path="/submit-timesheet" element={<SubmitTimesheet />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
