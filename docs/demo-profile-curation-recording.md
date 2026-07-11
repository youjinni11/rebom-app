# GIF 3 프로필 큐레이션 — 녹화 가이드

데모 페이지 주소: `http://localhost:3000/demo/profile-curation`

녹화용(컨트롤 숨김): `http://localhost:3000/demo/profile-curation?record=1`

## 흐름 (가치관 큐레이션)

| 순서 | 내용 | 표시 시간 |
|------|------|-----------|
| 1 | 앱 홈 — 하단 **프로필** 탭 클릭 | 1.8초 |
| 2 | 미혼 상태 인증 — 미혼 인증하기 클릭 | 1.9초 |
| 3 | **미혼 사실 인증 안내** — 서류인증하기 클릭 | 1.9초 |
| 4 | 미혼 인증 완료 | 1.3초 |
| 5 | 프로필 화면 — **가치관 입력하기** 클릭 | 1.8초 |
| 6 | STEP 1 만남에서 중요한 것 (칩 자동 선택) | 1.8초 |
| 7 | STEP 2 목표 관계 (칩 자동 선택) | 1.8초 |
| 8 | STEP 3 정치성향 (칩 자동 선택) | 1.7초 |
| 9 | STEP 4 종교·신앙 (칩 자동 선택) | 1.7초 |
| 10 | STEP 5 피하고 싶은 상대 필터 → **가치관 등록 완료** | 2.1초 |
| 11 | 가치관 등록 완료 | 2.2초 |

**총 길이: 20초**

## 1. 개발 서버 실행

프로젝트 폴더에서 아래 명령을 복사해 터미널에 붙여넣으세요.

```bash
npm run dev
```

## 2. 브라우저에서 데모 열기

1. Chrome 또는 Safari에서 `http://localhost:3000/demo/profile-curation?record=1` 접속
2. **반복 재생** 체크를 **끄세요** (1회만 재생)
3. `?record=1` 주소를 쓰면 우측 컨트롤이 화면에 안 보입니다

### 디자인 수정용 (멈춘 상태)

- `http://localhost:3000/demo/profile-curation?design=1&slide=2` — 미혼 상태 인증 서류 화면
- `http://localhost:3000/demo/profile-curation?design=1&slide=3` — 미혼 사실 인증 안내
- `http://localhost:3000/demo/profile-curation?design=1&slide=5` — 프로필 화면
- 미리보기 주소 — 우측 **일시정지** 클릭

## 3. 화면 녹화 (Mac)

1. `Cmd + 0` 으로 확대 **100%** 맞추기
2. `Cmd + Shift + 5` → **세로로 긴** 크림색 화면만 드래그해서 선택
3. **20초** 녹화 (여유 있게 22~24초까지 잡아도 됨)

## 4. MP4 → GIF 변환

1. [ezgif.com/video-to-gif](https://ezgif.com/video-to-gif) 접속
2. 녹화한 MP4 업로드
3. 권장 설정:
   - **Size**: 너비 480~720px
   - **Frame rate**: 15 fps
4. **Convert to GIF** → 다운로드

## 5. PPT에 넣기

- GIF 2(신원검증) 다음 슬라이드에 GIF 3 배치
- 배경이 어두운 녹색이면 `?record=1` 로 녹화해 크림 화면만 잘라 쓰세요

GIF 4(라이프스타일 큐레이션) 녹화: `docs/demo-lifestyle-curation-recording.md` 참고
주소: `http://localhost:3000/demo/lifestyle-curation?record=1`
