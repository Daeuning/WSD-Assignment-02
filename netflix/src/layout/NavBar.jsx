import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice.js";

const NavBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 50px;
  background-color: rgba(0, 0, 0, 0.01);
  box-shadow: 0px 7px 29px 0px rgba(220, 37, 31, 0.1);
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Logo = styled.div`
  display: flex;
  margin-right: 25px;

  a {
    text-decoration: none;
    color: inherit;
  }
`;

const Menu = styled.div`
  display: flex;
  gap: 15px;
`;

const MenuItem = styled.a`
  text-decoration: none;
  color: var(--basic-font);
  font-size: 14px;
  cursor: pointer;

  &:hover {
    color: #007bff;
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
`;

function NavBar() {
  const dispatch = useDispatch();
  const { isLoggedIn, currentUser } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <NavBarContainer>
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
            <span>안녕하세요, {currentUser}님</span>
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
  );
}

export default NavBar;
