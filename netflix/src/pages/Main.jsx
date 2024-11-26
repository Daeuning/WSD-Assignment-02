import React from 'react';
import ShowVideo from '../feature/ShowVideo.jsx';
import MovieListCarousel from "../feature/movieListCarousel.jsx";
import movieListService from "../service/movieListService";

function Main() {

  const movieId = 912649; // Venom: The Last Dance의 TMDB 영화 ID
  return (
    <div>
      <ShowVideo movieId={movieId} />
        <div style={{ backgroundColor: "#121212", minHeight: "100vh", paddingBottom: "20px" }}>
          <MovieListCarousel
            title="인기 영화"
            fetchMovies={() => movieListService.fetchPopularMovies(1)}
          />
          <MovieListCarousel
            title="최신 영화"
            fetchMovies={() => movieListService.fetchReleaseMovies(1)}
          />
          <MovieListCarousel
            title="액션 영화"
            fetchMovies={() => movieListService.fetchGenreMovies("28", 1)}
          />
        </div>
    </div>
  );
}

export default Main;