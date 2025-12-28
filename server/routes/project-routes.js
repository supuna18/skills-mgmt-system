const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

router.post('/', projectController.createProject); // To create project
router.get('/', projectController.getAllProjects); // See the list
router.post('/requirements', projectController.addProjectRequirement); // Skills 

module.exports = router;