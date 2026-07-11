# 리봄 — 5060 프리미엄 매칭

미혼 인증 기반 5060 세대를 위한 매칭 서비스입니다.

## 개발자용 플로우차트 (필수)

제품 규칙·화면 순서·결제·운영 Admin을 정리한 문서입니다.  
GitHub에서 다이어그램이 **그림으로** 보입니다.

→ **[docs/FLOWCHART.md](./docs/FLOWCHART.md)** (그림 중심)  
→ **[docs/FRAMEWORK.md](./docs/FRAMEWORK.md)** (화면·DB·API 전체)

> 구 MVP 코드와 목표가 다를 수 있습니다. **구현은 FLOWCHART / FRAMEWORK를 우선**하세요.

## 주요 기능 (목표 프레임워크)

- **로그인** — 카카오 / 구글 / 휴대폰
- **신원검증** — 동의 · SMS OTP(신상) · 얼굴 · 미혼
- **가입비·매칭비** — 가입 10만 / 매칭 수락 시 양쪽 3만(첫 1회 무료)
- **운영 매칭** — 리봄이 남녀 쌍 제안 (2일 1건, 48시간 수락)
- **일정** — 불가능 시간·가능 장소 → 리봄이 일정·장소 제안
- **채팅** — 만남 24시간 전 오픈 ~ 만남 후 24시간 내 종료

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
