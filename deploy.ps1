# Vercel 배포 스크립트
Write-Host "Vercel 배포를 시작합니다..." -ForegroundColor Green

# 빌드 확인
Write-Host "프로젝트 빌드 중..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "빌드 성공!" -ForegroundColor Green
    Write-Host ""
    Write-Host "이제 Vercel 대시보드에서 수동으로 배포해주세요:" -ForegroundColor Cyan
    Write-Host "1. https://vercel.com/marcjoo1209s-projects/docusign-clone 접속" -ForegroundColor White
    Write-Host "2. 상단의 'Deployments' 탭 클릭" -ForegroundColor White
    Write-Host "3. 'Create Deployment' 또는 'Redeploy' 버튼 클릭" -ForegroundColor White
    Write-Host "4. Branch: main 선택" -ForegroundColor White
    Write-Host "5. Deploy 클릭" -ForegroundColor White
} else {
    Write-Host "빌드 실패!" -ForegroundColor Red
}