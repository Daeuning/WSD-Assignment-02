import React, { useEffect, useState } from "react";
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
    throw new Error("Failed to fetch token");
  }

  const data = await response.json();
  // Access Token을 localStorage에 저장
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

  const data = await response.json();
  return data;
};

const KakaoLoginSuccess = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAccessTokenAndUserInfo = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      if (!code) {
        alert("카카오 로그인 실패");
        navigate("/");
        return;
      }

      try {
        // Access Token 요청
        const accessToken = await requestToken(code);

        // 사용자 정보 요청
        const userInfo = await getUserInfo(accessToken);
        console.log("User Info Response:", userInfo);

        setUserInfo(userInfo);
        dispatch(login(userInfo.properties.nickname)); // Redux 상태 업데이트

        // URL에서 code 제거
        const newParams = new URLSearchParams(window.location.search);
        newParams.delete("code");
        window.history.replaceState({}, "", `${window.location.pathname}?${newParams}`);
      } catch (error) {
        console.error("카카오 로그인 오류:", error);
        alert("카카오 로그인 중 오류가 발생했습니다.");
        navigate("/");
      }
    };

    fetchAccessTokenAndUserInfo();
  }, [navigate, dispatch]);

  return (
    <div>
      {userInfo ? (
        <div>
          <h2>로그인 성공!</h2>
          {userInfo.properties ? (
            <>
              <p>닉네임: {userInfo.properties.nickname}</p>
              <img src={userInfo.properties.profile_image} alt="프로필 이미지" />
            </>
          ) : (
            <p>사용자 정보가 없습니다.</p>
          )}
        </div>
      ) : (
        <p>카카오 로그인 진행 중...</p>
      )}
    </div>
  );
};

export default KakaoLoginSuccess;
