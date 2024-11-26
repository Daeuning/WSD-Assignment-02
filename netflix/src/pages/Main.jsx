import React, { useState, useEffect } from "react";
import ShowVideo from "../feature/ShowVideo.jsx";
import MovieListCarousel from "../feature/movieListCarousel.jsx";
import movieListService from "../service/movieListService";
import LogoutMain from "../pages/LogoutMain.jsx"; // 로그인 페이지 컴포넌트

function Main() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리

  useEffect(() => {
    // localStorage에서 로그인 상태 확인
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []); // 컴포넌트가 처음 렌더링될 때 실행

  const movieId = 912649; // Venom: The Last Dance의 TMDB 영화 ID

  if (!isLoggedIn) {
    // 로그인 상태가 아닐 경우 로그인 페이지 렌더링
    return <LogoutMain />;
  }

  // 로그인 상태일 경우 메인 페이지 렌더링
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
