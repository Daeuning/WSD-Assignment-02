import axios from "axios";
import { tbdb } from "../config.js"; // TMDB API URL 가져오기

const videoListService = {
  getApiKey: () => {
    const apiKey = localStorage.getItem("TMDb-Key");
    if (!apiKey) {
      throw new Error("API Key is missing. Please log in.");
    }
    return apiKey;
  },

  fetchMovieVideos: async (movieId) => {
    try {
      const apiKey = videoListService.getApiKey();
      const url = `${tbdb.API_URL}movie/${movieId}/videos?api_key=${apiKey}`;
      const response = await axios.get(url);
      return response.data.results;
    } catch (error) {
      console.error("Error fetching movie videos:", error.response || error.message);
      throw new Error("Failed to fetch video data.");
    }
  },

  fetchMovieDetails: async (movieId) => {
    try {
      const apiKey = videoListService.getApiKey();
      const url = `${tbdb.API_URL}movie/${movieId}?api_key=${apiKey}&language=ko-KR`;
      const response = await axios.get(url);
      return response.data; // 전체 영화 상세정보 반환
    } catch (error) {
      console.error("Error fetching movie details:", error.response || error.message);
      throw new Error("Failed to fetch movie details.");
    }
  },
};

export default videoListService;
