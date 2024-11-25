import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";

const CarouselContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 70px 0px 10px 0px;
  position: relative; /* 화살표 버튼 위치를 위한 기준 */
`;

const CarouselTitle = styled.div`
  color: var(--basic-font);
  font-weight: 600;
  font-size: 24px;
  margin-bottom: 10px;
  text-align: left; /* 왼쪽 정렬 추가 */
  width: 82%; /* 부모 요소 기준으로 왼쪽 정렬 유지 */
`;

const CarouselContent = styled.div`
  display: flex;
  overflow-x: hidden; /* 스크롤 숨기기 */
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
  z-index: 1;

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

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }

  &.left {
    left: 10px;
  }

  &.right {
    right: 10px;
  }
`;

const MovieListCarousel = ({ fetchMovies, title }) => {
  const [movies, setMovies] = useState([]);
  const carouselRef = useRef(null);

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

  const slide = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.offsetWidth * 0.8; // 화면 너비의 80%만큼 이동
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
        &#8249;
      </ArrowButton>
      <CarouselContent ref={carouselRef}>
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
      <ArrowButton className="right" onClick={() => slide("right")}>
        &#8250;
      </ArrowButton>
    </CarouselContainer>
  );
};

export default MovieListCarousel;
