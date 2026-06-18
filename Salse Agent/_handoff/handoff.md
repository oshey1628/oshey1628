# 현재 상태 인수인계

## 프로젝트 상태
- 메인 프로토타입: `deployed and operational` (작업 이력 기준)
- 테스트 자산: `locally verified`
- 리더 보고서 산출물: `locally verified`

## 지금까지 한 일
- 1단계 상품상세페이지 프로토타입 구현
- 바텀시트 다단계 선택 흐름 구현
- 로딩 애니메이션, 추천 설계 3안, 상세 팝업 구현
- 2단계 계산결과화면 연결
- 3단계 청약시작 화면 연결
- 다양한 모바일 화면 비율 이슈 수정
- 스모크 테스트 12개 케이스 실행 및 통과 기록 저장
- 이관 문서 세트 작성

## 현재 동작하는 것
- `index.html` 진입
- 생년월일/성별 입력
- 월 보험료 선택
- 보장 니즈 선택
- 로딩 후 추천 3안 제시
- 추천안별 상세 팝업 노출
- `직접 설계` / `상세설계 확인/변경` / `가입시작` 이동
- 2단계와 3단계 연결 흐름

## 아직 안 되는 것 / 확인 안 된 것
- 개인 계정 기준 새 Vercel 배포는 아직 다시 연결 전
- 개인 계정 API key로 실제 외부 연동 검증은 안 함
- 폰 브라우저 4종 전체 재검증은 문서 작성 시점에 다시 실행하지 않음

## 다음에 해야 할 일
1. 개인 GitHub 저장소 생성
2. `pack-ai-agent-stage1` 중심 폴더 업로드
3. 개인 `.env` 재생성
4. 개인 Vercel 프로젝트 연결
5. 폰 실기기 재검증
6. 필요 시 2단계/3단계 화면을 더 실제 동작형으로 확장

## 개인 계정에서 처음 실행할 순서
1. 프로젝트 복사
2. `.env`, `.vercel` 제외 확인
3. `index.html` 또는 정적 서버로 실행
4. `test\smoke-result.md`로 기준 확인
5. 필요 시 `test\run-smoke-test.mjs` 재실행

## 새 Codex에게 먼저 시킬 일
- `_handoff\AGENTS.md`와 `_handoff\folder_map.md`를 먼저 읽게 하기
- `pack-ai-agent-stage1` 폴더 기준으로 현재 화면 구조를 요약하게 하기
- 개인 계정용 배포 준비 체크를 시키기

## 사용자가 직접 확인해야 할 것
- `ref docs` 중 개인 보관 범위를 넘는 자료가 없는지
- `Report_for Leader`를 같은 저장소로 가져갈지 분리할지
- 루트 `.env`, `memo\api설정.txt`, `ref docs\api설정.txt`의 민감정보 정리 여부

## 확인된 사실
- 최종 프로토타입 핵심 폴더는 `codex-current\files-mentioned-by-the-user-pptx\outputs\pack-ai-agent-stage1`
- 테스트 산출물은 `test` 폴더에 있음
- 리더 보고서 산출물은 `Report_for Leader`에 있음
- 실제 API key가 포함된 파일이 루트 `.env`, `memo\api설정.txt`, `ref docs\api설정.txt`에 존재함

## 추정
- 최신 배포 URL 생성에 사용된 최종 폴더는 `pack-ai-agent-stage1` 폴더
- `memo`, `output`, `ref img`, `ref docs`는 작업 재개에 계속 필요

## 사용자 확인 필요
- `Report_for Leader`를 개인 계정에서 별도 프로젝트로 분리할지 여부
