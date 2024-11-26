import React, { useState } from "react";
import styled from "styled-components";
import GridList from "../feature/GridList.jsx";
import InfinityList from "../feature/InfinityList.jsx";

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

const Popular = () => {
  const [activeView, setActiveView] = useState("grid");

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

      {activeView === "grid" && <GridList />}
      {activeView === "list" && <InfinityList />}
    </PopularContainer>
  );
};

export default Popular;
