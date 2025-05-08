const express = require('express');
const { saveGameData, getResultsData } = require('../controllers/memoryController');
const router = express.Router();

// Route to save game data
router.post('/save', saveGameData);
router.get('/get/:userID', getResultsData);

module.exports = router;
