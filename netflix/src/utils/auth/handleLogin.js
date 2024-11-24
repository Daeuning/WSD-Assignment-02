import AuthService from "./authService";

const authService = new AuthService();

/**
 * 로그인 처리 함수
 * @param {string} email - 사용자 이메일
 * @param {string} password - 사용자 비밀번호
 * @returns {Promise<string>} - 성공 메시지
 */
export const handleLogin = async (email, password) => {
  try {
    const user = await authService.tryLogin(email, password); // 로그인 요청
    // Local Storage에 로그인 상태와 사용자 정보 저장
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("currentUser", user.id);
    return `환영합니다, ${user.id}님!`; // 성공 메시지 반환
  } catch (err) {
    throw new Error(err); // 발생한 에러 전달
  }
};
