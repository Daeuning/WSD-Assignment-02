import React, { useState } from "react";
import styled from "styled-components";

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
  appearance: none; /* 기본 화살표 유지 */

  &:hover {
    background-color: rgba(255, 0, 0, 0.1);
    border-color: rgba(220, 37, 31, 0.5);
  }

  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }

  /* 드롭다운 리스트 스타일 */
  option {
    background-color: var(--background-color); /* 리스트 다크 배경 */
    color: var(--basic-font); /* 리스트 텍스트 색상 */
    font-size: 14px;
    padding: 10px;
  }

  /* 선택된 옵션 스타일 */
  option:checked {
    background-color: var(--primary-color);
    color: var(--white);
  }

  /* 호버 상태 */
  option:hover {
    background-color: rgba(255, 0, 0, 0.2);
    color: var(--basic-font);
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

const Search = () => {
  const [genre, setGenre] = useState("전체");
  const [rating, setRating] = useState("전체");
  const [language, setLanguage] = useState("전체");

  const handleReset = () => {
    setGenre("전체");
    setRating("전체");
    setLanguage("전체");
  };

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
            <option value="영어">영어</option>
            <option value="한국어">한국어</option>
          </DropdownButton>
          <ResetButton onClick={handleReset}>초기화</ResetButton>
        </FilterGroup>
      </BannerContainer>
    </SearchContainer>
  );
};

export default Search;