# Vercel 수동 배포 가이드

## 방법 1: Vercel Import 사용 (권장)
1. https://vercel.com/import 접속
2. "Import Git Repository" 섹션에 다음 URL 입력:
   ```
   https://github.com/marcjoo1209/docusign-clone
   ```
3. "Import" 클릭
4. 프로젝트 이름: docusign-clone (또는 원하는 이름)
5. Framework Preset: Next.js (자동 감지됨)
6. Environment Variables 추가:
   - `NEXT_PUBLIC_SUPABASE_URL`: https://mzgfjsxhapsdtkxpjvqj.supabase.co
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16Z2Zqc3hoYXBzZHRreHBqdnFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0NTU2NDksImV4cCI6MjA3MDAzMTY0OX0.qzWo3fpjeWsApTKQxEOPfjHKkP4vssdbIvNWwCk3fgg
7. "Deploy" 클릭

## 방법 2: Vercel Dashboard에서
1. https://vercel.com/dashboard 접속
2. "Add New..." → "Project" 클릭
3. "Import Git Repository" 선택
4. GitHub 계정 연결 (이미 연결되어 있다면 생략)
5. "marcjoo1209/docusign-clone" 저장소 선택
6. 위의 환경변수 설정
7. Deploy 클릭

## 방법 3: 기존 프로젝트 재연결
1. https://vercel.com/marcjoo1209s-projects 접속
2. 프로젝트 목록에서 "docusign-clone" 찾기
3. 프로젝트 설정(Settings) 클릭
4. "Git" 섹션 찾기 (왼쪽 메뉴)
5. Repository 재연결

## 빌드 상태
- ✅ TypeScript 오류: 해결됨
- ✅ 로컬 빌드: 성공
- ✅ 모든 의존성: 설치됨
- ✅ 환경변수: 준비됨

## 테스트 계정
- Email: test@example.com
- Password: test1234!