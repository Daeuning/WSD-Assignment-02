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
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchAccessTokenAndUserInfo = useCallback(async () => {
    if (isProcessing || localStorage.getItem("kakao_access_token")) return;

    setIsProcessing(true);

    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (!code) {
      console.error("Authorization code not found");
      return;
    }

    try {
      const accessToken = await requestToken(code);
      const userInfo = await getUserInfo(accessToken);

      setUserInfo(userInfo);
      dispatch(login(userInfo.properties.nickname));

      // URL에서 인증 코드 제거
      window.history.replaceState(null, "", window.location.pathname);
      navigate("/");
    } catch (error) {
      console.error("Login process failed:", error);
      localStorage.removeItem("kakao_access_token");
      navigate("/");
    } finally {
      setIsProcessing(false);
    }
  }, [isProcessing, dispatch, navigate]);

  useEffect(() => {
    fetchAccessTokenAndUserInfo();
  }, [fetchAccessTokenAndUserInfo]);

  return (
    <div>
      {userInfo ? (
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
