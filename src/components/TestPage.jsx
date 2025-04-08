import React, { useState } from 'react';
import axios from 'axios';

// Component for test of submitting timesheets
//
function SubmitTimesheetTest() {
    // Test state variables to be inserted to Timetable 
  const [employeeID, setEmployeeID] = useState('');
  const [date, set_date] = useState('');
  const [hours_worked, set_hours_worked] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        // try post, POST endpoint defined in db_server.js
        // Left side employee_id, date etc are the ones being sent. Right side are the state from this element collected from the input
        await axios.post('http://localhost:5000/api/timesheets', {
            employee_id: employeeID,
            date: date,
            hours_worked: hours_worked
          });
    
        // Give the user some feedback that the timesheet submission succeeded
        alert('Timesheet successfully submitted');
    } catch (error) {
      console.log('POST attempt failed on TestPage.jsx line 25');
      // alert in browser submission failed
      alert('Submission failed');
    }
  };

  // HTML elements, a simple form to get input values for employee_id, data and hours_worked
  // form submission handled by handleSumit
  // events handled by onChange event handler functions
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={employeeID} placeholder="Employee ID"  onChange={(event) => setEmployeeID(event.target.value)} />
      <input type="date" value={date} onChange={(event) => set_date(e.target.value)} />
      <input type="number" value={hours_worked} placeholder="Hours Worked"  min = "0" step = "1" onChange={(event) => set_hours_worked(event.target.value)} />
      <button type="submit">Submit Timesheet</button>
    </form>
  );
}

export default SubmitTimesheetTest;