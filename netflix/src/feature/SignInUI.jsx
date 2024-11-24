import React, { useState } from "react";
import styled from "styled-components";
import { handleRegister } from "../utils/auth/handleRegister.js"; // handleRegister 함수 가져오기
import MovieImage from "../assets/img/movie.jpg"; // 이미지 경로 수정

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
      rgba(0, 0, 0, 0.7), /* 더 어두운 레이어 */
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
  background: var(--white-04dp); /* 반투명 배경 */
  backdrop-filter: blur(15px) brightness(0.8); /* 유리 효과 */
  border: 1px solid var(--white-01dp); /* 가벼운 테두리 */
  width: 320px;
  height: 500px;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4); /* 어두운 그림자 */
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
  align-items: center; /* Center-align the form container */
  justify-content: center;
  color: var(--basic-font);

  form {
    display: flex;
    flex-direction: column;
    align-items: center; /* Center-align form contents */
    width: 90%; /* Ensure proper spacing for form elements */
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
  margin: 5px auto; /* Reduced from 10px to 5px */
  padding: 10px;
  color: var(--basic-font);
  background-color: var(--white-03dp);
  border: 1px solid var(--white-02dp);
  border-radius: 5px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start; /* Left-align the checkbox and label */
  width: 100%; /* Take full width to ensure alignment */
  margin-top: 10px;

  label {
    margin-left: 5px;
    font-size: 0.8em;
  }
`;

const SignInUI = () => {
  const [isSignUp, setIsSignUp] = useState(false); // 회원가입/로그인 상태 전환
  const [email, setEmail] = useState(""); // 이메일 상태
  const [password, setPassword] = useState(""); // 비밀번호 상태
  const [confirmPassword, setConfirmPassword] = useState(""); // 비밀번호 확인 상태
  const [error, setError] = useState(""); // 에러 메시지 상태

  // 입력 필드 초기화 함수
  const clearFields = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <Container>
      <Welcome>
        <FormBox isSignUp={isSignUp}>
          {/* 회원가입 폼 */}
          <FormContainer isHidden={!isSignUp}>
            <FormTitle>register</FormTitle>
            <form
              autoComplete="off"
              onSubmit={(e) => {
                e.preventDefault(); // 기본 폼 제출 동작 방지
                handleRegister(
                  email,
                  password,
                  confirmPassword,
                  setError,
                  clearFields,
                  setIsSignUp // 회원가입 성공 시 로그인 화면으로 전환
                );
              }}
            >
              <Input
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // 이메일 상태 업데이트
              />
              <Input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // 비밀번호 상태 업데이트
              />
              <Input
                type="password"
                placeholder="confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)} // 비밀번호 확인 상태 업데이트
              />
              {error && <p style={{ color: "red" }}>{error}</p>} {/* 에러 메시지 표시 */}
              <Button type="submit">create account</Button>
            </form>
          </FormContainer>

          {/* 로그인 폼 */}
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

        {/* 전환 버튼 */}
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