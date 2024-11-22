import React from 'react';
import styled from 'styled-components';

const NavBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #f8f9fa;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
`;

const Menu = styled.div`
  display: flex;
  gap: 15px;
`;

const MenuItem = styled.a`
  text-decoration: none;
  color: #555;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    color: #007bff;
  }
`;

const LoginTab = styled.div`
  font-size: 1rem;
  color: #007bff;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

function NavBar() {
  return (
    <NavBarContainer>
      <LeftSection>
        <Logo>MyLogo</Logo>
        <Menu>
          <MenuItem href="#home">Home</MenuItem>
          <MenuItem href="#about">About</MenuItem>
          <MenuItem href="#services">Services</MenuItem>
        </Menu>
      </LeftSection>
      <LoginTab>Login</LoginTab>
    </NavBarContainer>
  );
}

export default NavBar;
