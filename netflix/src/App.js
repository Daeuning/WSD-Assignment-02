import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../src/redux/store.js";
import Main from "../src/pages/Main.jsx";
import SignIn from "../src/pages/SignIn.jsx";
import Popular from "../src/pages/Popular.jsx";
import Search from "../src/pages/Search.jsx";
import WishList from "../src/pages/WishList.jsx";
import NavBar from "../src/layout/NavBar.jsx";
import { CustomToastContainer } from "../src/utils/toast/customToast.js"; // 커스텀 ToastContainer
import AuthGuard from "./utils/auth/authGuard.js";
import KakaoLoginSuccess from "../src/pages/KakaoLoginSuccess";
import "./App.css";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    // URL의 쿼리스트링에서 redirect 값을 확인
    const params = new URLSearchParams(window.location.search);
    const redirectPath = params.get("redirect");

    if (redirectPath) {
      // redirect 값이 존재하면 해당 경로로 이동
      navigate(redirectPath);
      // URL에서 redirect 파라미터 제거
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, [navigate]);
  return (
    <>
      <Provider store={store}>
        <NavBar />
        <Routes>
          {/* 메인 페이지 (AuthGuard 제외) */}
          <Route path="/" element={<Main />} />
          
          {/* 로그인/회원가입 */}
          <Route path="/signin" element={<SignIn />} />

          {/* 보호된 페이지 */}
          <Route
            path="/popular"
            element={
              <AuthGuard>
                <Popular />
              </AuthGuard>
            }
          />
          <Route
            path="/search"
            element={
              <AuthGuard>
                <Search />
              </AuthGuard>
            }
          />
          <Route
            path="/wishlist"
            element={
              <AuthGuard>
                <WishList />
              </AuthGuard>
            }
          />
          <Route path="/kakao-login-success" element={<KakaoLoginSuccess />} />
        </Routes>
        <CustomToastContainer /> {/* 커스텀 ToastContainer 추가 */}
      </Provider>
    </>
  );
}

export default App;