-- CREATE DATABASE timesheets_db;

USE timesheets_db;

CREATE TABLE IF NOT EXISTS Employee(
    employeeId INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(50),
    password VARCHAR(10),
    role TEXT CHECK (role IN ('Consultant', 'Manager', 'Finance', 'Executive')) NOT NULL
);

CREATE TABLE IF NOT EXISTS Timesheet (
    timesheet_id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    date DATE NOT NULL,
    start_time TIME,
    end_time TIME,
    project VARCHAR(255),
    description TEXT,
    hours_worked DECIMAL(5, 2) NOT NULL
);

# INSERT INTO Employee (name, email, password, role) VALUES
# ('A1', 'alice@com', 'password1', 'Consultant');


