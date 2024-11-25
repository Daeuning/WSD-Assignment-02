import axios from "axios";
import { tbdb } from '../config'; // config 파일에서 API URL 가져오기

const movieListService = {
  // LocalStorage에서 API 키 가져오기
  getApiKey: () => {
    const apiKey = localStorage.getItem('TMDb-Key');
    if (!apiKey) {
      throw new Error('API Key is missing. Please log in.');
    }
    return apiKey;
  },

  // 인기 영화 URL 생성
  getURL4PopularMovies: (page = 1) => {
    const apiKey = movieListService.getApiKey();
    return `${tbdb.API_URL}movie/popular?api_key=${apiKey}&language=ko-KR&page=${page}`;
  },

  // 개봉 영화 URL 생성
  getURL4ReleaseMovies: (page = 2) => {
    const apiKey = movieListService.getApiKey();
    return `${tbdb.API_URL}movie/now_playing?api_key=${apiKey}&language=ko-KR&page=${page}`;
  },

  // 장르별 영화 URL 생성
  getURL4GenreMovies: (genre, page = 1) => {
    const apiKey = movieListService.getApiKey();
    return `${tbdb.API_URL}discover/movie?api_key=${apiKey}&with_genres=${genre}&language=ko-KR&page=${page}`;
  },

  // 인기 영화 목록 가져오기
  fetchPopularMovies: async (page = 1) => {
    try {
      const url = movieListService.getURL4PopularMovies(page);
      const response = await axios.get(url);
      return response.data.results; // 영화 목록 반환
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      throw error;
    }
  },

  // 개봉 영화 목록 가져오기
  fetchReleaseMovies: async (page = 2) => {
    try {
      const url = movieListService.getURL4ReleaseMovies(page);
      const response = await axios.get(url);
      return response.data.results;
    } catch (error) {
      console.error('Error fetching release movies:', error);
      throw error;
    }
  },

  // 특정 장르의 영화 목록 가져오기
  fetchGenreMovies: async (genre, page = 1) => {
    try {
      const url = movieListService.getURL4GenreMovies(genre, page);
      const response = await axios.get(url);
      return response.data.results;
    } catch (error) {
      console.error('Error fetching genre movies:', error);
      throw error;
    }
  },
};

export default movieListService;
