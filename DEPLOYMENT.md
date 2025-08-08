# DocuSign Clone 배포 정보

## Vercel 배포 상태

### GitHub 저장소
- Repository: https://github.com/marcjoo1209/docusign-clone

### Vercel 프로젝트
- 프로젝트명: docusign-clone-app
- 배포 URL 확인 방법:
  1. https://vercel.com 접속
  2. GitHub 계정(marcjoo1209@gmail.com)으로 로그인
  3. 프로젝트 대시보드에서 정확한 URL 확인

### 가능한 URL 패턴
- https://docusign-clone.vercel.app
- https://docusign-clone-[랜덤문자].vercel.app
- 커스텀 도메인: https://widsign.com (설정된 경우)

## 환경변수 설정 (Vercel Dashboard)

Vercel 대시보드에서 다음 환경변수를 설정해야 합니다:

```
NEXT_PUBLIC_SUPABASE_URL=https://mzgfjsxhapsdtkxpjvqj.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 로컬 테스트

```bash
npm install
npm run dev
```

http://localhost:3000 에서 테스트 가능

## 테스트 계정
- Email: test@example.com
- Password: test1234!

## 빌드 상태
- TypeScript 컴파일: ✅ 성공
- Next.js 빌드: ✅ 성공
- 배포: 진행중

## 문제 해결

Vercel 대시보드에서:
1. 프로젝트 설정 확인
2. 환경변수 설정 확인
3. 도메인 설정 확인
4. 빌드 로그 확인