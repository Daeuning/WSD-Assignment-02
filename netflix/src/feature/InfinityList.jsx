import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import movieListService from "../service/movieListService.js";
import MovieCard from "../component/MovieCard.jsx";
import TopButton from "../layout/TopButton.jsx";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  justify-content: center;
  align-content: start;
`;

const LoadingIndicator = styled.div`
  text-align: center;
  margin: 20px;
  color: var(--basic-font);
  font-size: 16px;
`;

const InfinityList = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef(null);

  // Fetch movies and append to existing list
  const fetchMovies = useCallback(async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const data = await movieListService.fetchPopularMoviesWithGenres(currentPage);
      setMovies((prevMovies) => [...prevMovies, ...data]);
      setCurrentPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, isLoading]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const handleObserver = (entries) => {
    const [entry] = entries;
    if (entry.isIntersecting && !isLoading) {
      fetchMovies();
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, { threshold: 1.0 });
    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [handleObserver]);

  return (
    <>
      <GridContainer>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
        <div ref={observerRef}></div>
      </GridContainer>
      {isLoading && <LoadingIndicator>Loading...</LoadingIndicator>}
      <TopButton />
    </>
  );
};

export default InfinityList;
