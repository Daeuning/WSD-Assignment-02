import AuthService from "./authService";

const authService = new AuthService();

/**
 * 회원가입 처리 함수
 * @param {string} email - 사용자 이메일
 * @param {string} password - 사용자 비밀번호
 * @param {string} confirmPassword - 비밀번호 확인
 */
export const handleRegister = async (email, password, confirmPassword) => {
  if (password !== confirmPassword) {
    throw new Error("Passwords do not match!"); // 비밀번호 불일치 에러
  }

  try {
    await authService.tryRegister(email, password); // 회원가입 요청
    return "회원가입 성공!";
  } catch (err) {
    throw new Error(err); // 발생한 에러 전달
  }
};
