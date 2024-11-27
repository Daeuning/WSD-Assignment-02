import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import movieListService from "../service/movieListService";
import MovieCard from "../component/MovieCard";
import TopButton from "../layout/TopButton.jsx";

const SearchContainer = styled.div`
  padding: 20px;
  max-width: 82%;
  margin: 0 auto;

  @media screen and (max-width: 768px) {
    padding: 15px;
    max-width: 90%;
  }

  @media screen and (max-width: 480px) {
    padding: 10px;
    max-width: 95%;
  }
`;

const BannerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

const Banner = styled.div`
  font-size: 32px;
  font-weight: bold;
  text-align: left;
  color: var(--basic-font);
  padding: 20px;
  margin-bottom: 20px;
  margin-top: 10px;

  @media screen and (max-width: 768px) {
    font-size: 24px;
    padding: 10px;
    margin-bottom: 10px;
  }

  @media screen and (max-width: 480px) {
    font-size: 18px;
    padding: 5px;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  gap: 10px;

  @media screen and (max-width: 768px) {
    flex-wrap: wrap;
    gap: 5px;
  }
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

  @media screen and (max-width: 768px) {
    font-size: 12px;
    width: 100px;
    height: 35px;
  }

  @media screen and (max-width: 480px) {
    font-size: 10px;
    width: 90px;
    height: 30px;
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

  @media screen and (max-width: 768px) {
    font-size: 12px;
    width: 90px;
    height: 35px;
  }

  @media screen and (max-width: 480px) {
    font-size: 10px;
    width: 80px;
    height: 30px;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr); /* 한 행에 7개의 열 */
  gap: 16px;
  justify-content: center; /* 남는 공간을 중앙 정렬 */
  align-content: start;

  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(5, 1fr); /* 태블릿에서는 한 행에 5개의 열 */
    gap: 12px;
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr); /* 모바일에서는 한 행에 3개의 열 */
    gap: 10px;
  }

  @media screen and (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr); /* 작은 모바일에서는 한 행에 2개의 열 */
    gap: 8px;
  }
`;

const LoadingIndicator = styled.div`
  text-align: center;
  margin: 20px;
  color: var(--basic-font);
  font-size: 16px;

  @media screen and (max-width: 768px) {
    font-size: 14px;
  }

  @media screen and (max-width: 480px) {
    font-size: 12px;
  }
`;

const Search = () => {
  const [allMovies, setAllMovies] = useState([]); // 모든 영화 데이터
  const [filteredMovies, setFilteredMovies] = useState([]); // 필터링된 영화 데이터
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [genre, setGenre] = useState("전체");
  const [rating, setRating] = useState("전체"); // 별점 필터 상태
  const [language, setLanguage] = useState("전체"); // 언어 필터 상태
  const [genreMapping, setGenreMapping] = useState({});
  const observerRef = useRef(null);

  // 장르 매핑 데이터 로드
  useEffect(() => {
    const fetchGenreMapping = async () => {
      try {
        const mapping = await movieListService.fetchGenreMapping();
        setGenreMapping(mapping);
      } catch (error) {
        console.error("Error fetching genre mapping:", error);
      }
    };
    fetchGenreMapping();
  }, []);

  // 영화 데이터 가져오기
  const fetchMovies = useCallback(async (page) => {
    setIsLoading(true);
    try {
      const moviesBatch = await movieListService.fetchPopularMoviesWithGenres(page);

      // 영화 ID를 기준으로 중복 제거
      setAllMovies((prev) => {
        const allMoviesMap = new Map(prev.map((movie) => [movie.id, movie]));
        moviesBatch.forEach((movie) => {
          allMoviesMap.set(movie.id, movie); // 중복 제거를 위해 Map에 삽입
        });
        return Array.from(allMoviesMap.values()); // Map의 값들을 배열로 변환
      });
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies(currentPage);
  }, [fetchMovies, currentPage]);

  // 필터 적용 로직
  const applyFilters = useCallback(() => {
    const genreId = Object.keys(genreMapping).find((id) => genreMapping[id] === genre);

    const filtered = allMovies.filter((movie) => {
      const matchesGenre = genre === "전체" || movie.genre_ids.includes(Number(genreId));
      const matchesRating =
        rating === "전체" ||
        (rating === "9~10" && movie.vote_average >= 9) ||
        (rating === "8~9" && movie.vote_average >= 8 && movie.vote_average < 9) ||
        (rating === "7~8" && movie.vote_average >= 7 && movie.vote_average < 8) ||
        (rating === "6~7" && movie.vote_average >= 6 && movie.vote_average < 7) ||
        (rating === "5~6" && movie.vote_average >= 5 && movie.vote_average < 6) ||
        (rating === "4~5" && movie.vote_average >= 4 && movie.vote_average < 5) ||
        (rating === "4 이하" && movie.vote_average < 4);
      const matchesLanguage =
        language === "전체" || movie.original_language === (language === "영어" ? "en" : "ko");

      return matchesGenre && matchesRating && matchesLanguage;
    });

    setFilteredMovies(filtered);
  }, [allMovies, genre, rating, language, genreMapping]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

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

  const handleFilterChange = (filterType, value) => {
    if (filterType === "genre") setGenre(value);
    if (filterType === "rating") setRating(value);
    if (filterType === "language") setLanguage(value);
  };

  const handleReset = () => {
    setGenre("전체");
    setRating("전체");
    setLanguage("전체");
  };

  return (
    <>
    <SearchContainer>
      <BannerContainer>
        <Banner>찾아보기</Banner>
        <FilterGroup>
          <DropdownButton value={genre} onChange={(e) => handleFilterChange("genre", e.target.value)}>
            <option value="전체">장르 (전체)</option>
            {Object.entries(genreMapping).map(([id, name]) => (
              <option key={id} value={name}>
                {name}
              </option>
            ))}
          </DropdownButton>
          <DropdownButton value={rating} onChange={(e) => handleFilterChange("rating", e.target.value)}>
            <option value="전체">별점 (전체)</option>
            <option value="9~10">9~10</option>
            <option value="8~9">8~9</option>
            <option value="7~8">7~8</option>
            <option value="6~7">6~7</option>
            <option value="5~6">5~6</option>
            <option value="4~5">4~5</option>
            <option value="4 이하">4 이하</option>
          </DropdownButton>
          <DropdownButton value={language} onChange={(e) => handleFilterChange("language", e.target.value)}>
            <option value="전체">언어 (전체)</option>
            <option value="영어">영어</option>
            <option value="한국어">한국어</option>
          </DropdownButton>
          <ResetButton onClick={handleReset}>초기화</ResetButton>
        </FilterGroup>
      </BannerContainer>
      <GridContainer>
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
        {!isLoading && <div ref={observerRef}></div>}
      </GridContainer>
      {isLoading && <LoadingIndicator>Loading...</LoadingIndicator>}
      {filteredMovies.length === 0 && !isLoading && <p>조건에 맞는 영화가 없습니다.</p>}
    </SearchContainer>
  <TopButton />
</>
  );
};

export default Search;