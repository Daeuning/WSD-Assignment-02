import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";

const requestToken = async (code) => {
  const response = await fetch("https://kauth.kakao.com/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      client_id: process.env.REACT_APP_KAKAO_REST_API_KEY,
      redirect_uri: process.env.REACT_APP_KAKAO_REDIRECT_URI,
      code: code,
    }),
  });


  if (!response.ok) {
    const errorData = await response.json();
    console.error("Token Request Error:", errorData);
    throw new Error(`Failed to fetch token: ${errorData.error_description}`);
  }

  const data = await response.json();
  localStorage.setItem("kakao_access_token", data.access_token);
  return data.access_token;
};

const getUserInfo = async (token) => {
  const response = await fetch("https://kapi.kakao.com/v2/user/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user info");
  }

  return await response.json();
};

const KakaoLoginSuccess = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null); // 에러 메시지 상태 추가
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchAccessTokenAndUserInfo = useCallback(async () => {
    // 로컬 스토리지 초기화
    localStorage.removeItem("kakao_access_token");
    
    if (isProcessing) return;
  
    setIsProcessing(true);
    setErrorMessage(null);
  
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
  
    if (!code) {
      console.error("Authorization code not found");
      setErrorMessage("카카오 인증 코드가 유효하지 않습니다. 다시 시도해주세요.");
      setIsProcessing(false);
      return;
    }
  
    try {
      const accessToken = await requestToken(code); // 새로운 토큰 요청
      const userInfo = await getUserInfo(accessToken); // 사용자 정보 요청
  
      setUserInfo(userInfo);
  
      // 사용자 정보 Redux 저장
      dispatch(login(userInfo.properties.nickname));
  
      // URL에서 인증 코드 제거
      window.history.replaceState(null, "", window.location.pathname);
  
      // 메인 페이지로 이동
      navigate("/");
    } catch (error) {
      console.error("Login process failed:", error);
  
      if (error.message.includes("Failed to fetch token")) {
        setErrorMessage("카카오 액세스 토큰 발급에 실패했습니다. 다시 시도해주세요.");
      } else if (error.message.includes("Failed to fetch user info")) {
        setErrorMessage("사용자 정보를 가져오는 데 실패했습니다. 네트워크를 확인해주세요.");
      } else {
        setErrorMessage("로그인 중 문제가 발생했습니다. 다시 시도해주세요.");
      }
  
      // 로컬 저장소 초기화
      localStorage.removeItem("kakao_access_token");
      navigate("/signin");
    } finally {
      setIsProcessing(false);
    }
  }, [isProcessing, dispatch, navigate]);
  
  useEffect(() => {
    // Query String에서 redirect 값을 확인하고 처리
    const params = new URLSearchParams(window.location.search);
    const redirectPath = params.get("redirect");
    if (redirectPath) {
      console.log("Redirecting to:", redirectPath);
      navigate(redirectPath);
    } else {
      fetchAccessTokenAndUserInfo();
    }
  }, [fetchAccessTokenAndUserInfo, navigate]);

  return (
    <div>
      {errorMessage ? (
        <div style={{ color: "red", margin: "10px 0" }}>
          <p>{errorMessage}</p> {/* 에러 메시지 출력 */}
        </div>
      ) : userInfo ? (
        <div>
          <h2>로그인 성공!</h2>
          <p>닉네임: {userInfo.properties.nickname}</p>
        </div>
      ) : (
        <p>카카오 로그인 진행 중...</p>
      )}
    </div>
  );
};

export default KakaoLoginSuccess;
