const Result = require('../models/result');

exports.saveGameData = async (req, res) => {
    const { userID, gameDate, failed, difficulty, completed, timeTaken } = req.body;

    console.log('Received data to save:', req.body); 

    try {
       
        if (!userID || !gameDate || difficulty === undefined || completed === undefined || timeTaken === undefined) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const newResult = new Result({
            userID,
            gameDate,
            failed,
            difficulty,
            completed,
            timeTaken,
        });

        await newResult.save(); 
        res.status(201).json({ message: 'Game data saved successfully' });
    } catch (error) {
        console.error('Error saving game data:', error);
        res.status(500).json({ message: 'Error saving game data', error });
    }
};  


exports.getResultsData = async (req, res) => {
    const { userID } = req.params;
    // Could introduce a check here to see if the logged in user is the same as the userID

    try {
        const resultsData = await Result.find({ userID });
        console.log('Returning results data:', resultsData);
        res.status(200).json(resultsData);
    } catch (error) {
        console.error('Error fetching results data:', error);
        res.status(500).json({ message: 'Error fetching results data', error });
    }
};
