const express = require('express');
const router = express.Router();
const personnelController = require('../controllers/personnelController');

router.post('/', personnelController.createPersonnel);      // Create
router.get('/', personnelController.getAllPersonnel);       // Read All
router.put('/:id', personnelController.updatePersonnel);    // Update
router.delete('/:id', personnelController.deletePersonnel); // Delete

module.exports = router;