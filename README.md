# 리봄 — 5060 프리미엄 매칭 MVP

미혼 인증(Codef 샌드박스) 기반 5060 세대를 위한 매칭 서비스입니다.

## 주요 기능

- **회원가입/로그인** — Supabase Auth (이메일·비밀번호)
- **미혼 인증** — Codef 샌드박스 가족관계등록부 API (MOCK 폴백 지원)
- **프로필 등록** — 사진 업로드, 지역, 자기소개
- **오늘의 추천** — 같은 지역 미인증 완료 회원 1명/일
- **맞관심 매칭** — 관심 표시 후 상호 관심 시 매칭 생성
- **만남 일정** — 제안/수락/확정, 확정 시 연락처 공개

## 기술 스택

- Next.js 15 (App Router) + TypeScript + Tailwind CSS
- Supabase (Auth, Postgres, Storage, RLS)
- easycodef-node (SERVICE_TYPE_SANDBOX)

---

## 1. 환경 변수 설정

`.env.local.example`을 복사해 `.env.local`을 만듭니다.

```bash
cp .env.local.example .env.local
```

```env
# Supabase (필수)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Codef 샌드박스 (선택 — 없으면 MOCK 사용)
CODEF_CLIENT_ID=
CODEF_CLIENT_SECRET=
CODEF_PUBLIC_KEY=

# 개발 데모: Codef 키 없을 때 미혼 검증 자동 통과
MOCK_VERIFICATION=true
```

### Supabase 키 발급

1. [supabase.com](https://supabase.com)에서 프로젝트 생성
2. **Settings → API**에서 URL, `anon` key, `service_role` key 복사
3. **Authentication → Sign In / Providers → Email** 에서:
   - Email **활성화(ON)**
   - **Confirm email(이메일 확인) 비활성화(OFF)** ← MVP 필수 (끄지 않으면 가입마다 메일 발송 → `email rate limit exceeded` 오류)
   - 저장(Save)

### Codef 키 발급 (선택)

1. [codef.io](https://codef.io) 가입 → **샌드박스** 신청
2. 키관리에서 `CLIENT_ID`, `CLIENT_SECRET`, RSA **공개키** 복사
3. `MOCK_VERIFICATION=false`로 변경 후 실제 API 사용

---

## 2. Supabase DB 마이그레이션

Supabase 대시보드 **SQL Editor**에서 순서대로 실행합니다.

1. `supabase/migrations/001_initial.sql` — 테이블, RLS, Storage 버킷
2. `supabase/migrations/003_pre_registrations.sql` — 사전예약 신청 테이블
   - 이미 003을 실행했다면 `004_age_range_granular.sql`도 실행
3. `supabase/migrations/002_seed.sql` — 시드 함수 정의 후 아래 실행:

```sql
SELECT seed_dummy_profiles();
```

> 시드 함수는 테스트용 더미 계정 10명(전원 **서울 강남** 지역)을 생성합니다.  
> 비밀번호: `seedpassword123` / 이메일: `김미영@seed.libom.test` 형식

---

## 3. 로컬 실행

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

### 테스트 플로우

1. **회원가입** (`/signup`) — 이메일·비밀번호
2. **미혼 인증** (`/signup/verify`) — 실명·생년월일 6자리 → MOCK 모드면 자동 통과
3. **프로필 등록** (`/profile`) — 닉네임·지역(**서울 강남** 선택) 등
4. **오늘의 추천** (`/home`) — 시드 더미 1명 노출
5. **관심 표시** → 다른 계정으로 맞관심 시 **매칭** 탭 확인
6. **만남 제안** → 상대 **수락** → **일정** 탭에서 연락처 확인

---

## 4. Vercel 배포 (유튜브용 공개 웹사이트)

`localhost`는 본인 컴퓨터에서만 보입니다. **인터넷에 공개**하려면 Vercel에 배포합니다.

### 한 번에 배포하기 (추천)

터미널에 아래를 **복붙**하고 Enter:

```bash
cd "/Users/youjin/Desktop/리봄어플만들기" && bash scripts/deploy.sh
```

1. 처음이면 브라우저가 열리고 **Vercel 로그인** (GitHub/Google 무료 가입)
2. 끝나면 `https://리봄-xxx.vercel.app` 같은 **공개 주소**가 나옵니다
3. 그 주소를 유튜브 설명란·영상에 넣으면 됩니다

### 사전예약 저장 설정 (필수)

배포만 하면 입력 데이터가 저장되지 않습니다. **Supabase에 테이블**이 있어야 합니다.

1. [supabase.com](https://supabase.com) → 프로젝트 → **SQL Editor**
2. `supabase/setup_pre_register.sql` 파일 내용 **전체 복붙** → **Run**
3. **Table Editor → pre_registrations** 에서 접수 목록 확인

공개 사전예약 주소: `https://rebom-libom.vercel.app/pre-register`

### 배포 후 Supabase 설정 (회원가입 쓰려면 필수)

1. [supabase.com](https://supabase.com) → 프로젝트 → **Authentication → URL Configuration**
2. **Site URL**: 배포된 주소 (예: `https://rebom-xxx.vercel.app`)
3. **Redirect URLs**에 같은 주소 추가 후 Save

### 웹에서 배포하는 방법 (대안)

1. [vercel.com](https://vercel.com) 가입
2. **Add New → Project** → GitHub 연결 후 이 폴더 업로드
3. Environment Variables에 `.env.local` 내용 그대로 입력
4. Deploy

---

## 폴더 구조

```
app/
  (auth)/login, signup, signup/verify
  (onboarding)/profile
  (main)/home, matches, schedule, my
  api/verification, recommendations, interests, matches, appointments
components/   — UI 컴포넌트 (5060 친화 큰 글자·버튼)
lib/          — supabase, codef, recommendations
types/        — TypeScript 타입
supabase/migrations/
```

## 5060 UI 가이드

- 기본 글자: `text-lg` (18px)
- 버튼 최소 높이: `min-h-12` (48px)
- 딥 포레스트 그린 + 골드 악센트 — `#1A473A` / `#C9A962` (5060 프리미엄)
- 하단 고정 네비게이션 (추천·매칭·일정·내 정보)

## 알려진 제한 (MVP)

- 이메일 가입만 지원 (2차: 휴대폰 OTP 예정)
- 채팅, 식당 예약, 푸시 알림 미포함
- Codef 샌드박스는 고정 더미 데이터 반환
- 추천 알고리즘: 같은 지역 + 미추천자 단순 SQL

## 라이선스

Private MVP — 리봄
