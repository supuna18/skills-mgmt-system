const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json()); // Read the JASON Data
app.use('/api/personnel', require('./routes/personnel-routes'));
app.use('/api/skills', require('./routes/skill-routes'));
app.use('/api/projects', require('./routes/project-routes'));  //Matching projects

// 1. Connect to the database part
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error('Cannot connect to the database!:', err);
    } else {
        console.log('Connected Succesfully to the MySql Database!');
    }
});

// 2. Examination(Route)
app.get('/', (req, res) => {
    res.send('Backend Server is working!');
});

// 3. Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server  Port is working on ${PORT} ... 🚀`);
});