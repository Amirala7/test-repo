import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api';

export const memoryRepository = {
    saveGameData: async (gameData) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/memory/save`, gameData, {
                headers: { "Content-Type": "application/json" },
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    getGameResults: async (userID) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/memory/get/${userID}`, {
                headers: { "Content-Type": "application/json" },
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    }
}; 