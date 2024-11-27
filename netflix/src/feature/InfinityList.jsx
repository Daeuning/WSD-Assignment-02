import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import movieListService from "../service/movieListService.js";
import MovieCard from "../component/MovieCard.jsx";
import TopButton from "../layout/TopButton.jsx";

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

const DropdownButton = styled.select`
  margin: 20px 0;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;

  @media screen and (max-width: 768px) {
    font-size: 12px;
    padding: 8px;
  }

  @media screen and (max-width: 480px) {
    font-size: 10px;
    padding: 6px;
  }
`;

const ResetButton = styled.button`
  margin-left: 10px;
  padding: 10px 20px;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  background-color: #f00;
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #d00;
  }

  @media screen and (max-width: 768px) {
    font-size: 12px;
    padding: 8px 16px;
  }

  @media screen and (max-width: 480px) {
    font-size: 10px;
    padding: 6px 12px;
  }
`;

const InfinityList = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
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

  // 중복 제거 함수
  const removeDuplicates = (movies) => {
    const movieMap = new Map();
    movies.forEach((movie) => {
      if (!movieMap.has(movie.id)) {
        movieMap.set(movie.id, movie);
      }
    });
    return Array.from(movieMap.values());
  };

  // 영화 데이터 가져오기
  const fetchMovies = useCallback(async (page) => {
    setIsLoading(true);
    try {
      const moviesBatch = await movieListService.fetchPopularMoviesWithGenres(page);
      // 중복 제거 후 상태 업데이트
      setMovies((prev) => removeDuplicates([...prev, ...moviesBatch]));
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies(currentPage);
  }, [fetchMovies, currentPage]);

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

  // 필터링된 영화 계산
  const filteredMovies = movies.filter((movie) => {
    const genreId = Object.keys(genreMapping).find((id) => genreMapping[id] === genre);
    return genre === "전체" || movie.genre_ids.includes(Number(genreId));
  });

  // 필터 변경 핸들러
  const handleFilterChange = (e) => {
    setGenre(e.target.value);
    setMovies([]); // 기존 데이터 초기화
    setCurrentPage(1); // 페이지 초기화
  };

  // 필터 초기화
  const handleReset = () => {
    setGenre("전체");
    setMovies([]);
    setCurrentPage(1);
  };

  return (
    <>
      <GridContainer>
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
        {!isLoading && <div ref={observerRef}></div>}
      </GridContainer>
      {isLoading && <LoadingIndicator>Loading...</LoadingIndicator>}
      {filteredMovies.length === 0 && !isLoading && <p>조건에 맞는 영화가 없습니다.</p>}
      <TopButton />
    </>
  );
};

export default InfinityList;

