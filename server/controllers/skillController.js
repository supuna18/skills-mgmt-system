const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// 1. Add new skill to catalog
exports.createSkill = (req, res) => {
    const { skill_name, category, description } = req.body;
    const sql = "INSERT INTO skills (skill_name, category, description) VALUES (?, ?, ?)";
    db.query(sql, [skill_name, category, description], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Skill created successfully' });
    });
};

// 2. Assign a skills to the employees ( with Profiency level )
exports.assignSkillToPersonnel = (req, res) => {
    const { personnel_id, skill_id, proficiency_level } = req.body;
    const sql = "INSERT INTO personnel_skills (personnel_id, skill_id, proficiency_level) VALUES (?, ?, ?)";
    db.query(sql, [personnel_id, skill_id, proficiency_level], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Skill assigned to personnel successfully' });
    });
};

// 3. See all the skills 
exports.getAllSkills = (req, res) => {
    const sql = "SELECT * FROM skills";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};