// handleRegister.js
import AuthService from "./authService";

const authService = new AuthService();

/**
 * 회원가입 처리 함수
 * @param {string} email - 사용자 이메일
 * @param {string} password - 사용자 비밀번호
 * @param {string} confirmPassword - 비밀번호 확인
 * @param {function} setError - 에러 메시지 상태 업데이트 함수
 * @param {function} clearFields - 입력 필드 초기화 함수
 * @param {function} setIsSignUp - 회원가입/로그인 상태 전환 함수
 */
export const handleRegister = async (email, password, confirmPassword, setError, clearFields, setIsSignUp) => {
  if (password !== confirmPassword) {
    setError("Passwords do not match!"); // 비밀번호 불일치 에러
    return;
  }

  try {
    await authService.tryRegister(email, password); // authService의 회원가입 메서드 호출
    alert("회원가입 성공!");
    clearFields(); // 입력 필드 초기화
    setError(""); // 에러 메시지 초기화
    setIsSignUp(false); // 로그인 화면으로 전환
  } catch (err) {
    setError(err); // 에러 메시지 설정
  }
};
