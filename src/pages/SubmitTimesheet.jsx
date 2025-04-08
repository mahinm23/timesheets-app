import React from "react";
import TimesheetForm from "../components/TimesheetForm";

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
// The SubmitTimesheet component is a simple wrapper around the TimesheetForm component. 
// It provides a heading and a container element to center the form on the page.