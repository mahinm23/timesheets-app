import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import "./ExecutiveDashboard.css";

const ExecutiveDashboard = () => {
  const [timesheets, setTimesheets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate fetching from database
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // Simulated API call
      const data = [
        {
          id: 1,
          consultant: "Alice Smith",
          weekEnding: "2025-04-04",
          hours: 38,
          status: "Approved",
          reviewer: "Michael Chen",
        },
        {
          id: 2,
          consultant: "John Doe",
          weekEnding: "2025-03-28",
          hours: 40,
          status: "Rejected",
          reviewer: "Sarah Johnson",
        },
        // ...more rows
      ];
      setTimesheets(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  const chartData = [
    { name: "Approved", count: timesheets.filter(t => t.status === "Approved").length },
    { name: "Rejected", count: timesheets.filter(t => t.status === "Rejected").length },
    { name: "Pending", count: timesheets.filter(t => t.status === "Pending").length },
  ];

  return (
    <div className="container py-5">
      <div className="dashboard-header mb-4">
        <h1>Executive Overview</h1>
        <p>Analytics and history of consultant timesheets</p>
      </div>

      <div className="row mb-5">
        <div className="col-md-12">
          <div className="dashboard-card">
            <h2>Timesheet Status Overview</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#54B947" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="dashboard-card table-card">
            <h2>Historical Timesheets</h2>
            {loading ? (
              <p>Loading timesheets...</p>
            ) : (
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Consultant</th>
                      <th>Week Ending</th>
                      <th>Hours Logged</th>
                      <th>Status</th>
                      <th>Reviewer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {timesheets.map((sheet) => (
                      <tr key={sheet.id}>
                        <td>{sheet.consultant}</td>
                        <td>{sheet.weekEnding}</td>
                        <td>{sheet.hours}</td>
                        <td>
                          <span className={`status-badge ${sheet.status.toLowerCase()}`}>
                            {sheet.status}
                          </span>
                        </td>
                        <td>{sheet.reviewer}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveDashboard;

