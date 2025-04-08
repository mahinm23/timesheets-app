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
    password: 'mysqlpassword',     
    database: 'timesheet_app'  
});

// Handler for Timesheet GET requests
// Handler functions are differentiated by the URL route
express_app.get('/api/timesheets', (req, res) => {
    connection.query('SELECT * FROM Timesheet', (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).send('Error fetching data');
        }
        res.json(results);
    });
});

// Handler for Timesheet POST requests
express_app.post('/api/timesheets', (req, res) => {
    // Debug lines, output incoming values to console
    let { employee_id, date, hours_worked } = req.body;
    console.log('Incoming POST values:', req.body);

    // Timesheet table has employee_id as an int so force parse as int
    employee_id = parseInt(employee_id);
    hours_worked = parseFloat(hours_worked);

    // SQL query
    const query = `
        INSERT INTO Timesheet (employee_id, date, hours_worked)
        VALUES (?, ?, ?)
    `;

    // Try query with the array of values posted
    connection.query(query, [employee_id, date, hours_worked], (err) => {
        if (err) {
            // There was an error, get the error code
            // err.code gets server errors and node.js errors
            console.error('POST request error in db_server.js: ', err.code);
            return -1;
        }
        console.log('POST request was handled successfuly in db_server.js');
    });
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

    // Create the Timesheets table if it doesn't exist
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS Timesheet (
        timesheet_id INT AUTO_INCREMENT PRIMARY KEY,
        employee_id INT NOT NULL,
        date DATE NOT NULL,
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