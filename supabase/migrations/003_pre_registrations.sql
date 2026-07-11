-- 사전예약 신청 테이블

CREATE TABLE IF NOT EXISTS pre_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  gender TEXT NOT NULL CHECK (gender IN ('male', 'female')),
  age_range TEXT NOT NULL CHECK (age_range IN ('50-54', '55-59', '60-64', '65-69')),
  phone TEXT NOT NULL,
  consent_required BOOLEAN NOT NULL DEFAULT false,
  consent_marketing BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (phone)
);

CREATE INDEX IF NOT EXISTS idx_pre_registrations_created_at ON pre_registrations(created_at DESC);

ALTER TABLE pre_registrations ENABLE ROW LEVEL SECURITY;

-- 클라이언트 직접 접근 차단 (API 서버만 service_role로 insert)
