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

// 4. Matching Algorithm:
exports.matchPersonnel = (req, res) => {
    const { projectId } = req.params;

    // මෙම SQL Query එක මගින්:
    // 1. ප්‍රොජෙක්ට් එකට අවශ්‍ය Skills මොනවාදැයි බලයි.
    // 2. ඒ ඒ Skill එකට අවශ්‍ය අවම මට්ටම (Proficiency) ඇති අය සොයයි.
    // 3. අවසානයේ "සියලුම" අවශ්‍ය Skills ඇති අය පමණක් පෙරා (filter) දෙයි.
    
    const sql = `
        SELECT p.id, p.name, p.role, 
        GROUP_CONCAT(s.skill_name) AS matched_skills
        FROM personnel p
        JOIN personnel_skills ps ON p.id = ps.personnel_id
        JOIN skills s ON ps.skill_id = s.id
        WHERE (ps.skill_id, ps.proficiency_level) IN (
            SELECT skill_id, min_proficiency_level 
            FROM project_skills 
            WHERE project_id = ?
        )
        GROUP BY p.id
        HAVING COUNT(ps.skill_id) = (
            SELECT COUNT(*) FROM project_skills WHERE project_id = ?
        );
    `;

    db.query(sql, [projectId, projectId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};


