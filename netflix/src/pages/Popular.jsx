import React, { useState, useEffect } from "react";
import styled from "styled-components";
import movieListService from "../service/movieListService.js";
import MovieCard from "../component/MovieCard.jsx";

const PopularContainer = styled.div`
  padding: 20px;
  max-width: 82%; /* WishList와 동일한 가로 너비 */
  margin: 0 auto; /* 가운데 정렬 */
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
  margin-bottom:20px;
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
  gap: 10px;
  margin: 20px 0;

  button {
    padding: 10px 20px;
    font-size: 16px;
    border: 1px solid var(--primary-color);
    border-radius: 5px;
    background-color: var(--white);
    cursor: pointer;

    &:disabled {
      background-color: var(--gray);
      cursor: not-allowed;
    }
  }
`;

const Popular = () => {
  const [activeView, setActiveView] = useState("grid"); // grid or list
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (activeView === "grid") {
      fetchMovies(currentPage);
    }
  }, [activeView, currentPage]);

  const fetchMovies = async (page) => {
    try {
      const data = await movieListService.fetchPopularMoviesWithGenres(page);
      setMovies(data);
      setTotalPages(10); // Assuming total pages is 10 for now; replace with API response if available
    } catch (error) {
      console.error("Error fetching popular movies:", error);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
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
          <PaginationControls>
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              이전
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              다음
            </button>
          </PaginationControls>
        </>
      )}
    </PopularContainer>
  );
};

export default Popular;
