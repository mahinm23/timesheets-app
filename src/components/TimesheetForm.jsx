import React, { useState } from "react";

const TimesheetForm = () => {
  // Placeholder values for now
  const employeeId = "123456";
  const employeeName = "John Doe";
  
  // State for the week selection
  const [selectedWeek, setSelectedWeek] = useState("");
  
  // State for daily entries
  const [entries, setEntries] = useState([
    { date: "", startTime: "", endTime: "", project: "", description: "" },
    { date: "", startTime: "", endTime: "", project: "", description: "" },
    { date: "", startTime: "", endTime: "", project: "", description: "" },
    { date: "", startTime: "", endTime: "", project: "", description: "" },
    { date: "", startTime: "", endTime: "", project: "", description: "" },
    { date: "", startTime: "", endTime: "", project: "", description: "" },
    { date: "", startTime: "", endTime: "", project: "", description: "" }
  ]);
  
  // Calculate total hours for the week
  const calculateTotalHours = () => {
    // This is a placeholder - you'd implement actual calculation logic
    return "40.00";
  };

  const handleWeekChange = (e) => {
    setSelectedWeek(e.target.value);
    
    // When week changes, you could auto-populate dates here
    // This is just a placeholder - you'd need proper date logic
    if (e.target.value) {
      const newEntries = [...entries];
      for (let i = 0; i < 7; i++) {
        newEntries[i].date = `2023-11-${13 + i}`; // Example dates
      }
      setEntries(newEntries);
    }
  };

  const handleEntryChange = (index, field, value) => {
    const newEntries = [...entries];
    newEntries[index][field] = value;
    setEntries(newEntries);
  };

  return (
    <form className="p-4 border rounded shadow bg-white" style={{ maxWidth: "800px", margin: "0 auto" }}>
      {/* Status placeholder */}
      <div className="mb-3">
        <div className="alert alert-secondary" role="alert">
          Status: Draft
        </div>
      </div>

      {/* Auto-filled fields */}
      <div className="row mb-3">
        <div className='col'>
          <label className="form-label">Employee ID</label>
          <input type="text" className="form-control" value={employeeId} disabled />
        </div>

        <div className="col">
          <label className="form-label">Employee Name</label>
          <input type="text" className="form-control" value={employeeName} disabled />
        </div>
      </div>

      {/* Week selection */}
      <div className="mb-3">
        <label className="form-label">Week</label>
        <input 
          type="week" 
          className="form-control" 
          value={selectedWeek}
          onChange={handleWeekChange}
        />
      </div>

      {/* Weekly entries table */}
      <div className="table-responsive mb-3">
        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Hours</th>
              <th>Project/Task</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, index) => (
              <tr key={index}>
                <td>
                  <input 
                    type="date" 
                    className="form-control" 
                    value={entry.date}
                    onChange={(e) => handleEntryChange(index, 'date', e.target.value)}
                  />
                </td>
                <td>
                  <input 
                    type="time" 
                    className="form-control" 
                    value={entry.startTime}
                    onChange={(e) => handleEntryChange(index, 'startTime', e.target.value)}
                  />
                </td>
                <td>
                  <input 
                    type="time" 
                    className="form-control" 
                    value={entry.endTime}
                    onChange={(e) => handleEntryChange(index, 'endTime', e.target.value)}
                  />
                </td>
                <td>
                  <input 
                    type="text" 
                    className="form-control" 
                    value="8.00" // Placeholder - would calculate from times
                    disabled
                  />
                </td>
                <td>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={entry.project}
                    onChange={(e) => handleEntryChange(index, 'project', e.target.value)}
                  />
                </td>
                <td>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={entry.description}
                    onChange={(e) => handleEntryChange(index, 'description', e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Weekly total */}
      <div className="mb-3">
        <label className="form-label">Total Hours for Week</label>
        <input 
          type="text" 
          className="form-control fw-bold" 
          disabled 
          value={calculateTotalHours()} 
        />
      </div>

      {/* Notes section */}
      <div className="mb-3">
        <label className="form-label">Additional Notes (Optional)</label>
        <textarea className="form-control" rows="3"></textarea>
      </div>

      {/* Action buttons */}
      <div className="d-flex justify-content-between">
        <button className="btn btn-secondary" type="button">Save as Draft</button>
        <button className="btn btn-primary" type="button">Submit Timesheet</button>
      </div>
    </form>
  );
};

export default TimesheetForm;



