import axios from "axios";
import { tbdb } from "../config"; // config 파일에서 API URL 가져오기

const movieListService = {
  // LocalStorage에서 API 키 가져오기
  getApiKey: () => {
    const apiKey = localStorage.getItem("TMDb-Key");
    if (!apiKey) {
      throw new Error("API Key is missing. Please log in.");
    }
    return apiKey;
  },

  // 장르 매핑 데이터 가져오기
  fetchGenreMapping: async () => {
    try {
      const apiKey = movieListService.getApiKey();
      const url = `${tbdb.API_URL}genre/movie/list?api_key=${apiKey}&language=ko-KR`;
      const response = await axios.get(url);
      const genres = response.data.genres;

      // ID -> 이름 매핑 객체 생성
      return genres.reduce((acc, genre) => {
        acc[genre.id] = genre.name;
        return acc;
      }, {});
    } catch (error) {
      console.error("Error fetching genre mapping:", error);
      throw error;
    }
  },

  // 영화 데이터에 장르 이름 추가
  mapMoviesWithGenres: async (movies) => {
    try {
      const genreMapping = await movieListService.fetchGenreMapping();
      return movies.map((movie) => ({
        ...movie,
        genre_names: movie.genre_ids.map((id) => genreMapping[id] || "Unknown"),
      }));
    } catch (error) {
      console.error("Error mapping genres to movies:", error);
      throw error;
    }
  },

  // 인기 영화 목록 가져오기 (장르 포함)
  fetchPopularMoviesWithGenres: async (page = 1) => {
    try {
      const movies = await movieListService.fetchPopularMovies(page);
      return await movieListService.mapMoviesWithGenres(movies);
    } catch (error) {
      console.error("Error fetching popular movies with genres:", error);
      throw error;
    }
  },

  // 개봉 영화 목록 가져오기 (장르 포함)
  fetchReleaseMoviesWithGenres: async (page = 2) => {
    try {
      const movies = await movieListService.fetchReleaseMovies(page);
      return await movieListService.mapMoviesWithGenres(movies);
    } catch (error) {
      console.error("Error fetching release movies with genres:", error);
      throw error;
    }
  },

  // 특정 장르의 영화 목록 가져오기 (장르 포함)
  fetchGenreMoviesWithGenres: async (genre, page = 1) => {
    try {
      const movies = await movieListService.fetchGenreMovies(genre, page);
      return await movieListService.mapMoviesWithGenres(movies);
    } catch (error) {
      console.error("Error fetching genre movies with genres:", error);
      throw error;
    }
  },

  // 기존 URL 생성 함수들
  getURL4PopularMovies: (page = 1) => {
    const apiKey = movieListService.getApiKey();
    return `${tbdb.API_URL}movie/popular?api_key=${apiKey}&language=ko-KR&page=${page}`;
  },

  getURL4ReleaseMovies: (page = 2) => {
    const apiKey = movieListService.getApiKey();
    return `${tbdb.API_URL}movie/now_playing?api_key=${apiKey}&language=ko-KR&page=${page}`;
  },

  getURL4GenreMovies: (genre, page = 1) => {
    const apiKey = movieListService.getApiKey();
    return `${tbdb.API_URL}discover/movie?api_key=${apiKey}&with_genres=${genre}&language=ko-KR&page=${page}`;
  },

  // 기존 영화 데이터 가져오기 함수들
  fetchPopularMovies: async (page = 1) => {
    try {
      const url = movieListService.getURL4PopularMovies(page);
      const response = await axios.get(url);
      return response.data.results;
    } catch (error) {
      console.error("Error fetching popular movies:", error);
      throw error;
    }
  },

  fetchReleaseMovies: async (page = 2) => {
    try {
      const url = movieListService.getURL4ReleaseMovies(page);
      const response = await axios.get(url);
      return response.data.results;
    } catch (error) {
      console.error("Error fetching release movies:", error);
      throw error;
    }
  },

  fetchGenreMovies: async (genre, page = 1) => {
    try {
      const url = movieListService.getURL4GenreMovies(genre, page);
      const response = await axios.get(url);
      return response.data.results;
    } catch (error) {
      console.error("Error fetching genre movies:", error);
      throw error;
    }
  },

  // 다중 페이지의 인기 영화 목록 가져오기 (장르 포함)
  fetchPopularMoviesBatchWithGenres: async (startPage = 1, endPage = 3) => {
    try {
      const promises = [];
      for (let page = startPage; page <= endPage; page++) {
        promises.push(movieListService.fetchPopularMovies(page));
      }
      const results = await Promise.all(promises);
      const allMovies = results.flat(); // 여러 페이지의 데이터를 병합
  
      // 중복 제거: `id` 속성을 기준으로 Set을 사용
      const movieMap = new Map();
      allMovies.forEach((movie) => {
        if (!movieMap.has(movie.id)) {
          movieMap.set(movie.id, movie);
        }
      });
      const uniqueMovies = Array.from(movieMap.values());
  
      return await movieListService.mapMoviesWithGenres(uniqueMovies);
    } catch (error) {
      console.error("Error fetching batch of popular movies with genres:", error);
      throw error;
    }
  },

};

export default movieListService;
