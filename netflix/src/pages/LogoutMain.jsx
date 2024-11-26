import React from "react";
import { useNavigate } from "react-router-dom"; // React Router 사용
import styled from "styled-components";
import TVRed from "../assets/img/TVRed.png"; // 이미지 가져오기

// PlayButton 스타일 정의
const PlayButton = styled.button`
  background: var(--primary-color);
  color: var(--basic-font);
  font-size: 18px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;

  &:hover {
    background: transparent; /* 배경색 제거 */
    color: var(--primary-color); /* 텍스트 색상 변경 */
    transform: scale(1.05); /* 크기 증가 효과 */
  }

  &:active {
    transform: scale(0.98); /* 클릭 시 크기 감소 효과 */
  }
`;

function LogoutMain() {
  const navigate = useNavigate(); // 페이지 이동 함수

  const handleLogin = () => {
    navigate("/signin"); // "/signin" 페이지로 이동
  };

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(
          rgba(0, 0, 0, 0.7),
          rgba(0, 0, 0, 0.7)
        ), url(${TVRed})`, // 배경 이미지 및 그라데이션 추가
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        color: "#fff",
        textAlign: "center",
      }}
    >
      <div
        style={{
          transform: "translateY(-35px)", // 텍스트와 버튼 위로 이동
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px", // 텍스트와 버튼 사이 간격 조정
        }}
      >
        {/* 중앙 텍스트 */}
        <h1 style={{ fontSize: "3rem", marginBottom: "10px", color: "var(--basic-font)" }}>See What's Next</h1>
        {/* 로그인 버튼 */}
        <PlayButton onClick={handleLogin}>로그인하기</PlayButton>
      </div>
    </div>
  );
}

export default LogoutMain;
