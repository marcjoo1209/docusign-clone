# DocuSign Clone - 문서서명 플랫폼

전자문서 서명 및 관리를 위한 웹 애플리케이션입니다.

## 🚀 주요 기능

- 📝 문서 업로드 및 서명 필드 추가
- ✍️ 전자서명 수집 및 관리
- 📊 실시간 문서 상태 추적
- 🔐 SNS 로그인 (Google, Naver, Kakao, Instagram)
- 📱 반응형 디자인

## 🛠 기술 스택

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Supabase Auth, OAuth 2.0
- **Deployment**: Vercel

## 📋 필수 사항

- Node.js 18.0 이상
- npm 또는 yarn
- Vercel 계정 (배포용)
- Supabase 계정 (인증용)

## 🔧 설치 및 실행

### 1. 프로젝트 클론

```bash
git clone https://github.com/marcjoo1209/docusign-clone.git
cd docusign-clone
```

### 2. 패키지 설치

```bash
npm install
```

### 3. 환경변수 설정

`.env.local` 파일을 생성하고 다음 내용을 추가합니다:

```env
# Supabase 설정
NEXT_PUBLIC_SUPABASE_URL=https://mzgfjsxhapsdtkxpjvqj.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# 앱 URL (OAuth 리다이렉트용)
NEXT_PUBLIC_APP_URL=http://localhost:3000  # 개발용
# NEXT_PUBLIC_APP_URL=https://docusign-clone.vercel.app  # 프로덕션용

# Naver OAuth (선택사항)
NAVER_CLIENT_ID=your_naver_client_id
NAVER_CLIENT_SECRET=your_naver_client_secret

# Kakao OAuth (선택사항)
KAKAO_CLIENT_ID=your_kakao_client_id
KAKAO_CLIENT_SECRET=your_kakao_client_secret
```

### 4. 개발 서버 실행

```bash
npm run dev
```

http://localhost:3000 에서 확인할 수 있습니다.

## 🔐 OAuth 설정 방법

### Google 로그인 설정

#### 1단계: Google Cloud Console 설정

