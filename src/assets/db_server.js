// Import dependencies
import mysql from 'mysql2';
import express from 'express';
import cors from 'cors';

// Create an express instance, used to access express methods
const express_app = express();

// Enable json parsing
express_app.use(express.json()); 
express_app.use(cors()); 

// Create a connection object, used to connect and query the db
// The 'user' and 'password' fields should match those used to create the connection with MySQL in VS Code
// host is 'localhost' because we are hosting locally
// Once the connection is made, run the SQL command CREATE DATABASE from init_tables.sql , and the name should match 'timesheet-app'
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',     
    password: '',     
    database: 'timesheets_db',  
});

// Handler for Timesheet GET requests
// Handler functions are differentiated by the URL route
express_app.post('/api/timesheets', (req, res) => {
    const timesheets = req.body;

    const query = `
        INSERT INTO Timesheet (employee_id, date, start_time, end_time, project, description, hours_worked)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    // Insert each timesheet row
    for (const entry of timesheets) {
        const { employee_id, date, start_time, end_time, project, description, hours_worked } = entry;

        connection.query(query, [employee_id, date, start_time, end_time, project, description, hours_worked], (err) => {
            if (err) {
                console.error('Error inserting timesheet:', err);
                return res.status(500).send('Error inserting timesheet');
            }
        });
    }

    res.status(201).send('Timesheets submitted successfully');
});

// Connect to database using the connection object we created earlier
// When we connect, create any tables that don't exist (they should be created in the local MySQL connection using the SQL in init_tables.sql)
connection.connect( (err) => {
    if (err) {
        console.error('connection.connect() failed in db_server.js, error code:', err.code);
        return;
    }
    // Output to console that connection was successful
    console.log('Connected to MySQL database. ');

    // Use the database
    connection.query('USE timesheets_db;', (err) => {
        if (err) {
            console.error('Error using database:', err);
            return;
        }
        console.log('Using database timesheets_db.');
    });

    // Create the Timesheets table if it doesn't exist
    const createTableQuery = `
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
        `
    ;

    // When we connect, run the CREATE TABLE query, does nothing if Timetable already exists
    connection.query(createTableQuery, (err) => {
        if (err) {
            console.error('createTableQuery failed in db_server.js line 86, error code: ', err.code);
        } else {
            // Either Timetable table exists or was just created, output to console
            console.log('Timetable table detected');
        }
    });

    // Use Express to listen for HTTP requests
    // Must set a port to be the target for axios.post() etc. 
    // Use callback to output to console that server is running
    const port = 5000;
    express_app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
});