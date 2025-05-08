import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api';

export const userRepository = {
    login: async (username, password) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/users/login`, { username, password });
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    register: async (username, password) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/users/register`, { username, password });
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    }
}; 