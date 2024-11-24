import React, { useState } from "react";
import styled from "styled-components";
import { showToast } from "../utils/toast/customToast.js"; // Toast 메시지 유틸리티 함수
import { handleRegister } from "../utils/auth/handleRegister"; // 회원가입 처리 함수
import MovieImage from "../assets/img/movie.jpg"; // 이미지 경로

const Container = styled.div`
  margin: auto;
  width: 650px;
  height: 550px;
  position: relative;
`;

const Welcome = styled.div`
  position: absolute;
  top: 25%;
  width: 650px;
  height: 415px;
  border-radius: 5px;

  /* 배경 이미지 */
  background-image: 
    linear-gradient(
      rgba(0, 0, 0, 0.7), /* 어두운 레이어 */
      rgba(0, 0, 0, 0.7)
    ), 
    url(${MovieImage}); /* 이미지 경로 */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  /* 배경 블러 효과 */
  backdrop-filter: blur(10px);
`;

const FormBox = styled.div`
  position: absolute;
  top: -10%;
  left: ${({ isSignUp }) => (isSignUp ? '45%' : '5%')};
  background: var(--white-04dp);
  backdrop-filter: blur(15px) brightness(0.8);
  border: 1px solid var(--white-01dp);
  width: 320px;
  height: 500px;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
  transition: all 0.5s ease-in-out;
  z-index: 2;
`;

const FormContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: ${({ isHidden }) => (isHidden ? 0 : 1)};
  visibility: ${({ isHidden }) => (isHidden ? 'hidden' : 'visible')};
  transition: opacity 0.5s ease, visibility 0.5s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90%;
  }
`;

const LeftBox = styled.div`
  position: absolute;
  width: 50%;
  left: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  transition: opacity 0.5s ease, visibility 0.5s ease;
  opacity: ${({ isSignUp }) => (isSignUp ? 1 : 0)};
  visibility: ${({ isSignUp }) => (isSignUp ? 'visible' : 'hidden')};
`;

const RightBox = styled(LeftBox)`
  left: auto;
  right: 0;
  opacity: ${({ isSignUp }) => (isSignUp ? 0 : 1)};
  visibility: ${({ isSignUp }) => (isSignUp ? 'hidden' : 'visible')};
`;

const Title = styled.h2`
  color: var(--primary-color);
  font-size: 1.8em;
  font-weight: 500;
  line-height: 1.1em;
  letter-spacing: 3px;
  text-align: center;
  margin-top: 20%;
`;

const FormTitle = styled.h2`
  color: var(--basic-font);
  font-size: 1.8em;
  font-weight: 500;
  line-height: 1.1em;
  letter-spacing: 3px;
  text-align: center;
  margin-top: 20%;
`;

const Desc = styled.p`
  font-size: 14px;
  letter-spacing: 2px;
  color: var(--basic-font);

  span {
    color: #eac7cc;
  }
`;

const Button = styled.button`
  margin-top: 35%;
  margin-bottom: 30px;
  background: var(--primary-color);
  color: var(--basic-font);
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9em;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 1px;
  transition: all 0.3s ease;

  &:hover {
    background: darken(var(--primary-color), 10%);
    transform: scale(1.05);
  }

  &:active {
    background: darken(var(--primary-color), 20%);
    transform: scale(0.98);
  }
`;

const Input = styled.input`
  display: block;
  width: 90%;
  margin: 5px auto;
  padding: 10px;
  color: var(--basic-font);
  background-color: var(--white-03dp);
  border: 1px solid var(--white-02dp);
  border-radius: 5px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  margin-top: 10px;
  color: var(--basic-font);

  label {
    margin-left: 5px;
    font-size: 0.8em;
  }
`;

const SignInUI = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const clearFields = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const message = await handleRegister(email, password, confirmPassword);
      showToast("success", message); // 성공 메시지
      clearFields();
      setIsSignUp(false); // 로그인 화면으로 전환
    } catch (err) {
      showToast("error", err.message); // 에러 메시지
    }
  };

  return (
    <Container>
      <Welcome>
        <FormBox isSignUp={isSignUp}>
          <FormContainer isHidden={!isSignUp}>
            <FormTitle>register</FormTitle>
            <form autoComplete="off" onSubmit={handleRegisterSubmit}>
              <Input
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Input
                type="password"
                placeholder="confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button type="submit">create account</Button>
            </form>
          </FormContainer>
          <FormContainer isHidden={isSignUp}>
            <FormTitle>sign in</FormTitle>
            <form autoComplete="off">
              <Input type="text" placeholder="email" />
              <Input type="password" placeholder="password" />
              <CheckboxContainer>
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">remember me</label>
              </CheckboxContainer>
              <Button type="submit">login</Button>
            </form>
          </FormContainer>
        </FormBox>
        <LeftBox isSignUp={isSignUp}>
          <Title>Webflix</Title>
          <Desc>
            시청할 준비가 되셨나요?
            <br />
            다른 곳에선 만날 수 없는 시리즈, 영화,
            <br />
            스페셜을 즐겨보세요
          </Desc>
          <Button onClick={() => setIsSignUp(false)}>login</Button>
        </LeftBox>
        <RightBox isSignUp={isSignUp}>
          <Title>Webflix</Title>
          <Desc>계정이 없으신가요?</Desc>
          <Button onClick={() => setIsSignUp(true)}>sign up</Button>
        </RightBox>
      </Welcome>
    </Container>
  );
};

export default SignInUI;
