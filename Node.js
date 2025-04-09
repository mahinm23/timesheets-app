const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'TimeSheetApp'
});

app.use(bodyParser.json());

db.connect((err) => {
    if (err) {
        console.error('database connection failed:', err);
        return;
    }
    console.log('database connection successful');
});

app.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const query = 'INSERT INTO Employee (name, email, password, role) VALUES (?, ?, ?, ?)';

        db.query(query, [name, email, password, role], (err, result) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'register filed' });
            }
            res.status(201).json({ success: true, message: 'register successful' });
            });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'server error' });
    }
});

app.post('/login', async (req, res) => {
    const { name, password } = req.body;

    if (!name || !password) {
        return res.status(400).json({ success: false, message: 'name and password can not be null' });
    }

    try {
        db.query('SELECT * FROM Employee WHERE name = ?', [name], (err, results) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'server error' });
            }

            if (results.length === 0) {
                return res.status(400).json({ success: false, message: 'name or password error' });
            }

            const user = results[0];

            if (password === user.password) {
                return res.status(200).json({
                    success: true,
                    message: 'login successful',
                    role: user.role,
                    employeeId: user.employeeId,
                });
            } else {
                return res.status(400).json({ success: false, message: 'name or password error' });
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'server error' });
    }
});

app.post('/submit-timesheet', async (req, res) => {
    const { employeeId, periodStart, periodEnd, status } = req.body;

    if (!employeeId || !periodStart || !periodEnd || !status) {
        return res.status(400).json({ success: false, message: 'all arguments can not be null' });
    }

    try {
        const query = 'INSERT INTO Timesheet (employeeId, periodStart, periodEnd, status) VALUES (?, ?, ?, ?)';
        const submittedTime = new Date().toISOString();

        db.query(query, [employeeId, periodStart, periodEnd, status], (err, result) => {
            if (err) {
                console.error('fail to insert to database:', err);
                return res.status(500).json({ success: false, message: 'fail to submit, try again later' });
            }

            res.status(201).json({ success: true, message: 'submit successful' });
        });
    } catch (error) {
        console.error('error during submit:', error);
        res.status(500).json({ success: false, message: 'server error' });
    }
});



app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`);
});
