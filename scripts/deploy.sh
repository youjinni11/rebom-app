#!/bin/bash
# 리봄 — Vercel 공개 배포 스크립트
# 사용법: 터미널에서 아래 한 줄 복붙
#   cd "/Users/youjin/Desktop/리봄어플만들기" && bash scripts/deploy.sh

set -euo pipefail

cd "$(dirname "$0")/.."

# Vercel 팀 이름 (whoami 출력의 계정과 연결된 팀)
VERCEL_SCOPE="youjinni11s-projects"
VERCEL_PROJECT="rebom-libom"

echo "=========================================="
echo "  리봄 웹사이트 — Vercel 배포"
echo "=========================================="
echo ""

if [ ! -f ".env.local" ]; then
  echo "❌ .env.local 파일이 없습니다."
  echo "   README.md 1단계대로 먼저 만들어 주세요."
  exit 1
fi

echo "▶ 1/4 빌드 테스트 중..."
npm run build
echo "✅ 빌드 성공"
echo ""

echo "▶ 2/4 Vercel 로그인"
# macOS: Library/Application Support · Linux: .local/share
VERCEL_AUTH_MAC="$HOME/Library/Application Support/com.vercel.cli/auth.json"
VERCEL_AUTH_LINUX="$HOME/.local/share/com.vercel.cli/auth.json"
if [ -f "$VERCEL_AUTH_MAC" ]; then
  VERCEL_AUTH="$VERCEL_AUTH_MAC"
else
  VERCEL_AUTH="$VERCEL_AUTH_LINUX"
fi
if [ ! -f "$VERCEL_AUTH" ]; then
  echo ""
  echo "   ┌─────────────────────────────────────────────┐"
  echo "   │  지금 브라우저가 열립니다.                    │"
  echo "   │  Vercel 로그인 후 터미널로 돌아오세요.        │"
  echo "   │  (GitHub 또는 Google — 무료 가입)            │"
  echo "   └─────────────────────────────────────────────┘"
  echo ""
  npx vercel@latest login
  echo ""
fi

WHOAMI=$(npx vercel@latest whoami 2>&1) || {
  echo "❌ 로그인에 실패했습니다. 다시 실행해 주세요."
  echo "$WHOAMI"
  exit 1
}
echo "✅ 로그인됨: $WHOAMI"
echo ""

# 깨진 연결 파일이 있으면 삭제 (id 오류 방지)
if [ -f ".vercel/project.json" ] && ! grep -q '"projectId"' .vercel/project.json 2>/dev/null; then
  echo "   ⚠️  깨진 Vercel 연결 파일을 정리합니다..."
  rm -rf .vercel
fi

echo "▶ 3/4 환경 변수 업로드 (.env.local → Vercel)..."
while IFS= read -r line || [ -n "$line" ]; do
  [[ -z "$line" || "$line" =~ ^[[:space:]]*# ]] && continue
  key="${line%%=*}"
  value="${line#*=}"
  key=$(echo "$key" | xargs)
  [ -z "$key" ] && continue
  printf '%s' "$value" | npx vercel@latest env add "$key" production preview development --force --scope "$VERCEL_SCOPE" >/dev/null 2>&1 || true
  echo "   · $key"
done < .env.local
echo "✅ 환경 변수 업로드 완료"
echo ""

echo "▶ 4/4 배포 중... (1~3분 소요)"
DEPLOY_OUTPUT=$(npx vercel@latest deploy --prod --yes --scope "$VERCEL_SCOPE" 2>&1 | tee /dev/stderr)
DEPLOY_URL=$(echo "$DEPLOY_OUTPUT" | grep -Eo 'https://[a-zA-Z0-9._-]+\.vercel\.app' | grep -v 'vercel.com' | tail -1)

echo ""
echo "=========================================="
echo "  🎉 배포 완료!"
echo "=========================================="
echo ""
echo "  공개 주소: https://${VERCEL_PROJECT}.vercel.app"
if [ -n "$DEPLOY_URL" ] && [ "$DEPLOY_URL" != "https://${VERCEL_PROJECT}.vercel.app" ]; then
  echo "  (이번 배포: $DEPLOY_URL)"
fi
echo ""
echo "  유튜브 설명란에 위 주소를 넣으면 됩니다."
echo ""
echo "  📋 사전예약 저장 설정 (최초 1회):"
echo "     Supabase → SQL Editor → supabase/setup_pre_register.sql 실행"
echo ""
echo "  📊 접수 목록 보기:"
echo "     Supabase → Table Editor → pre_registrations"
echo ""
echo "  ⚠️  회원가입/로그인이 동작하려면 Supabase에서"
echo "     Site URL과 Redirect URL에 아래 주소를 추가하세요:"
echo "     https://${VERCEL_PROJECT}.vercel.app"
echo ""
