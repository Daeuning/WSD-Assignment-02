import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import movieListService from "../service/movieListService.js"; // 영화 데이터를 가져오는 서비스

const ArrowButton = styled.button`
  position: absolute;
  top: 60%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 18px;
  cursor: pointer;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease, background-color 0.3s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }

  &.left {
    left: 70px;
  }

  &.right {
    right: 70px;
  }
`;

const CarouselContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 70px 0px 10px 0px;
  position: relative;

  &:hover ${ArrowButton} {
    opacity: 1;
    pointer-events: auto;
  }
`;

const CarouselTitle = styled.div`
  color: var(--basic-font);
  font-weight: 600;
  font-size: 24px;
  margin-bottom: 10px;
  text-align: left;
  width: 82%;
`;

const CarouselContent = styled.div`
  display: flex;
  overflow-x: hidden;
  scroll-snap-type: x mandatory;
  max-width: 82%;
  gap: 16px;
  padding: 10px 20px;
  position: relative;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const MovieCard = styled.div`
  flex: 0 0 auto;
  width: 200px;
  height: 300px;
  border-radius: 10px;
  background-size: cover;
  background-position: center;
  scroll-snap-align: start;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
  }

  &:hover > div {
    opacity: 1;
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--white-01dp);
  backdrop-filter: blur(10px);
  border: 1px solid var(--white-03dp);
  border-radius: 10px;
  opacity: 0;
  transition: opacity 0.3s ease;
`;

const InfoText = styled.div`
  color: #fff;
  text-align: center;
  font-size: 14px;
  margin: 5px 0;
  text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.5);
`;

const MovieListCarousel = ({ fetchMovies, title }) => {
  const [movies, setMovies] = useState([]);
  const carouselRef = useRef(null);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const fetchedMovies = await fetchMovies(); // fetchMovies prop 호출
        setMovies(fetchedMovies);
      } catch (error) {
        console.error("Failed to load movies:", error);
      }
    };
  
    loadMovies();
  }, [fetchMovies]); // fetchMovies 의존성 추가

  const slide = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.offsetWidth * 0.8;
      const currentScroll = carouselRef.current.scrollLeft;

      if (direction === "left") {
        carouselRef.current.scrollTo({
          left: currentScroll - scrollAmount,
          behavior: "smooth",
        });
      } else if (direction === "right") {
        carouselRef.current.scrollTo({
          left: currentScroll + scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <CarouselContainer>
      <CarouselTitle>{title}</CarouselTitle>
      <ArrowButton className="left" onClick={() => slide("left")}>
        <span className="material-symbols-outlined md-basic-white">
          chevron_left
        </span>
      </ArrowButton>
      <CarouselContent ref={carouselRef}>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`,
            }}
          >
            <Overlay>
              <InfoText>{movie.title}</InfoText>
              <InfoText>평점: {movie.vote_average}</InfoText>
              <InfoText>개봉일: {movie.release_date}</InfoText>
              <InfoText>장르: {movie.genre_names?.join(", ") || "정보 없음"}</InfoText>
            </Overlay>
          </MovieCard>
        ))}
      </CarouselContent>
      <ArrowButton className="right" onClick={() => slide("right")}>
        <span className="material-symbols-outlined md-basic-white">
          chevron_right
        </span>
      </ArrowButton>
    </CarouselContainer>
  );
};

export default MovieListCarousel;