1. [Google Cloud Console](https://console.cloud.google.com/) 접속
2. 새 프로젝트 생성 (또는 기존 프로젝트 선택)
3. 좌측 메뉴에서 **"API 및 서비스"** → **"사용자 인증 정보"** 클릭
4. **"+ 사용자 인증 정보 만들기"** → **"OAuth 클라이언트 ID"** 선택
5. 애플리케이션 유형: **"웹 애플리케이션"** 선택
6. 이름 입력 (예: "DocuSign Clone")
7. **승인된 JavaScript 원본** 추가:
   - `http://localhost:3000` (개발용)
   - `https://docusign-clone.vercel.app` (프로덕션용)
8. **승인된 리디렉션 URI** 추가:
   - `https://mzgfjsxhapsdtkxpjvqj.supabase.co/auth/v1/callback`
9. **"만들기"** 클릭 → Client ID와 Client Secret 복사

#### 2단계: Supabase 설정

1. [Supabase Dashboard](https://supabase.com/dashboard) 접속
2. 프로젝트 선택
3. 좌측 메뉴에서 **Authentication** → **Providers** 클릭
4. **Google** 찾아서 클릭
5. **Enable Google** 토글 활성화
6. **Client ID**: Google Cloud Console에서 복사한 값 입력
7. **Client Secret**: Google Cloud Console에서 복사한 값 입력
8. **Save** 클릭

### Naver 로그인 설정

#### 1단계: Naver Developers 설정

1. [Naver Developers](https://developers.naver.com/main/) 접속
2. 상단 메뉴에서 **"Application"** → **"애플리케이션 등록"** 클릭
3. 애플리케이션 이름 입력 (예: "DocuSign Clone")
4. **사용 API**: **"네이버 로그인"** 선택
5. **제공 정보 선택**:
   - ✅ 이메일
   - ✅ 별명
   - ✅ 프로필 사진
6. **서비스 환경**: **"PC 웹"** 선택
7. **서비스 URL**: 
   - 개발: `http://localhost:3000`
   - 운영: `https://docusign-clone.vercel.app`
8. **Callback URL**:
   - 개발: `http://localhost:3000/api/auth/naver/callback`
   - 운영: `https://docusign-clone.vercel.app/api/auth/naver/callback`
9. **"등록하기"** 클릭
10. **Client ID**와 **Client Secret** 복사

#### 2단계: 환경변수 설정

`.env.local` 파일에 추가:
```env
NAVER_CLIENT_ID=발급받은_클라이언트_ID
NAVER_CLIENT_SECRET=발급받은_클라이언트_시크릿
```

### Kakao 로그인 설정

#### 1단계: Kakao Developers 설정

1. [Kakao Developers](https://developers.kakao.com/) 접속
2. 우측 상단 **"내 애플리케이션"** 클릭
3. **"애플리케이션 추가하기"** 클릭
4. 앱 이름과 사업자명 입력 → **"저장"**
5. 생성된 앱 클릭하여 상세 페이지 진입

#### 2단계: 플랫폼 설정

1. 좌측 메뉴에서 **"앱 설정"** → **"플랫폼"** 클릭
2. **"Web 플랫폼 등록"** 클릭
3. **사이트 도메인** 입력:
   - `http://localhost:3000` (개발용)
   - `https://docusign-clone.vercel.app` (프로덕션용)
4. **"저장"** 클릭

#### 3단계: 카카오 로그인 설정

1. 좌측 메뉴에서 **"제품 설정"** → **"카카오 로그인"** 클릭
2. **"활성화 설정"** 상태를 **ON**으로 변경
3. **"Redirect URI 등록"** 클릭
4. Redirect URI 입력:
   - `http://localhost:3000/api/auth/kakao/callback` (개발용)
   - `https://docusign-clone.vercel.app/api/auth/kakao/callback` (프로덕션용)
5. **"저장"** 클릭

#### 4단계: 동의 항목 설정

1. **"카카오 로그인"** → **"동의 항목"** 클릭
2. 다음 항목 설정:
   - 프로필 정보(닉네임/프로필 사진): **필수 동의**
   - 카카오계정(이메일): **선택 동의**

#### 5단계: 환경변수 설정

1. **"앱 설정"** → **"앱 키"**에서 **REST API 키** 복사
2. `.env.local` 파일에 추가:
```env
KAKAO_CLIENT_ID=발급받은_REST_API_키
KAKAO_CLIENT_SECRET=발급받은_시크릿_키  # 선택사항
```

### Instagram 로그인 설정

Instagram은 Facebook OAuth를 통해 구현됩니다.

#### 1단계: Facebook Developers 설정

1. [Facebook Developers](https://developers.facebook.com/) 접속
2. **"My Apps"** → **"Create App"** 클릭
3. **앱 유형**: **"소비자"** 선택
4. 앱 이름과 이메일 입력 → **"앱 만들기"**

#### 2단계: Facebook Login 설정

1. 대시보드에서 **"제품 추가"** → **"Facebook Login"** 설정
2. **"웹"** 플랫폼 선택
3. **사이트 URL**: `https://docusign-clone.vercel.app` 입력
4. **설정** → **기본 설정**에서:
   - **유효한 OAuth 리디렉션 URI**:
     - `https://mzgfjsxhapsdtkxpjvqj.supabase.co/auth/v1/callback`

#### 3단계: Supabase 설정

1. Supabase Dashboard → **Authentication** → **Providers**
2. **Facebook** 활성화
3. Facebook App ID와 App Secret 입력

## 🚀 Vercel 배포

### 1. Vercel에 배포

```bash
npx vercel
```

또는 GitHub 연동을 통한 자동 배포:

1. [Vercel](https://vercel.com) 접속
2. **"Import Project"** 클릭
3. GitHub 저장소 선택
4. 환경변수 설정 (아래 참조)
5. **"Deploy"** 클릭

### 2. Vercel 환경변수 설정

Vercel Dashboard → Project → Settings → Environment Variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
NAVER_CLIENT_ID=your_naver_client_id
NAVER_CLIENT_SECRET=your_naver_client_secret
KAKAO_CLIENT_ID=your_kakao_client_id
KAKAO_CLIENT_SECRET=your_kakao_client_secret
```

## 📱 테스트 계정

OAuth 설정 없이 테스트하려면:

- **이메일**: test@example.com
- **비밀번호**: test1234!

## 🐛 문제 해결

### OAuth 로그인이 안 되는 경우

1. **redirect_uri_mismatch 오류**
   - OAuth 제공자에 등록한 리다이렉트 URI와 정확히 일치하는지 확인
   - http/https, 도메인, 포트, 경로 모두 확인

2. **invalid_client 오류**
   - Client ID/Secret이 올바른지 확인
   - 환경변수가 제대로 설정되었는지 확인
   - Vercel에서는 배포 후 환경변수 변경 시 재배포 필요

3. **Naver/Kakao 로그인 실패**
   - 개발자 콘솔에서 앱이 활성화 상태인지 확인
   - 서비스 URL과 Callback URL이 정확한지 확인

### 로컬 개발 시 HTTPS 필요한 경우

```bash
# mkcert 설치 (최초 1회)
npm install -g mkcert
mkcert -install

# 인증서 생성
mkcert localhost

# HTTPS로 개발 서버 실행
npm run dev:https
```

## 📞 지원

문제가 있거나 도움이 필요하면:

- GitHub Issues: [https://github.com/marcjoo1209/docusign-clone/issues](https://github.com/marcjoo1209/docusign-clone/issues)
- Email: marcjoo1209@gmail.com

## 📄 라이선스

MIT License

---

Made with ❤️ by [marcjoo1209](https://github.com/marcjoo1209)