-- SQL schema for FDM Timesheets Application (Backend & Database Prototype)

-- Create database, robert
CREATE DATABASE timesheet_app;
-- Use database as target for sql commands, robert
USE timesheet_app;



-- Table: Employee
CREATE TABLE Employee (
    employee_id INT PRIMARY KEY,
    name VARCHAR(40) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(40) NOT NULL,
    role VARCHAR(15) CHECK (role IN ('Consultant', 'Manager', 'Finance', 'Executive')) NOT NULL
);

-- Table: Timesheet
/* Commented out to test Timesheet table, see below - robert */
/* CREATE TABLE Timesheet (
    timesheet_id SERIAL PRIMARY KEY,
    employee_id INT REFERENCES Employee(employee_id) ON DELETE CASCADE,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(10) CHECK (status IN ('Draft', 'Submitted', 'Approved', 'Rejected')) DEFAULT 'Draft',
    submitted_at TIMESTAMP
);
*/ 

-- Table: TimeEntry
CREATE TABLE TimeEntry (
    entry_id SERIAL PRIMARY KEY,
    timesheet_id INT REFERENCES Timesheet(timesheet_id) ON DELETE CASCADE,
    work_date DATE NOT NULL,
    hours NUMERIC(4, 2) CHECK (hours >= 0 AND hours <= 24),
    project TEXT,
    notes TEXT
);

-- Table: Notification (optional, for Observer pattern simulation)
CREATE TABLE Notification (
    notification_id SERIAL PRIMARY KEY,
    employee_id INT REFERENCES Employee(employee_id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    is_read BOOLEAN DEFAULT FALSE
);

-- Sample data insert (optional for demo purposes)
INSERT INTO Employee (name, email, password, role) VALUES
    ('Alice Smith', 'alice@fdm.com', 'hashedpassword1', 'Consultant'),
    ('Bob Manager', 'bob@fdm.com', 'hashedpassword2', 'Manager');

-- Test Make Timesheet table - robert
CREATE TABLE IF NOT EXISTS Timesheet (
        timesheet_id INT AUTO_INCREMENT PRIMARY KEY,
        employee_id INT NOT NULL,
        date DATE NOT NULL,
        hours_worked INT NOT NULL
        );