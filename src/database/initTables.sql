CREATE DATABASE TimeSheetApp;

USE TimeSheetApp;

CREATE TABLE IF NOT EXISTS Employee(
    employeeId INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(50),
    password VARCHAR(10),
    role TEXT CHECK (role IN ('Consultant', 'Manager', 'Finance', 'Executive')) NOT NULL
);

# INSERT INTO Employee (name, email, password, role) VALUES
# ('A1', 'alice@com', 'password1', 'Consultant');


