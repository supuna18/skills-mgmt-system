const express = require('express');
const router = express.Router();
const skillController = require('../controllers/skillController');

router.post('/', skillController.createSkill); //  Add to catalog 
router.get('/', skillController.getAllSkills); // watch the all 
router.post('/assign', skillController.assignSkillToPersonnel); // contact to the employee

module.exports = router;