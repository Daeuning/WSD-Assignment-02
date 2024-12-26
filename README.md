## 📽 [웹서비스설계 2차 과제] Netflix 스타일의 프론트엔드 데모 사이트
### 전북대학교 2024-2 웹서비스 설계 2차 과제입니다

<br>

## 📌 프로젝트 개요

이 프로젝트는 **React.js**를 활용해 개발된 단일 페이지 애플리케이션(SPA)으로, 다음과 같은 주요 기능을 포함합니다:
- [TMDB API](https://www.themoviedb.org/)를 활용한 동적 영화 데이터 불러오기.
- 사용자 인증(회원가입 및 로그인) 기능.
- 영화 목록에 대한 무한 스크롤 및 필터링 기능.
- 로컬 스토리지를 활용한 데이터 저장(찜한 영화 목록 등).
- 카카오 로그인

<br>

## ✨ 주요 기능
- **TMDB API**를 활용한 인기 영화 데이터 불러오기.
- **회원가입 및 로그인** 구현.
- **영화 무한 스크롤 및 필터링** 기능.
- **찜한 영화 목록 관리** (Local Storage 활용).
- **반응형 웹 디자인** 지원.

<br>

## 🛠️ 기술 스택

### 주요 기술
- **React.js**: 사용자 인터페이스를 효율적으로 구축하기 위한 프론트엔드 라이브러리.
- **Node.js**: React 환경 구성 및 패키지 관리.
- **Axios**: TMDB API 호출을 위한 HTTP 클라이언트.
- **React Router**: SPA 내 페이지 라우팅 처리.

### 보조 기술
- **CSS Transition/Animation**: 부드러운 화면 전환 및 사용자 인터랙션 효과.
- **Local Storage**: 사용자의 선호 데이터를 로컬에 저장하고 유지.
- **GitHub Pages**: 정적 웹사이트 배포.


<br>



## 📂 폴더 구조

```
WSD-Assignment-02/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── backend-feature-template.md          # 백엔드 기능 추가 템플릿
│   │   ├── chore-template.md                    # 유지보수 작업 템플릿
│   │   ├── design-template.md                   # 디자인 관련 템플릿
│   │   ├── document-template.md                 # 문서화 작업 템플릿
│   │   ├── fix-template.md                      # 버그 수정 템플릿
│   │   ├── frontend-feature-template.md         # 프론트엔드 기능 추가 템플릿
│   │   ├── refactor-template.md                 # 리팩토링 템플릿
│   ├── workflows/
│   │   └── deploy.yml                           # 배포 워크플로우
│   └── PULL_REQUEST_TEMPLATE.md                 # Pull Request 템플릿
│
├── netflix/
│   ├── build/                                   # 빌드 파일
│   ├── node_modules/                            # 프로젝트 의존성
│   ├── public/                                  # 정적 파일
│   │   ├── favicon.ico                          # 웹사이트 아이콘
│   │   ├── logo192.png                          # 로고 이미지 (192px)
│   │   ├── logo512.png                          # 로고 이미지 (512px)
│   │   ├── manifest.json                        # PWA 설정 파일
│   │   └── robots.txt                           # 검색 엔진 크롤러 설정
│
├── src/
│   ├── assets/
│   │   ├── fonts/
│   │   │   ├── NetflixSans-Bold.ttf             # Bold 폰트
│   │   │   ├── NetflixSans-Light.ttf            # Light 폰트
│   │   │   ├── NetflixSans-Medium.ttf           # Medium 폰트
│   │   │   └── NetflixSans-Regular.ttf          # Regular 폰트
│   │   ├── img/
│   │       ├── movie.jpg                        # 영화 이미지 샘플
│   │       └── TVRed.png                        # TV 관련 이미지
│   │
│   ├── component/
│   │   ├── MovieCard.jsx                        # 영화 카드 컴포넌트
│   │
│   ├── feature/
│   │   ├── GridList.jsx                         # 그리드 리스트 컴포넌트
│   │   ├── InfinityList.jsx                     # 무한 스크롤 리스트 컴포넌트
│   │   ├── movieListCarousel.jsx                # 영화 캐러셀 컴포넌트
│   │   ├── ShowVideo.jsx                        # 비디오 보여주는 컴포넌트
│   │   └── SignInUI.jsx                         # 로그인 UI
│   │
│   ├── layout/
│   │   ├── NavBar.jsx                           # 네비게이션 바
│   │   └── TopButton.jsx                        # 위로 가기 버튼
│   │
│   ├── pages/
│   │   ├── LogoutMain.jsx                       # 로그아웃 메인 페이지
│   │   ├── Main.jsx                             # 메인 페이지
│   │   ├── Popular.jsx                          # 인기 영화 페이지
│   │   ├── Search.jsx                           # 검색 페이지
│   │   └── SignIn.jsx                           # 로그인 페이지
│   │
│   ├── redux/
│   │   ├── authSlice.js                         # 인증 상태 Slice
│   │   ├── store.js                             # Redux 스토어 설정
│   │   └── wishlistSlice.js                     # 위시리스트 상태 Slice
│   │
│   ├── service/
│   │   ├── movieListService.js                  # 영화 리스트 API 서비스
│   │   └── videoListService.js                  # 비디오 리스트 API 서비스
│   │
│   ├── utils/
│   │   ├── auth/
│   │   │   ├── authGuard.js                     # 인증 가드 유틸리티
│   │   │   ├── authService.js                   # 인증 서비스
│   │   │   ├── handleLogin.js                   # 로그인 처리 함수
│   │   │   └── handleRegister.js                # 회원가입 처리 함수
│   │   ├── toast/
│   │       └── customToast.js                   # 커스텀 토스트 유틸리티
│   │
│   ├── App.js                                   # 앱의 시작점
│   ├── App.css                                  # 글로벌 스타일
│   ├── index.js                                 # 메인 진입점
│   └── index.css                                # 메인 스타일 시트
│
├── .gitignore                                   # Git 제외 파일 설정
├── package.json                                 # 프로젝트 설정 및 의존성 관리
├── package-lock.json                            # 의존성 잠금 파일
└── README.md                                    # 프로젝트 설명 파일
```

<br>

## ✨ 프로젝트 실행 방법

### 1. 프로젝트 클론
```
git clone https://github.com/Daeuning/WSD-Assignment-02.git
```

### 2. 디렉토리 이동
```
cd netflix
```

### 3. .env 파일 추가
```
// .env.development
REACT_APP_IP_ADDRESS=localhost
REACT_APP_PORT=3000
REACT_APP_TMDB_API_KEY= example
REACT_APP_KAKAO_REST_API_KEY= example
REACT_APP_KAKAO_REDIRECT_URI=http://localhost:3000/WSD-Assignment-02/kakao-login-success
```
```
// .env.production
REACT_APP_IP_ADDRESS=https://daeuning.github.io/WSD-Assignment-02
REACT_APP_PORT=443
REACT_APP_TMDB_API_KEY= example
REACT_APP_KAKAO_REST_API_KEY= example
REACT_APP_KAKAO_REDIRECT_URI=https://daeuning.github.io/WSD-Assignment-02/kakao-login-success
```

### 4. 의존성 설치
```
npm install
```

### 5. 개발 서버 실행
```
npm run start:dev
```

위 명령어를 실행하면 기본적으로 http://localhost:3000에서 개발 서버가 실행됩니다


<br>

## 🚀 배포 링크
- **GitHub Repository**: [GitHub Repository 주소](https://github.com/Daeuning/WSD-Assignment-02)
- **Live Demo**: [배포된 사이트 링크](https://daeuning.github.io/WSD-Assignment-02/)

