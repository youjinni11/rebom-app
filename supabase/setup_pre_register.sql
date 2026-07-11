-- ============================================================
-- 리봄 사전예약 — Supabase SQL Editor에서 이 파일 전체를 복붙 후 Run
-- ============================================================

-- 1) 테이블 생성 (없으면 새로 만듦)
CREATE TABLE IF NOT EXISTS pre_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  gender TEXT NOT NULL CHECK (gender IN ('male', 'female')),
  age_range TEXT NOT NULL,
  phone TEXT NOT NULL,
  consent_required BOOLEAN NOT NULL DEFAULT false,
  consent_marketing BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (phone)
);

-- 2) 연령대 구간 제한 (50-54 / 55-59 / 60-64 / 65-69)
ALTER TABLE pre_registrations DROP CONSTRAINT IF EXISTS pre_registrations_age_range_check;
ALTER TABLE pre_registrations
  ADD CONSTRAINT pre_registrations_age_range_check
  CHECK (age_range IN ('50-54', '55-59', '60-64', '65-69'));

-- 3) 인덱스
CREATE INDEX IF NOT EXISTS idx_pre_registrations_created_at
  ON pre_registrations(created_at DESC);

-- 4) RLS 켜기 (웹에서 직접 접근 차단, 서버 API만 저장)
ALTER TABLE pre_registrations ENABLE ROW LEVEL SECURITY;

-- 5) 확인용 (실행 후 아래에 빈 표가 보이면 성공)
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'pre_registrations'
ORDER BY ordinal_position;
