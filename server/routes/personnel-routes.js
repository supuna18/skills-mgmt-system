const express = require('express');                 //import the express  
const router = express.Router();                    //part of map
const personnelController = require('../controllers/personnelController');

router.post('/', personnelController.createPersonnel);      // Create
router.get('/', personnelController.getAllPersonnel);       // Read All
router.put('/:id', personnelController.updatePersonnel);    // Update
router.delete('/:id', personnelController.deletePersonnel); // Delete

module.exports = router;