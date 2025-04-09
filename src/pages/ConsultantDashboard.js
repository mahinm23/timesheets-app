import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import "./ConsultantDashboard.css";

const ConsultantDashboard = () => {
  const navigate = useNavigate();
  // Sample data for rejected timesheets
  const [rejectedTimesheets, setRejectedTimesheets] = useState([
    {
      timeSheetId: 1,
      weekEnding: "2025-03-28",
      rejectedOn: "2025-04-02",
      reason: "Missing project codes for Tuesday entries",
      reviewer: "Sarah Johnson"
    },
    {
      id: 2,
      weekEnding: "2025-03-21",
      rejectedOn: "2025-03-26",
      reason: "Exceeded maximum hours for Project Alpha",
      reviewer: "Michael Chen"
    }
  ]);

  // Navigation to timesheet pages
  const navigateToSubmitTimesheet = () => {
    navigate("/submit-timesheet");
  };

  const navigateToEditTimesheet = (id) => {
    navigate(`/edit-timesheet/${id}`);
  };

  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col">
          <div className="dashboard-header">
            <h1>Welcome, Consultant</h1>
            <p>Manage your timesheets and project billing</p>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Submit Timesheet Card */}
        <div className="col-md-6 mb-4">
          <div className="dashboard-card submit-card">
            <div className="icon-container">
              <div className="icon-circle">
                <i className="bi bi-calendar-plus"></i>
              </div>
            </div>
            <h2>Submit Timesheet</h2>
            <p className="card-description">Create and submit your weekly timesheet for client projects and internal work</p>
            <div className="action-button">
              <button 
                className="btn btn-primary w-100" 
                onClick={navigateToSubmitTimesheet}>
                New Timesheet
              </button>
            </div>
          </div>
        </div>

        {/* Rejected Timesheets Card */}
        <div className="col-md-6 mb-4">
          <div className="dashboard-card">
            <div className="card-header-with-badge">
              <h2>Rejected Timesheets</h2>
              {rejectedTimesheets.length > 0 && (
                <span className="badge rounded-pill">{rejectedTimesheets.length}</span>
              )}
            </div>
            
            {rejectedTimesheets.length > 0 ? (
              <div className="timesheet-list">
                {rejectedTimesheets.map(timesheet => (
                  <div key={timesheet.id} className="timesheet-item">
                    <div className="timesheet-content">
                      <h5 className="timesheet-date">Week Ending: {timesheet.weekEnding}</h5>
                      <p className="rejection-reason">{timesheet.reason}</p>
                      <p className="rejection-meta">
                        Rejected by {timesheet.reviewer} on {timesheet.rejectedOn}
                      </p>
                    </div>
                    <button 
                      className="btn btn-outline-primary" 
                      onClick={() => navigateToEditTimesheet(timesheet.id)}>
                      Review & Fix
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <i className="bi bi-check-circle"></i>
                <p>No rejected timesheets to display</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultantDashboard;
