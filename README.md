# B Essential

아이디어 한 줄을 넣으면 사업성 진단 리포트를 만들어 주는 서비스의 프로토타입.
Figma 시안 "B-Essential 사본"을 React로 구현한 뒤, 사용자 흐름 기준으로 화면을 재설계했습니다.

## 실행

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # 타입 체크 + 프로덕션 빌드
```

## 스택

Vite · React 19 · TypeScript · Tailwind CSS v4 · React Router 7

## 화면

| 경로 | 화면 | 비고 |
|---|---|---|
| `/` | 메인 | 입력창 하나. 링크 타고 들어와 바로 아이디어를 넣는 진입점 |
| `/idea` | 01 아이디어 입력 | 린 캔버스. 칸을 눌러 그 자리에서 입력 |
| `/report` | 02 종합 진단 리포트 | 한 페이지 + 클릭해서 세부 펼치기. 무료 구간의 끝 |
| `/bm` | 03 비즈니스 모델 | 원문이 잠깐 보였다 날아가고 정리된 문장이 올라오는 before → after |
| `/market` | 04 시장조사 | TAM/SAM/SOM · 시장 흐름 · 경쟁 구도 |
| `/metrics` | 05 핵심 지표 | 북극성 지표 + 획득/활성화/유지/수익 단계별 지표 |
| `/roadmap` | 06 로드맵 | 0~24개월 세로 타임라인 |
| `/risks` | 07 리스크/해결 필요 | 심각도별 리스크와 대응안 |
| `/grants` | 08 지원사업 소개 | 지원 가능한 사업과 적합 이유 |
| `/prompts` | 09 AI 프롬프트 · 앱 연결 | 복사해서 바로 쓰는 프롬프트 |
| `/pricing` | 요금제 | Free / Pro / Team |
| `/faq` | FAQ · 문의 | |
| `/about` | 서비스 소개 | |
| `/login` | 로그인 | 메일 링크 방식 |

## 설계 메모

- **결제는 가치를 경험한 뒤에** — 메인에는 결제 문구가 없습니다. 02 리포트를 끝까지 읽은 직후에만 다음 단계 결제를 이야기합니다.
- **무료 구간** — 01 입력과 02 진단은 로그인 없이 무료. 03부터 PRO.
- **진행도** — 본문 상단에 얇게 고정. 단계 페이지에서만 표시됩니다.
- **텍스트 정렬** — Figma가 쓰는 `text-box-trim`을 CSS `text-box`(`trim` 유틸리티)로 재현해 시안과 여백을 맞췄습니다.

## 구조

```
src/
  components/
    Layout.tsx     사이드바 + 진행도 바 + Outlet
    ui.tsx         Icon · StepHeader · Collapsible · KeyRow · StepNav 등 공용 요소
  pages/           화면 14개
  data.ts          리포트·단계·요금제 등 데모 데이터 (실제 API 응답으로 교체할 자리)
public/
  icons/           Figma에서 내려받은 원본 SVG
  img/
```

데이터는 모두 `src/data.ts`의 고정값입니다. 실제 연동 시 이 파일만 API 응답으로 바꾸면 됩니다.
