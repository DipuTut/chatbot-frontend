import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api/chat';

export const chatService = {
  sendMessage: async (message) => {
    try {
      const response = await axios.post(API_URL, { message });
      return response.data;
    } catch (error) {
      console.error('Error in chatService:', error);
      throw error;
    }
  },
};