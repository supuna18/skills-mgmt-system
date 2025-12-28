const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// 1. Create New project 
exports.createProject = (req, res) => {
    const { project_name, description, start_date, end_date, status } = req.body;
    const sql = "INSERT INTO projects (project_name, description, start_date, end_date, status) VALUES (?, ?, ?, ?, ?)";
    
    db.query(sql, [project_name, description, start_date, end_date, status], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Project created successfully', projectId: result.insertId });
    });
};

// 2. Add project skills (Requirements)
exports.addProjectRequirement = (req, res) => {
    const { project_id, skill_id, min_proficiency_level } = req.body;
    const sql = "INSERT INTO project_skills (project_id, skill_id, min_proficiency_level) VALUES (?, ?, ?)";
    
    db.query(sql, [project_id, skill_id, min_proficiency_level], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Project requirement added successfully' });
    });
};

// 3. See the all Projects 
exports.getAllProjects = (req, res) => {
    const sql = "SELECT * FROM projects";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};