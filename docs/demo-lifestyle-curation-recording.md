# GIF 4 라이프스타일 큐레이션 — 녹화 가이드

데모 페이지 주소: `http://localhost:3000/demo/lifestyle-curation`

녹화용(컨트롤 숨김): `http://localhost:3000/demo/lifestyle-curation?record=1`

## 흐름 (라이프스타일 4단계)

| 순서 | 내용 | 표시 시간 |
|------|------|-----------|
| 1 | 프로필 탭 — 라이프스타일 등록 탭 | 2.5초 |
| 2 | STEP 1 활동·취미 (칩 자동 선택) | 2.75초 |
| 3 | STEP 2 가족관계 (칩 자동 선택) | 2.5초 |
| 4 | STEP 3 운동·자기관리 (칩 자동 선택) | 2.75초 |
| 5 | STEP 4 음주·흡연 빈도 (칩 자동 선택) | 2.5초 |

**총 길이: 13초**

> 정치성향은 GIF 3 가치관 큐레이션 STEP 4에서 다룹니다.

## 1. 개발 서버 실행

```bash
npm run dev
```

## 2. 브라우저에서 데모 열기

1. 데모 목록(`/demo`)에서 **9:16 녹화 창 열기** 버튼 클릭
2. **반복 재생** 체크를 **끄세요** (1회만 재생)

### 디자인 수정용 (멈춘 상태)

- `http://localhost:3000/demo/lifestyle-curation?design=1&slide=3` — STEP 2 가족관계

## 3. 화면 녹화 (Mac)

1. `Cmd + 0` 으로 확대 **100%** 맞추기
2. `Cmd + Shift + 5` → 세로 창 전체 드래그
3. 약 **15초** 녹화 (여유 있게)

## 4. MP4 → GIF 변환

1. [ezgif.com/video-to-gif](https://ezgif.com/video-to-gif) 접속
2. MP4 업로드 → 너비 480~720px, 15fps 권장

## 5. PPT에 넣기

- GIF 3(가치관 큐레이션) 다음 슬라이드에 GIF 4 배치
