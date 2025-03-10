import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MovieCard from "../component/MovieCard.jsx";
import movieListService from "../service/movieListService.js";

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

const PaginationControls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  color: var(--basic-font);
  margin-top: 20px;

  .page {
    width: 36px;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    color: var(--gray-dark);
    border: none;
    border-radius: 50%;
    cursor: pointer;
    background-color: transparent;
    transition: all 0.3s ease;

    &.active {
      background-color: var(--primary-color);
      color: var(--white);
    }

    &:hover:not(.active) {
      background-color: rgba(255, 0, 0, 0.1); /* 반투명 빨간색 */
    }

    @media screen and (max-width: 768px) {
      width: 28px;
      height: 28px;
      font-size: 14px;
    }

    @media screen and (max-width: 480px) {
      width: 24px;
      height: 24px;
      font-size: 12px;
    }
  }

  .arrow {
    font-size: 24px; /* 아이콘 크기 */
    color: var(--gray-dark);
    cursor: pointer;
    background: none; /* 배경 제거 */
    border: none; /* 테두리 제거 */
    padding: 0; /* 패딩 제거 */
    display: flex;
    justify-content: center;
    align-items: center;

    &.disabled {
      color: var(--gray);
      cursor: not-allowed;
    }

    &:hover:not(.disabled) {
      color: var(--primary-color); /* 호버 시 색상 변화 */
    }

    @media screen and (max-width: 768px) {
      font-size: 20px;
    }

    @media screen and (max-width: 480px) {
      font-size: 16px;
    }
  }
`;

const GridList = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5); // 5페이지로 제한
  const itemsPerPage = 14; // 한 페이지에 14개 항목

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage]);

  const fetchMovies = async (page) => {
    try {
      const data = await movieListService.fetchPopularMoviesWithGenres(page);
      setMovies(data.slice(0, itemsPerPage)); // 데이터 제한
    } catch (error) {
      console.error("Error fetching popular movies:", error);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          className={`page ${i === currentPage ? "active" : ""}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <>
      <GridContainer>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </GridContainer>
      <PaginationControls>
        <button
          className={`arrow ${currentPage === 1 ? "disabled" : ""}`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <span className="material-symbols-outlined">chevron_left</span>
        </button>
        {renderPagination()}
        <button
          className={`arrow ${currentPage === totalPages ? "disabled" : ""}`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </PaginationControls>
    </>
  );
};

export default GridList;
