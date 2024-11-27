import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice.js";

const NavBarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 50px;
  background-color: ${({ isScrolled }) =>
    isScrolled ? "var(--background-color)" : "rgba(0, 0, 0, 0)"};
  box-shadow: ${({ isScrolled }) =>
    isScrolled
      ? "0px 7px 29px 0px rgba(220, 37, 31, 0.1)"
      : "none"};
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background-color: var(--background-color);
    box-shadow: 0px 7px 29px 0px rgba(220, 37, 31, 0.25);
  }

  @media (max-width: 768px) {
    padding: 10px 30px;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 10px 20px;
  }
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    width: 100%;
  }
`;

const Logo = styled.div`
  display: flex;
  margin-right: 25px;

  a {
    text-decoration: none;
    color: inherit;
  }

  @media (max-width: 480px) {
    margin-right: 0;
  }
`;

const Menu = styled.div`
  display: flex;
  gap: 15px;

  @media (max-width: 768px) {
    gap: 10px;
  }

  @media (max-width: 480px) {
    flex-wrap: wrap;
    gap: 5px;
    width: 100%;
    justify-content: flex-start;
  }
`;

const MenuItem = styled.a`
  text-decoration: none;
  color: var(--basic-font);
  font-size: 14px;
  cursor: pointer;

  &:hover {
    color: var(--primary-color);
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    margin: 5px 0;
  }
`;

const LoginTab = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 5px;

  &:hover {
    color: #007655;
  }

  a {
    text-decoration: none;
    color: inherit;
    display: flex;
    align-items: center;
    gap: 5px;
  }

  span {
    font-size: 14px;
    font-weight: 500;
    color: var(--basic-font);

    &.user-greeting {
      @media (max-width: 480px) {
        display: none !important; /* 모바일 화면에서는 강제 숨김 */
      }
    }
  }

  button {
    background: none;
    border: none;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    color: var(--basic-font);

    &:hover {
      color: var(--primary-color);
    }
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;

    span,
    button {
      font-size: 12px;
    }
  }
`;

function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, currentUser } = useSelector((state) => state.auth);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setTimeout(() => {
      window.location.reload(); // 새로고침
    }, 100);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <NavBarContainer isScrolled={isScrolled}>
        <LeftSection>
          <Logo>
            <Link to="/" className="material-symbols-outlined md-primary md-36">
              movie
            </Link>
          </Logo>
          <Menu>
            <MenuItem>
              <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                홈
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                to="/popular"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                대세 콘텐츠
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                to="/search"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                찾아보기
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                to="/wishlist"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                내가 찜한 리스트
              </Link>
            </MenuItem>
          </Menu>
        </LeftSection>
        <LoginTab>
          {isLoggedIn ? (
            <>
              <span className="user-greeting">안녕하세요, {currentUser}님</span>
              <span>|</span>
              <button onClick={handleLogout}>로그아웃</button>
            </>
          ) : (
            <Link to="/signin">
              <span className="material-symbols-outlined md-basic-white md-24">
                account_circle
              </span>
              <span>로그인</span>
            </Link>
          )}
        </LoginTab>
      </NavBarContainer>
      {/* 로그인 상태일 때만 렌더링 */}
      {isLoggedIn && <div style={{ marginTop: "55px" }} />}
    </>
  );
}

export default NavBar;
