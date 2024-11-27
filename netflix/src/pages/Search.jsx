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
  const [allMovies, setAllMovies] = useState([]); // 모든 영화 데이터
  const [filteredMovies, setFilteredMovies] = useState([]); // 필터링된 영화 데이터
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [genre, setGenre] = useState("전체");
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
    // 선택된 장르의 ID 찾기
    const genreId = Object.keys(genreMapping).find((id) => genreMapping[id] === genre);

    // 필터링 조건 적용
    const filtered = allMovies.filter((movie) => {
      const matchesGenre = genre === "전체" || movie.genre_ids.includes(Number(genreId));
      return matchesGenre;
    });

    setFilteredMovies(filtered);
  }, [allMovies, genre, genreMapping]);

  // 필터 조건이 변경되면 필터링 적용
  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  // 무한 스크롤 핸들러
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

  // 필터 변경 핸들러
  const handleFilterChange = (filterType, value) => {
    if (filterType === "genre") {
      setGenre(value); // 장르 업데이트
    }
  };

  // 필터 초기화
  const handleReset = () => {
    setGenre("전체"); // 장르 초기화
  };

  return (
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
  );
};

export default Search;