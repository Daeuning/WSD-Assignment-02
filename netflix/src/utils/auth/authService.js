// authService.js
export default class AuthService {
  /**
   * 로그인 시도
   * @param {string} email - 사용자 이메일
   * @param {string} password - 사용자 비밀번호
   * @param {boolean} saveToken - TMDB API 키를 저장할지 여부
   * @returns {Promise<any>} - 로그인 성공 또는 실패 결과
   */
  tryLogin(email, password, saveToken = true) {
    return new Promise((resolve, reject) => {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find((user) => user.id === email && user.password === password);

      if (user) {
        resolve(user); // 로그인 성공
      } else {
        reject('로그인에 실패하였습니다'); // 로그인 실패
      }
    });
  }

  /**
   * 회원가입 시도
   * @param {string} email - 사용자 이메일
   * @param {string} password - 사용자 비밀번호
   * @returns {Promise<any>} - 회원가입 성공 또는 실패 결과
   */
  tryRegister(email, password) {
    return new Promise((resolve, reject) => {
      try {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userExists = users.some((existingUser) => existingUser.id === email);

        if (userExists) {
          throw new Error('User already exists');
        }

        const newUser = { id: email, password: password };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        resolve(); // 회원가입 성공
      } catch (err) {
        reject(err.message); // 회원가입 실패
      }
    });
  }
}
