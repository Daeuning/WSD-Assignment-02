import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import movieListService from "../service/movieListService";
import MovieCard from "../component/MovieCard";

const SearchContainer = styled.div`
  padding: 20px;
  max-width: 82%;
  margin: 0 auto;
`;

const BannerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Banner = styled.div`
  font-size: 32px;
  font-weight: bold;
  text-align: left;
  color: var(--basic-font);
  padding: 20px;
  margin-bottom: 20px;
  margin-top: 10px;
`;

const FilterGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const DropdownButton = styled.select`
  background-color: var(--white-02dp);
  color: var(--basic-font);
  font-size: 14px;
  width: 120px;
  height: 40px;
  border: 2px solid var(--white-02dp);
  border-radius: 5px;
  cursor: pointer;
  padding: 5px;
  transition: background-color 0.3s ease, color 0.3s ease, border 0.3s ease;
  appearance: none;

  &:hover {
    background-color: rgba(255, 0, 0, 0.1);
    border-color: rgba(220, 37, 31, 0.5);
  }

  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }

  option {
    background-color: var(--background-color);
    color: var(--basic-font);
    font-size: 14px;
    padding: 10px;
  }
`;

const ResetButton = styled.button`
  background-color: transparent;
  color: var(--basic-font);
  font-size: 14px;
  width: 100px;
  height: 40px;
  border: 2px solid var(--white-02dp);
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease, border 0.3s ease;

  &:hover {
    background-color: rgba(255, 0, 0, 0.1);
    color: rgba(255, 255, 255, 0.8);
    border-color: rgba(220, 37, 31, 0.1);
  }
`;

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

const Search = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [genre, setGenre] = useState("전체");
  const [rating, setRating] = useState("전체");
  const [language, setLanguage] = useState("전체");
  const observerRef = useRef(null);

  const fetchMovies = useCallback(async (page) => {
    setIsLoading(true);
    try {
      const moviesBatch = await movieListService.fetchPopularMovies(page);
      setMovies((prev) => [...prev, ...moviesBatch]);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies(currentPage);
  }, [fetchMovies, currentPage]);

  const handleObserver = (entries) => {
    const [entry] = entries;
    if (entry.isIntersecting && !isLoading) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, { threshold: 1.0 });
    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [handleObserver]);

  const handleReset = () => {
    setGenre("전체");
    setRating("전체");
    setLanguage("전체");
    setMovies([]);
    setCurrentPage(1);
  };

  const filteredMovies = movies.filter((movie) => {
    const genreMatch = genre === "전체" || movie.genre_names.includes(genre);
    const ratingMatch =
      rating === "전체" ||
      (rating === "9~10" && movie.vote_average >= 9) ||
      (rating === "8~9" && movie.vote_average >= 8 && movie.vote_average < 9) ||
      (rating === "7~8" && movie.vote_average >= 7 && movie.vote_average < 8) ||
      (rating === "6~7" && movie.vote_average >= 6 && movie.vote_average < 7) ||
      (rating === "5~6" && movie.vote_average >= 5 && movie.vote_average < 6) ||
      (rating === "4~5" && movie.vote_average >= 4 && movie.vote_average < 5) ||
      (rating === "4점 이하" && movie.vote_average < 4);
    const languageMatch = language === "전체" || movie.original_language === language;

    return genreMatch && ratingMatch && languageMatch;
  });

  return (
    <SearchContainer>
      <BannerContainer>
        <Banner>찾아보기</Banner>
        <FilterGroup>
          <DropdownButton value={genre} onChange={(e) => setGenre(e.target.value)}>
            <option value="전체">장르 (전체)</option>
            <option value="Action">Action</option>
            <option value="Adventure">Adventure</option>
            <option value="Comedy">Comedy</option>
            <option value="Crime">Crime</option>
            <option value="Family">Family</option>
          </DropdownButton>
          <DropdownButton value={rating} onChange={(e) => setRating(e.target.value)}>
            <option value="전체">평점 (전체)</option>
            <option value="9~10">9~10</option>
            <option value="8~9">8~9</option>
            <option value="7~8">7~8</option>
            <option value="6~7">6~7</option>
            <option value="5~6">5~6</option>
            <option value="4~5">4~5</option>
            <option value="4점 이하">4점 이하</option>
          </DropdownButton>
          <DropdownButton value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="전체">언어 (전체)</option>
            <option value="en">영어</option>
            <option value="ko">한국어</option>
          </DropdownButton>
          <ResetButton onClick={handleReset}>초기화</ResetButton>
        </FilterGroup>
      </BannerContainer>
      <GridContainer>
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
        <div ref={observerRef}></div>
      </GridContainer>
      {isLoading && <LoadingIndicator>Loading...</LoadingIndicator>}
    </SearchContainer>
  );
};

export default Search;
