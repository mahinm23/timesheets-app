import React, { useState } from "react";
import axios from "axios";

const TimesheetForm = () => {
  const employeeId = "123456";
  const employeeName = "John Doe";

  const [selectedWeek, setSelectedWeek] = useState("");

  const [entries, setEntries] = useState([
    { date: "", startTime: "", endTime: "", project: "", description: "", hoursWorked: 0 },
    { date: "", startTime: "", endTime: "", project: "", description: "", hoursWorked: 0 },
    { date: "", startTime: "", endTime: "", project: "", description: "", hoursWorked: 0 },
    { date: "", startTime: "", endTime: "", project: "", description: "", hoursWorked: 0 },
    { date: "", startTime: "", endTime: "", project: "", description: "", hoursWorked: 0 },
    { date: "", startTime: "", endTime: "", project: "", description: "", hoursWorked: 0 },
    { date: "", startTime: "", endTime: "", project: "", description: "", hoursWorked: 0 }
  ]);

  const calculateTotalHours = () => {
    return entries.reduce((total, entry) => total + parseFloat(entry.hoursWorked || 0), 0).toFixed(2);
  };

  const handleWeekChange = (e) => {
    setSelectedWeek(e.target.value);

    if (e.target.value) {
      const newEntries = [...entries];
      for (let i = 0; i < 7; i++) {
        newEntries[i].date = `2023-11-${13 + i}`;
      }
      setEntries(newEntries);
    }
  };

  const handleEntryChange = (index, field, value) => {
    const newEntries = [...entries];
    newEntries[index][field] = value;
    setEntries(newEntries);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = entries.map(entry => ({
        employee_id: employeeId,
        date: entry.date,
        start_time: entry.startTime,
        end_time: entry.endTime,
        project: entry.project,
        description: entry.description,
        hours_worked: entry.hoursWorked,
      }));

      await axios.post("http://localhost:5000/api/timesheets", payload);
      alert("Timesheet submitted successfully!");
    } catch (error) {
      console.error("Error submitting timesheet:", error);
      alert("Failed to submit timesheet.");
    }
  };

  return (
    <form className="p-4 border rounded shadow bg-white" style={{ maxWidth: "800px", margin: "0 auto" }} onSubmit={handleSubmit}>
      <div className="mb-3">
        <div className="alert alert-secondary" role="alert">
          Status: Draft
        </div>
      </div>

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

      <div className="mb-3">
        <label className="form-label">Week</label>
        <input 
          type="week" 
          className="form-control" 
          value={selectedWeek}
          onChange={handleWeekChange}
        />
      </div>

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
                    type="number" 
                    className="form-control" 
                    value={entry.hoursWorked}
                    onChange={(e) => handleEntryChange(index, 'hoursWorked', e.target.value)}
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

      <div className="mb-3">
        <label className="form-label">Total Hours for Week</label>
        <input 
          type="text" 
          className="form-control fw-bold" 
          disabled 
          value={calculateTotalHours()} 
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Additional Notes (Optional)</label>
        <textarea className="form-control" rows="3"></textarea>
      </div>

      <div className="d-flex justify-content-between">
        <button className="btn btn-secondary" type="button">Save as Draft</button>
        <button className="btn btn-primary" type="submit">Submit Timesheet</button>
      </div>
    </form>
  );
};

export default TimesheetForm;



