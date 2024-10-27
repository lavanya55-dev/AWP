const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 50000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Database Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root', // Replace with your MySQL password
  database: 'appointment_db'
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to MySQL database.');
});

// Route to handle form submission
app.post('/submit-appointment', (req, res) => {
    const { full_name, phone_number, email_address, preferred_date } = req.body;
  
    const sql = 'INSERT INTO appointments (full_name, phone_number, email_address, preferred_date) VALUES (?, ?, ?, ?)';
    const values = [full_name, phone_number, email_address, preferred_date];
  
    console.log('SQL Query:', sql);
    console.log('Values:', values);
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        return res.status(500).json({ message: 'Failed to book appointment.' });
      }
      console.log('Data inserted:', result);
      res.status(200).json({ message: 'Appointment booked successfully.' });
    });
  });
  

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
