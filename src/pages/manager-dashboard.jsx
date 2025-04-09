import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ManagerDashboard.css";

const ManagerDashboard = () => {
  const navigate = useNavigate();

  // Sample data for pending timesheets
  const [pendingTimesheets, setPendingTimesheets] = useState([
    {
      id: 101,
      consultant: "John Doe",
      weekEnding: "2025-03-28",
      submittedOn: "2025-03-29",
      project: "Project Alpha"
    },
    {
      id: 102,
      consultant: "Jane Smith",
      weekEnding: "2025-03-21",
      submittedOn: "2025-03-22",
      project: "Project Beta"
    }
  ]);

  // Navigate to review/approval page
  const navigateToReviewTimesheet = (id) => {
    navigate(`/review-timesheet/${id}`);
  };

  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col">
          <div className="dashboard-header">
            <h1>Welcome, Manager</h1>
            <p>Review and approve consultant timesheets</p>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Pending Timesheets Card */}
        <div className="col-md-12 mb-4">
          <div className="dashboard-card">
            <div className="card-header-with-badge">
              <h2>Pending Timesheets</h2>
              {pendingTimesheets.length > 0 && (
                <span className="badge rounded-pill">{pendingTimesheets.length}</span>
              )}
            </div>

            {pendingTimesheets.length > 0 ? (
              <div className="timesheet-list">
                {pendingTimesheets.map(timesheet => (
                  <div key={timesheet.id} className="timesheet-item">
                    <div className="timesheet-content">
                      <h5 className="timesheet-date">
                        {timesheet.consultant} – Week Ending: {timesheet.weekEnding}
                      </h5>
                      <p className="project-info">Project: {timesheet.project}</p>
                      <p className="submitted-meta">
                        Submitted on {timesheet.submittedOn}
                      </p>
                    </div>
                    <button 
                      className="btn btn-outline-success" 
                      onClick={() => navigateToReviewTimesheet(timesheet.id)}>
                      Review & Approve
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <i className="bi bi-inbox"></i>
                <p>No pending timesheets to review</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;

