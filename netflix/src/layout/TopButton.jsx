import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Button = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  background-color: var(--primary-color, #007bff);
  color: white;
  border: none;
  border-radius: 50%;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transform: ${(props) => (props.visible ? "translateY(0)" : "translateY(20px)")};
  pointer-events: ${(props) => (props.visible ? "auto" : "none")};
  transition: opacity 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: var(--primary-color, #0056b3);
    transform: scale(1.1);
  }

  &:focus {
    outline: none;
  }

  svg {
    width: 24px;
    height: 24px;
    fill: white;
  }
`;

const TopButton = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    // 스크롤 여부만 확인
    setIsScrolled(window.scrollY > 0);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Button visible={isScrolled} onClick={scrollToTop}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.59 5.58L20 12l-8-8-8 8z" />
      </svg>
    </Button>
  );
};

export default TopButton;
