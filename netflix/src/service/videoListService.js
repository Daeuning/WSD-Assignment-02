import axios from 'axios';
import { tbdb } from '../config.js'; // TMDB API URL 가져오기

const videoListService = {
  /**
   * LocalStorage에서 API Key 가져오기
   * @returns {string} API Key
   */
  getApiKey: () => {
    const apiKey = localStorage.getItem('TMDb-Key');
    if (!apiKey) {
      throw new Error('API Key is missing. Please log in.');
    }
    return apiKey;
  },

  /**
   * 특정 영화의 비디오 데이터 가져오기
   * @param {number} movieId - 영화 ID
   * @returns {Promise<Array>} 비디오 데이터 배열
   */
  fetchMovieVideos: async (movieId) => {
    try {
      const apiKey = videoListService.getApiKey(); // API Key 가져오기
      const url = `${tbdb.API_URL}movie/${movieId}/videos?api_key=${apiKey}`; // URL에 API Key 추가
      console.log('Request URL:', url);

      const response = await axios.get(url, {
        headers: {
          accept: 'application/json', // JSON 형식 요청
        },
      });

      console.log('Response Data:', response.data); // 디버깅용 응답 데이터
      return response.data.results; // 비디오 데이터 반환
    } catch (error) {
      console.error('Error fetching movie videos:', error.response || error.message);
      throw new Error('Failed to fetch video data.');
    }
  },
};

export default videoListService;
