-- SQL schema for FDM Timesheets Application (Backend & Database Prototype)

CREATE DATABASE TimeSheetsApp;

-- Table: Employee
CREATE TABLE Employee (
    employee_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    role TEXT CHECK (role IN ('Consultant', 'Manager', 'Finance', 'Executive')) NOT NULL
);

-- Table: Timesheet
CREATE TABLE Timesheet (
    timesheet_id SERIAL PRIMARY KEY,
    employee_id INT REFERENCES Employee(employee_id) ON DELETE CASCADE,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status TEXT CHECK (status IN ('Draft', 'Submitted', 'Approved', 'Rejected')),
    submitted_at TIMESTAMP
);

-- Table: TimeEntry
CREATE TABLE TimeEntry (
    entry_id SERIAL PRIMARY KEY,
    timesheet_id INT REFERENCES Timesheet(timesheet_id) ON DELETE CASCADE,
    work_date DATE NOT NULL,
    hours NUMERIC(4, 2) CHECK (hours >= 0 AND hours <= 24),
    project TEXT,
    notes TEXT
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
