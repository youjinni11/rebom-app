-- 연령대 구간 변경: 50-54 / 55-59 / 60-64 / 65-69
-- (이미 003을 실행한 경우 SQL Editor에서 이 파일도 실행)

ALTER TABLE pre_registrations DROP CONSTRAINT IF EXISTS pre_registrations_age_range_check;

ALTER TABLE pre_registrations
  ADD CONSTRAINT pre_registrations_age_range_check
  CHECK (age_range IN ('50-54', '55-59', '60-64', '65-69'));
