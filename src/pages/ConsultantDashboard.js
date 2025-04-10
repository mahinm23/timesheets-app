import React, { useState, useEffect } from 'react';

const ConsultantDashboard = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [periodStart, setPeriodStart] = useState('');
  const [periodEnd, setPeriodEnd] = useState('');
  const [status, setStatus] = useState('Draft');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const storedEmployeeId = localStorage.getItem('employeeId');
    if (storedEmployeeId) {
      setEmployeeId(storedEmployeeId);
    } else {
      setMessage('user not login, please login');
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!employeeId) {
      setMessage('user not login, please login');
      return;
    }

    const timesheetData = {
      employeeId,
      periodStart,
      periodEnd,
      status,
    };

    try {
      const response = await fetch('http://localhost:3000/submit-timesheet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(timesheetData),
      });

      const result = await response.json();

      if (result.success) {
        setMessage('submit successful');
      } else {
        setMessage(result.message);
      }
    } catch (error) {
      setMessage('fail to submit, try again later');
    }
  };

  return (
      <div>
        <h2>Submit dashboard</h2>
        <form onSubmit={handleSubmit}>
            <label>start date:</label>
            <input
                type="date"
                value={periodStart}
                onChange={(e) => setPeriodStart(e.target.value)}
                required
            />
          <div>
            <label>end date:</label>
            <input
                type="date"
                value={periodEnd}
                onChange={(e) => setPeriodEnd(e.target.value)}
                required
            />
          </div>
          <div>
            <label>status:</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)} required>
              <option value="Draft">Draft</option>
              <option value="Submitted">Submitted</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          <div>
            <button type="submit">Submit Timesheet</button>
          </div>
        </form>
        {message && <p>{message}</p>}
      </div>
  );
};

export default ConsultantDashboard;
