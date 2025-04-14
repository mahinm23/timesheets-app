import React from "react";
import TimesheetForm from "../components/TimesheetForm.jsx";

const SubmitTimesheet = () => {
  return (
    <div className="bg-light py-5">
      <div className="container">
        <h1 className="text-center mb-4">Submit Timesheet</h1>
        <TimesheetForm />
      </div>
    </div>
  );
};

export default SubmitTimesheet;