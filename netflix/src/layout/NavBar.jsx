import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
    text-decoration: none; /* underline 제거 */
    color: inherit; /* 부모 색상 상속 */
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
  cursor: pointer;

  &:hover {
    color: #007655;
  }

  a {
    text-decoration: none; /* underline 제거 */
    color: inherit; /* 부모 색상 상속 */
  }
`;

function NavBar() {
  return (
    <NavBarContainer>
      <LeftSection>
        {/* 로고를 클릭하면 메인 페이지로 이동 */}
        <Logo>
          <Link to="/" className="material-symbols-outlined md-primary md-36">movie</Link>
        </Logo>
        <Menu>
          {/* 메뉴 항목에 경로 추가 */}
          <MenuItem>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>홈</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/popular" style={{ textDecoration: 'none', color: 'inherit' }}>대세 콘텐츠</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/search" style={{ textDecoration: 'none', color: 'inherit' }}>찾아보기</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/wishlist" style={{ textDecoration: 'none', color: 'inherit' }}>내가 찜한 리스트</Link>
          </MenuItem>
        </Menu>
      </LeftSection>
      <LoginTab>
        <Link to="/signin" className="material-symbols-outlined md-basic-white md-28">account_circle</Link>
      </LoginTab>
    </NavBarContainer>
  );
}

export default NavBar;
