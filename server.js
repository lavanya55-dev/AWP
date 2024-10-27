const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const session = require('express-session');

// Database connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'user_login_database',
  port: 3306,
});

const app = express();


app.use(express.static(path.join(__dirname, '.')));


app.use(bodyParser.urlencoded({ extended: false }));


app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 * 60 }, // 1 hour session
  })
);

// Registration route
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const sql = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
  connection.query(sql, [name, email, hashedPassword], (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Registration failed!');
    } else {
      res.redirect('/login.html');
    }
  });
});


// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const sql = `SELECT * FROM users WHERE email = ?`;

  connection.query(sql, [email], async (err, user) => {
    if (err) {
      console.error(err);
      res.status(500).send('Login failed!');
    } else if (user.length === 0) {
      // Non-existent email block
      res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Invalid Login</title>
          <script>
            setTimeout(() => {
              window.location.href = '/login.html'; // Redirect to login page after 5 seconds
            }, 5000);
          </script>
        </head>
        <body>
          <h1>Invalid email or password</h1>
          <p>You will be redirected to the login page in 5 seconds.</p>
        </body>
        </html>
      `);
    } else {
      const isPasswordValid = await bcrypt.compare(password, user[0].password);
      if (isPasswordValid) {
        req.session.user = { id: user[0].id, name: user[0].name, email: user[0].email };
        res.redirect('/home'); // Redirect to home page
      } else {
        // Invalid password block
        res.send(`
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Invalid Login</title>
            <script>
              setTimeout(() => {
                window.location.href = '/login.html'; // Redirect to login page after 5 seconds
              }, 5000);
            </script>
          </head>
          <body>
            <h1>Invalid email or password</h1>
            <p>You will be redirected to the login page in 5 seconds.</p>
          </body>
          </html>
        `);
      }
    }
  });
});



// Home route
app.get('/home', (req, res) => {
  if (req.session.user) {
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome - Patient Dashboard</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-image: url('https://images.pexels.com/photos/4057308/pexels-photo-4057308.jpeg'); /* Live background image */
            background-size: cover;
            background-repeat: no-repeat;
            background-attachment: fixed;
            color: #333;
          }

          .overlay {
            background-color: rgba(0, 0, 100, 0.7); /* Dark blue overlay */
            min-height: 100vh;
            padding: 20px;
            box-sizing: border-box;
          }

          .container {
            max-width: 1200px;
            margin: 0 auto;
          }

          h1 {
            text-align: center;
            margin-bottom: 30px;
            color: azure;
            font-size: 3em;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
          }

          p {
            line-height: 1.6;
            text-align: center;
            font-size: 1.2em; /* Slightly larger text for paragraphs */
          }

          a {
            display: inline-block; /* Allow padding around the link */
            padding: 12px 20px; /* Padding for buttons */
            margin-top: 10px;
            color: #fff; /* White text color */
            background-color: blueviolet; /* Primary button color */
            border-radius: 5px; /* Rounded corners */
            text-decoration: none; /* Remove underline */
            transition: background-color 0.3s; /* Smooth background transition */
          }

          a:hover {
            background-color: #0056b3; /* Darker color on hover */
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2); /* Add shadow on hover */
          }

          footer {
            margin-top: 30px; /* Space between main content and footer */
            font-size: 0.9em;
            color: #b0bec5; /* Light gray for footer */
          }
        </style>
      </head>
      <body>
        <div class="overlay">
          <div class="container">
            <h1>Welcome, ${req.session.user.name}!</h1>
            <p><a href="/profile">Go to Profile</a></p>
            <p><a href="/logout">Logout</a></p>
            <footer>
              <p>Your health is our priority!</p>
            </footer>
          </div>
        </div>
      </body>
      </html>
    `);
  } else {
    res.redirect('/login.html');
  }
});



// Profile route

app.get('/profile', (req, res) => {
  if (req.session.user) {
    const user = req.session.user; // Retrieve user from session

    // Example data for the user's appointments, prescriptions, and history
    const appointments = [
      { doctor: 'Dr. Smith', date: 'April 5th at 10:00 AM' },
      { doctor: 'Dr. Johnson', date: 'April 12th at 2:30 PM' }
    ];

    const prescriptions = [
      { medicine: 'Amoxicillin', date: 'March 15th', dosage: '500mg, 3 times a day for 7 days' }
    ];

    const history = [
      { issue: 'Allergies to penicillin' },
      { surgery: 'Appendectomy in 2018' }
    ];

    const futureAppointments = []; // No future appointments example

    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Profile - Patient Dashboard</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-image: url('https://source.unsplash.com/1200x800/?medical,hospital');
            background-size: cover;
            background-repeat: no-repeat;
            background-attachment: fixed;
            color: #333;
          }
          .overlay {
            background-color: rgba(0, 0, 100, 0.7);
            min-height: 100vh;
            padding: 20px;
            box-sizing: border-box;
          }
          .container {
            max-width: 1200px;
            margin: 0 auto;
          }
          .section {
            background-color: #fff;
            padding: 20px;
            margin-bottom: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          h1 {
            text-align: center;
            margin-bottom: 30px;
            color: azure;
            font-size: 3em;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
          }
          h2 {
            margin-top: 0;
            color: #007bff;
          }
          p {
            line-height: 1.6;
          }
          .appointment, .prescription, .history, .future-appointment {
            margin-bottom: 30px;
          }
        </style>
      </head>
      <body>
        <div class="overlay">
          <div class="container">
            <h1>Welcome ${user.name}</h1>
            <div class="section appointment">
              <h2>Appointments</h2>
              ${appointments.length > 0 ? appointments.map(appointment => `
                <p>You have an appointment scheduled with ${appointment.doctor} on ${appointment.date}.</p>
              `).join('') : '<p>No appointments scheduled.</p>'}
            </div>
            <div class="section prescription">
              <h2>Past Prescriptions</h2>
              ${prescriptions.length > 0 ? prescriptions.map(prescription => `
                <p>You were prescribed ${prescription.medicine} on ${prescription.date}.<br>
                Medicine dosage: ${prescription.dosage}.</p>
              `).join('') : '<p>No past prescriptions available.</p>'}
            </div>
            <div class="section history">
              <h2>Patient History</h2>
              ${history.length > 0 ? history.map(item => `
                <p>${item.issue || item.surgery}</p>
              `).join('') : '<p>No patient history available.</p>'}
            </div>
            <div class="section future-appointment">
              <h2>Future Appointments</h2>
              ${futureAppointments.length > 0 ? futureAppointments.map(appointment => `
                <p>You have a future appointment scheduled.</p>
              `).join('') : '<p>No future appointments scheduled.</p>'}
            </div>
            <div class="section">
              <h2>Profile Information</h2>
              <p>Email: ${user.email}</p>
              <a href="/logout">Logout</a>
            </div>
          </div>
        </div>
      </body>
      </html>
    `);
  } else {
    res.redirect('/login.html'); // Redirect to login if not logged in
  }
});



// Logout route
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return console.error(err);
    }
    res.redirect('/login.html');
  });
});

// Start the server
app.listen(4000, () => console.log('Server listening on port 4000'));
