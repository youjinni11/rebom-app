-- 시드 데이터: 서울 강남권 테스트용 더미 프로필
-- Supabase SQL Editor에서 실행 후: SELECT seed_dummy_profiles();

CREATE OR REPLACE FUNCTION seed_dummy_profiles()
RETURNS void AS $$
DECLARE
  dummy_data RECORD;
  new_user_id UUID;
  email_val TEXT;
BEGIN
  FOR dummy_data IN
    SELECT * FROM (VALUES
      ('김미영', 1968, 'female', '서울 강남', '역삼동에서 살아요. 책과 카페 산책을 좋아합니다.', '010-1234-5001', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400'),
      ('박정호', 1965, 'male', '서울 강남', '삼성동 근처에서 골프와 와인 모임을 즐깁니다.', '010-1234-5002', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'),
      ('이순자', 1970, 'female', '서울 강남', '논현동에서 요리 모임을 자주 해요. 따뜻한 대화를 나눠요.', '010-1234-5003', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400'),
      ('최동진', 1963, 'male', '서울 강남', '청담동에서 클래식 공연 관람을 좋아합니다.', '010-1234-5004', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400'),
      ('정은희', 1967, 'female', '서울 강남', '서초동 산책과 봉사활동을 즐깁니다.', '010-1234-5005', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400'),
      ('한상우', 1964, 'male', '서울 강남', '반포 한강 러닝과 사진 촬영이 취미예요.', '010-1234-5006', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400'),
      ('윤지연', 1969, 'female', '서울 강남', '잠실 근처에서 수영과 요가를 합니다.', '010-1234-5007', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400'),
      ('강민수', 1962, 'male', '서울 강남', '방이동에서 테니스 동호회에 참여해요.', '010-1234-5008', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400'),
      ('송혜진', 1971, 'female', '서울 강남', '압구정 미술관 관람과 전시회가 취미입니다.', '010-1234-5009', 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400'),
      ('임재현', 1966, 'male', '서울 강남', '도곡동에서 독서 모임을 운영하고 있어요.', '010-1234-5010', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400')
    ) AS t(display_name, birth_year, gender, region, bio, phone, photo_url)
  LOOP
    email_val := lower(replace(dummy_data.display_name, ' ', '')) || '@seed.libom.test';

    SELECT id INTO new_user_id FROM auth.users WHERE email = email_val;

    IF new_user_id IS NULL THEN
      new_user_id := gen_random_uuid();

      INSERT INTO auth.users (
        id, instance_id, aud, role, email, encrypted_password,
        email_confirmed_at, created_at, updated_at,
        raw_app_meta_data, raw_user_meta_data, is_super_admin
      ) VALUES (
        new_user_id,
        '00000000-0000-0000-0000-000000000000',
        'authenticated',
        'authenticated',
        email_val,
        crypt('seedpassword123', gen_salt('bf')),
        now(), now(), now(),
        '{"provider":"email","providers":["email"]}',
        jsonb_build_object('display_name', dummy_data.display_name),
        false
      );
    END IF;

    INSERT INTO profiles (
      user_id, display_name, birth_year, gender, region, bio, phone,
      photo_urls, is_complete
    ) VALUES (
      new_user_id,
      dummy_data.display_name,
      dummy_data.birth_year,
      dummy_data.gender,
      dummy_data.region,
      dummy_data.bio,
      dummy_data.phone,
      ARRAY[dummy_data.photo_url],
      true
    )
    ON CONFLICT (user_id) DO UPDATE SET
      display_name = EXCLUDED.display_name,
      birth_year = EXCLUDED.birth_year,
      gender = EXCLUDED.gender,
      region = EXCLUDED.region,
      bio = EXCLUDED.bio,
      phone = EXCLUDED.phone,
      photo_urls = EXCLUDED.photo_urls,
      is_complete = true;

    INSERT INTO verifications (user_id, type, status, verified_at, codef_raw)
    VALUES (new_user_id, 'marital', 'approved', now(), '{"mock": true}'::jsonb)
    ON CONFLICT (user_id, type) DO UPDATE SET status = 'approved', verified_at = now();
  END LOOP;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 실행: SELECT seed_dummy_profiles();
