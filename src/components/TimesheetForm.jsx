import React from "react";

const TimesheetForm = () => {
  // Placeholder values for now
  const employeeId = "123456";
  const employeeName = "John Doe";

  return (
    <form className="p-4 border rounded shadow bg-white" style={{ maxWidth: "600px", margin: "0 auto" }}>

      {/* Status placeholder */}
      <div className="mb-3">
        <div className="alert alert-secondary" role="alert">
          Status: Draft
        </div>
      </div>

      {/* Auto-filled fields */}
      <div className="row">
        <div className='col'>
          <label className="form-label">Employee ID</label>
          <input type="text" className="form-control" value={employeeId} disabled />
        </div>

        <div className="col">
          <label className="form-label">Employee Name</label>
          <input type="text" className="form-control" value={employeeName} disabled />
        </div>
      </div>

      {/* Date and time */}
      <div className="mb-3">
        <label className="form-label">Date</label>
        <input type="date" className="form-control" />
      </div>

      <div className="row">
        <div className="col">
          <label className="form-label">Start Time</label>
          <input type="time" className="form-control" />
        </div>        

        <div className="col">
          <label className="form-label">End Time</label>
          <input type="time" className="form-control" />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Total Hours</label>
        <input type="text" className="form-control" disabled value="0.00" />
      </div>

      <div className="mb-3">
        <label className="form-label">Project/Task</label>
        <input type="text" className="form-control" />
      </div>

      <div className="mb-3">
        <label className="form-label">Work Description (Optional)</label>
        <textarea className="form-control" rows="3"></textarea>
      </div>

      {/* Action buttons (no functionality yet) */}
      <div className="d-flex justify-content-between">
        <button className="btn btn-secondary" type="button">Save as Draft</button>
        <button className="btn btn-primary" type="button">Submit Timesheet</button>
      </div>
    </form>
  );
};

export default TimesheetForm;



