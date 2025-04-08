-- SQL schema for FDM Timesheets Application (Backend & Database Prototype)

CREATE DATABASE TimeSheetsApp;

-- Table: Employee
CREATE TABLE Employee (
    employeeId SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    role TEXT CHECK (role IN ('Consultant', 'Manager', 'Finance', 'Executive')) NOT NULL
);

-- Table: Timesheet
CREATE TABLE Timesheet(
    timeSheetId SERIAL PRIMARY KEY,
    status TEXT CHECK (status IN ('Draft', 'Submitted', 'Approved', 'Rejected')),
    weekStarting DATE NOT NULL,
    weekEnding DATE NOT NULL,
    createrId INT REFERENCES Employee(employeeId),
    submitted_at TIMESTAMP
);

CREATE TABLE rejectedTimesheet(
    id INT PRIMARY KEY,
    timeSheetId INT,
    reason TEXT,
    rejected_on DATE,
    reviewer_id INT,
    FOREIGN KEY (timeSheetId) REFERENCES timeSheet(timeSheetId),
    FOREIGN KEY (reviewer_id) REFERENCES Employee(employeeId)
);


# -- Table: Notification (optional, for Observer pattern simulation)
# CREATE TABLE Notification (
#     notification_id SERIAL PRIMARY KEY,
#     employee_id INT REFERENCES Employee(employee_id) ON DELETE CASCADE,
#     message TEXT NOT NULL,
#     created_at TIMESTAMP DEFAULT NOW(),
#     is_read BOOLEAN DEFAULT FALSE
# );

-- Sample data insert (optional for demo purposes)
INSERT INTO Employee (name, email, password, role) VALUES
    ('Alice Smith', 'alice@fdm.com', 'hashedpassword1', 'Consultant'),
    ('Bob Manager', 'bob@fdm.com', 'hashedpassword2', 'Manager');
