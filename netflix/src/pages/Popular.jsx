import React, { useState } from "react";
import styled from "styled-components";

const PopularContainer = styled.div`
  padding: 20px;
  max-width: 84%;
  margin: 0 auto;
`;

const BannerContainer = styled.div`
  display: flex;
  flex-direction: row; /* 가로 방향 배치 */
  justify-content: space-between; /* 양쪽 끝에 배치 */
  align-items: center; /* 세로 방향 가운데 정렬 */
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
  gap: 10px; /* 버튼 간 간격 */
`;

const ToggleButton = styled.button`
  background-color: ${(props) => (props.active ? "var(--primary-color)" : "transparent")};
  color: ${(props) => (props.active ? "var(--basic-font)" : "rgba(255, 255, 255, 0.5)")};
  font-size: 16px;
  width: 50px; /* 정사각형 크기 */
  height: 50px; /* 정사각형 크기 */
  border: 2px solid ${(props) => (props.active ? "var(--primary-color)" : "var(--white-02dp)")};
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease, color 0.3s ease, border 0.3s ease;

  /* hover 효과는 active가 false일 때만 적용 */
  &:hover {
    background-color: ${(props) =>
      props.active ? "var(--primary-color)" : "rgba(255, 0, 0, 0.1)"};
    color: ${(props) => (props.active ? "var(--basic-font)" : "rgba(255, 255, 255, 0.8)")};
    border-color: ${(props) => (props.active ? "var(--primary-color)" : "rgba(220, 37, 31, 0.1)")};
  }

  &:active {
    background-color: var(--primary-color);
  }

  span {
    font-size: 28px; /* 아이콘 크기 조정 */
  }
`;

const Popular = () => {
  const [activeView, setActiveView] = useState("grid"); // grid or list

  return (
    <PopularContainer>
      <BannerContainer>
        {/* 대세 콘텐츠 텍스트 */}
        <Banner>대세 콘텐츠</Banner>

        {/* 버튼 그룹 */}
        <ButtonGroup>
          {/* Grid View 버튼 */}
          <ToggleButton
            active={activeView === "grid"}
            onClick={() => setActiveView("grid")}
          >
            <span className="material-symbols-outlined">grid_on</span>
          </ToggleButton>

          {/* List View 버튼 */}
          <ToggleButton
            active={activeView === "list"}
            onClick={() => setActiveView("list")}
          >
            <span className="material-symbols-outlined">list</span>
          </ToggleButton>
        </ButtonGroup>
      </BannerContainer>
    </PopularContainer>
  );
};

export default Popular;
