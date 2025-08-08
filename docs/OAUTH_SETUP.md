# OAuth 설정 가이드

이 문서는 SNS 로그인 기능을 위한 OAuth 설정 방법을 안내합니다.

## 1. Google OAuth 설정

### 1.1 Google Cloud Console 설정
1. [Google Cloud Console](https://console.cloud.google.com/) 접속
2. 새 프로젝트 생성 또는 기존 프로젝트 선택
3. "API 및 서비스" > "사용자 인증 정보" 이동
4. "사용자 인증 정보 만들기" > "OAuth 클라이언트 ID" 선택
5. 애플리케이션 유형: "웹 애플리케이션" 선택
6. 승인된 리디렉션 URI 추가:
   - `https://mzgfjsxhapsdtkxpjvqj.supabase.co/auth/v1/callback`
   - `http://localhost:3000/auth/callback` (개발용)

### 1.2 Supabase 설정
1. [Supabase Dashboard](https://supabase.com/dashboard) 접속
2. 프로젝트 선택 > Authentication > Providers > Google
3. Google Client ID와 Client Secret 입력
4. Enable Google 활성화

## 2. Naver OAuth 설정

### 2.1 Naver Developers 설정
1. [Naver Developers](https://developers.naver.com/main/) 접속
2. Application > 애플리케이션 등록
3. 사용 API: "네이버 로그인" 선택
4. 제공 정보 선택:
   - 필수: 이메일, 별명, 프로필 사진
5. 서비스 URL: `https://docusign-clone.vercel.app`
6. Callback URL 등록:
   - `https://docusign-clone.vercel.app/api/auth/naver/callback`
   - `http://localhost:3000/api/auth/naver/callback` (개발용)

### 2.2 환경변수 설정
```env
NAVER_CLIENT_ID=발급받은_클라이언트_ID
NAVER_CLIENT_SECRET=발급받은_클라이언트_시크릿
```

## 3. Kakao OAuth 설정

### 3.1 Kakao Developers 설정
1. [Kakao Developers](https://developers.kakao.com/) 접속
2. 내 애플리케이션 > 애플리케이션 추가하기
3. 앱 설정 > 플랫폼 > Web 플랫폼 등록
   - 사이트 도메인: `https://docusign-clone.vercel.app`
4. 제품 설정 > 카카오 로그인 활성화
5. 카카오 로그인 > Redirect URI 등록:
   - `https://docusign-clone.vercel.app/api/auth/kakao/callback`
   - `http://localhost:3000/api/auth/kakao/callback` (개발용)
6. 동의 항목 설정:
   - 프로필 정보(닉네임/프로필 사진)
   - 카카오계정(이메일)

### 3.2 환경변수 설정
```env
KAKAO_CLIENT_ID=발급받은_REST_API_키
KAKAO_CLIENT_SECRET=발급받은_시크릿_키
```

## 4. Facebook/Instagram OAuth 설정

### 4.1 Facebook Developers 설정
1. [Facebook Developers](https://developers.facebook.com/) 접속
2. My Apps > Create App
3. 앱 유형: "소비자" 선택
4. 제품 추가:
   - Facebook Login 추가
   - Instagram Basic Display 추가 (Instagram 로그인용)
5. Facebook Login 설정:
   - 유효한 OAuth 리디렉션 URI:
     - `https://mzgfjsxhapsdtkxpjvqj.supabase.co/auth/v1/callback`
     - `http://localhost:3000/auth/callback` (개발용)

### 4.2 Instagram Basic Display 설정
1. Instagram Basic Display > Basic Display 설정
2. 유효한 OAuth 리디렉션 URI 추가
3. 앱 검토 > 권한 요청:
   - instagram_basic
   - instagram_content_publish (선택)

### 4.3 Supabase 설정
1. Supabase Dashboard > Authentication > Providers > Facebook
2. Facebook App ID와 App Secret 입력
3. Enable Facebook 활성화

## 5. Vercel 환경변수 설정

1. [Vercel Dashboard](https://vercel.com/) 접속
2. 프로젝트 선택 > Settings > Environment Variables
3. 다음 환경변수 추가:
   ```
   NEXT_PUBLIC_SUPABASE_URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY
   NEXT_PUBLIC_APP_URL
   NAVER_CLIENT_ID
   NAVER_CLIENT_SECRET
   KAKAO_CLIENT_ID
   KAKAO_CLIENT_SECRET
   ```

## 6. 로컬 개발 환경 설정

1. `.env.local` 파일 생성 (`.env.local.example` 참고)
2. 각 OAuth 제공자의 클라이언트 ID/Secret 입력
3. 개발 서버 재시작: `npm run dev`

## 7. 테스트

1. 각 SNS 버튼 클릭하여 로그인 테스트
2. 최초 로그인 시 권한 동의 화면 확인
3. 로그인 성공 후 대시보드 리다이렉트 확인

## 주의사항

- **보안**: 클라이언트 시크릿은 절대 클라이언트 코드에 노출되면 안 됩니다
- **HTTPS**: OAuth는 프로덕션 환경에서 반드시 HTTPS를 사용해야 합니다
- **리다이렉트 URI**: 각 제공자에 등록한 URI와 정확히 일치해야 합니다
- **도메인 변경**: 도메인 변경 시 모든 OAuth 제공자의 설정을 업데이트해야 합니다

## 문제 해결

### "redirect_uri_mismatch" 오류
- OAuth 제공자에 등록된 리다이렉트 URI 확인
- 프로토콜(http/https), 도메인, 경로가 정확히 일치하는지 확인

### "invalid_client" 오류
- 클라이언트 ID/Secret이 올바른지 확인
- 환경변수가 제대로 설정되었는지 확인

### 로그인 후 리다이렉트 실패
- `/auth/callback` 페이지가 제대로 구현되었는지 확인
- Supabase 설정에서 Site URL이 올바른지 확인