import React, { useState } from 'react';
import styled from 'styled-components';

// Styled Components
const Container = styled.div`
  margin: auto;
  width: 650px;
  height: 550px;
  position: relative;
`;

const Welcome = styled.div`
  background: var(--white-02dp);
  width: 650px;
  height: 415px;
  position: absolute;
  top: 25%;
  border-radius: 5px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
`;

const PinkBox = styled.div`
  position: absolute;
  top: -10%;
  left: ${({ isSignUp }) => (isSignUp ? '45%' : '5%')};
  background: rgba(234, 199, 204, 0.4); /* 반투명 배경 */
  backdrop-filter: blur(10px); /* 유리 효과 */
  border: 1px solid rgba(255, 255, 255, 0.3); /* 가벼운 테두리 */
  width: 320px;
  height: 500px;
  border-radius: 15px;
  box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.2); /* 더 부드러운 그림자 */
  transition: all 0.5s ease-in-out;
  z-index: 2;
`;

const FormBox = styled.div`
  display: ${({ isHidden }) => (isHidden ? 'none' : 'block')};
  transition: all 0.5s ease;
`;

const LeftBox = styled.div`
  position: absolute;
  width: 50%;
  left: -2%;
  transition: 1s all ease;
`;

const RightBox = styled.div`
  position: absolute;
  width: 50%;
  right: -2%;
  transition: 1s all ease;
`;

const Title = styled.h2`
  font-family: 'Lora', serif;
  color: #8e9aaf;
  font-size: 1.8em;
  line-height: 1.1em;
  letter-spacing: 3px;
  text-align: center;
  font-weight: 300;
  margin-top: 20%;
`;

const Desc = styled.p`
  margin-top: -8px;
  font-family: 'Open Sans', sans-serif;
  font-size: 0.7em;
  letter-spacing: 2px;
  color: #8e9aaf;
  text-align: center;

  span {
    color: #eac7cc;
  }
`;

const Button = styled.button`
  margin-top: 45%;
  background: #8e9aaf;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.8em;
  text-transform: uppercase;
`;

const Input = styled.input`
  display: block;
  width: 90%;
  margin: 10px auto;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;

  label {
    margin-left: 5px;
    font-size: 0.8em;
  }
`;

// React Component
const SignInUI = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <Container>
      <Welcome>
        <PinkBox isSignUp={isSignUp}>
          <FormBox isHidden={!isSignUp}>
            <h1>register</h1>
            <form autoComplete="off">
              <Input type="text" placeholder="username" />
              <Input type="email" placeholder="email" />
              <Input type="password" placeholder="password" />
              <Input type="password" placeholder="confirm password" />
              <Button type="submit">create account</Button>
            </form>
          </FormBox>
          <FormBox isHidden={isSignUp}>
            <h1>sign in</h1>
            <form autoComplete="off">
              <Input type="text" placeholder="username" />
              <Input type="password" placeholder="password" />
              <CheckboxContainer>
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">remember me</label>
              </CheckboxContainer>
              <Button type="submit">login</Button>
            </form>
          </FormBox>
        </PinkBox>
        <LeftBox>
          <Title>
            <span>BLOOM</span>&<br />
            BOUQUET
          </Title>
          <Desc>
            pick your perfect <span>bouquet</span>
          </Desc>
          <Button onClick={() => setIsSignUp(false)}>login</Button>
        </LeftBox>
        <RightBox>
          <Title>
            <span>BLOOM</span>&<br />
            BOUQUET
          </Title>
          <Desc>
            pick your perfect <span>bouquet</span>
          </Desc>
          <Button onClick={() => setIsSignUp(true)}>sign up</Button>
        </RightBox>
      </Welcome>
    </Container>
  );
};

export default SignInUI;
