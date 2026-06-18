# AGENTS.md

## 프로젝트 목적
- 팩 건강보험 상품상세페이지에서 고객의 생년월일, 성별, 월 보험료, 우선 보장 니즈를 입력받고
- AI 추천 흐름처럼 3가지 설계안을 제안한 뒤
- 2단계 계산결과화면과 3단계 청약시작화면으로 자연스럽게 연결되는 모바일 프로토타입을 유지·확장한다.

## 우선 이해해야 할 맥락
- 이 프로젝트는 실제 서비스 백엔드가 아니라, UX 흐름 검증용 HTML 프로토타입 중심 작업이다.
- 주 작업 대상은 `pack-ai-agent-stage1` 폴더의 정적 HTML/CSS/JS다.
- 사용자는 한국어 문구, 모바일 화면 밀도, 삼성생명 디지털보험 맥락, 전환 마찰 감소를 매우 중요하게 본다.
- 사용자 선호는 결론 먼저, 짧게, 실제 수정 중심이다.

## 주요 파일 구조
- `codex-current\files-mentioned-by-the-user-pptx\outputs\pack-ai-agent-stage1\index.html`
  - 1단계 상품상세 + 바텀시트 + 로딩 + 추천안 + 상세 팝업
- `codex-current\files-mentioned-by-the-user-pptx\outputs\pack-ai-agent-stage1\result-1.html`
  - 2단계 계산결과화면
- `codex-current\files-mentioned-by-the-user-pptx\outputs\pack-ai-agent-stage1\apply-step-1.html`
  - 3단계 청약시작 화면
- `codex-current\files-mentioned-by-the-user-pptx\outputs\pack-ai-agent-stage1\assets\`
  - 이미지, 폰트, 로티 관련 자산
- `test\`
  - 테스트케이스와 스모크 테스트 결과
- `ref img\`, `ref docs\`
  - 구현 기준 참고자료

## 작업 원칙
- 원본 참고 이미지와 실제 HTML 산출물을 섞지 말고 구분해서 수정한다.
- 가능한 한 정적 HTML/CSS/JS 범위에서 해결한다.
- 문구 변경은 화면 폭 832x2268 계열에서도 줄바꿈이 깨지지 않는지 함께 본다.
- UX 판단은 화려함보다 고객 이해, 가격 납득, 보장 이해, 다음 행동 명확성 우선이다.
- 사용자가 “배포”를 요청하면 현재 `pack-ai-agent-stage1` 폴더 기준으로 본다.

## 승인 없이 하면 안 되는 작업
- `.env` 내용 열람 후 외부 전송
- `.vercel` 재사용 전제 문서화
- 외부 배포/계정 연결 변경
- 회사 내부 자료 외부 반출
- 대규모 구조 개편 또는 자산 삭제

## 보안 원칙
- 실제 API key, token, `.env` 값은 문서나 응답에 적지 않는다.
- 환경변수는 변수명만 기록한다.
- `.vercel`, `.env`, 로그인 세션 파일은 개인 계정에서 다시 연결한다.
- 회사 문서/이미지는 개인 보관용 범위를 넘는 공유 금지 전제다.

## 권장 검증 방법
- 빠른 확인: `index.html`, `result-1.html`, `apply-step-1.html`을 모바일 폭에서 직접 열기
- 회귀 확인: `test\run-smoke-test.mjs` 재실행
- 문구/레이아웃 확인: Fold 계열 전면 폭에서 CTA, 바텀시트, 팝업, 헤더 겹침 여부 점검

## 완료 보고 방식
- 변경 파일
- 바뀐 화면/문구
- 직접 확인한 것
- 아직 확인 못 한 것
- 다음 선택 1개

## 남아 있는 위험 / 주의사항
- 일부 화면은 과거에 오버레이 방식 이슈가 있었으므로, 새 수정 시 상대 위치 계산보다 원천 레이아웃 반영을 우선한다.
- 모바일 브라우저 주소창 영역 때문에 상단 여백 이슈가 재발할 수 있다.
- `Report_for Leader`는 별도 산출물이므로 본 프로토타입 수정과 함께 실수로 변경하지 않도록 주의한다.
