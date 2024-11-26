import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import MovieCard from "../component/MovieCard.jsx";

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
  }, [fetchMovies]);

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
          <MovieCard key={movie.id} movie={movie} />
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
