import React, { useEffect, useState } from "react";
import styled from "styled-components";

const CarouselContainer = styled.div`
  max-width: 84%; /* 중앙 정렬을 위한 최대 너비 */
  margin: 0 auto; /* 가로 중앙 정렬 */
  padding: 70px 0px 10px 0px; /* 위아래 여백 */
`;

const CarouselTitle = styled.div`
  color: var(--basic-font);
  font-weight: 600;
  font-size: 24px;
  margin-bottom: 10px;
  padding-left: 20px; /* 제목 왼쪽 여백 */
`;

const CarouselContent = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  gap: 16px;
  padding: 10px 20px; /* 캐러셀 양쪽 여백 */

  &::-webkit-scrollbar {
    display: none; /* 스크롤바 숨기기 */
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
  z-index: 2;

  &:hover {
    transform: scale(1.05);
    transition: transform 0.3s ease;
  }
`;

const MovieTitle = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  font-size: 14px;
  padding: 5px;
  border-radius: 5px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const MovieListCarousel = ({ fetchMovies, title }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const fetchedMovies = await fetchMovies();
        setMovies(fetchedMovies);
      } catch (error) {
        console.error("Failed to load movies:", error);
      }
    };

    loadMovies();
  }, [fetchMovies]);

  return (
    <CarouselContainer>
      <CarouselTitle>{title}</CarouselTitle>
      <CarouselContent>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`,
            }}
          >
            <MovieTitle>{movie.title}</MovieTitle>
          </MovieCard>
        ))}
      </CarouselContent>
    </CarouselContainer>
  );
};

export default MovieListCarousel;
