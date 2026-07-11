-- 큐레이션·3단계 인증 필드 추가

ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS phone_verified_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS face_verified_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS marital_deferred BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS values_data JSONB NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS lifestyle_data JSONB NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS values_complete BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS lifestyle_complete BOOLEAN NOT NULL DEFAULT false;

CREATE INDEX IF NOT EXISTS idx_profiles_values_complete ON profiles(values_complete);
CREATE INDEX IF NOT EXISTS idx_profiles_lifestyle_complete ON profiles(lifestyle_complete);
