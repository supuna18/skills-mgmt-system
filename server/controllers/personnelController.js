const mysql = require('mysql2');
require('dotenv').config();

// Create Database connection
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// 1. Create new employee
exports.createPersonnel = (req, res) => {
    const { name, email, role, experience_level } = req.body;
    const sql = "INSERT INTO personnel (name, email, role, experience_level) VALUES (?, ?, ?, ?)";
    
    db.query(sql, [name, email, role, experience_level], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Personnel added successfully', id: result.insertId });
    });
};

// 2. සියලුම සේවකයින්ගේ ලැයිස්තුව ලබා ගැනීම (Read)
exports.getAllPersonnel = (req, res) => {
    const sql = "SELECT * FROM personnel";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// 3. සේවකයෙකුගේ විස්තර වෙනස් කිරීම (Update)
exports.updatePersonnel = (req, res) => {
    const { id } = req.params;
    const { name, email, role, experience_level } = req.body;
    const sql = "UPDATE personnel SET name=?, email=?, role=?, experience_level=? WHERE id=?";
    
    db.query(sql, [name, email, role, experience_level, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Personnel updated successfully' });
    });
};

// 4. සේවකයෙක් ඉවත් කිරීම (Delete)
exports.deletePersonnel = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM personnel WHERE id = ?";
    
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Personnel deleted successfully' });
    });
};