import React, { useState, useEffect } from "react";
import styled from "styled-components";
import movieListService from "../service/movieListService.js";
import MovieCard from "../component/MovieCard.jsx";

const PopularContainer = styled.div`
  padding: 20px;
  max-width: 82%;
  margin: 0 auto;
`;

const BannerContainer = styled.div`
  display: flex;
  flex-direction: row;
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

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const ToggleButton = styled.button`
  background-color: ${(props) => (props.active ? "var(--primary-color)" : "transparent")};
  color: ${(props) => (props.active ? "var(--basic-font)" : "rgba(255, 255, 255, 0.5)")};
  font-size: 16px;
  width: 50px;
  height: 50px;
  border: 2px solid ${(props) => (props.active ? "var(--primary-color)" : "var(--white-02dp)")};
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease, color 0.3s ease, border 0.3s ease;

  &:hover {
    background-color: ${(props) =>
      props.active ? "var(--primary-color)" : "rgba(255, 0, 0, 0.1)"};
    color: ${(props) => (props.active ? "var(--basic-font)" : "rgba(255, 255, 255, 0.8)")};
    border-color: ${(props) => (props.active ? "var(--primary-color)" : "rgba(220, 37, 31, 0.1)")};
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
`;

const PaginationControls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin: 20px 0;
  color: var(--basic-font);

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
  }
`;

const Popular = () => {
  const [activeView, setActiveView] = useState("grid");
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5); // 5페이지로 제한

  useEffect(() => {
    if (activeView === "grid") {
      fetchMovies(currentPage);
    }
  }, [activeView, currentPage]);

  const fetchMovies = async (page) => {
    try {
      const data = await movieListService.fetchPopularMoviesWithGenres(page);
      setMovies(data);
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
    <PopularContainer>
      <BannerContainer>
        <Banner>대세 콘텐츠</Banner>
        <ButtonGroup>
          <ToggleButton
            active={activeView === "grid"}
            onClick={() => setActiveView("grid")}
          >
            <span className="material-symbols-outlined">grid_on</span>
          </ToggleButton>
          <ToggleButton
            active={activeView === "list"}
            onClick={() => setActiveView("list")}
          >
            <span className="material-symbols-outlined">list</span>
          </ToggleButton>
        </ButtonGroup>
      </BannerContainer>

      {activeView === "grid" && (
        <>
          <GridContainer>
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </GridContainer>
          <div style={{ marginTop: "40px" }} />
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
      )}
    </PopularContainer>
  );
};

export default Popular;