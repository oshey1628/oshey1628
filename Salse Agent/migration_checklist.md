# 개인 계정 이관 체크리스트

## 1. 가져갈 파일 / 폴더
- [ ] `codex-current`
- [ ] `memo`
- [ ] `output`
- [ ] `ref docs`
- [ ] `ref img`
- [ ] `Report_for Leader`
- [ ] `test`
- [ ] `_handoff`
- [ ] `41개보장_설정값.xlsx`
- [ ] 루트 `AGENTS.md` (참고용)

## 2. 가져가면 안 되는 파일 / 폴더
- [ ] `.env`
- [ ] `.vercel`
- [ ] `memo\api설정.txt`
- [ ] `ref docs\api설정.txt`
- [ ] `node_modules`
- [ ] `.venv`
- [ ] 캐시 파일
- [ ] Office 임시 잠금 파일 `~$*.pptx`

## 3. GitHub private repo로 옮기는 방법
1. 개인 GitHub에서 새 private repo 생성
2. 이 프로젝트를 새 폴더로 복사
3. `.env`, `.vercel`, 임시 파일 삭제 또는 제외 확인
4. `.gitignore` 보강
5. 첫 커밋 후 private repo로 push

## 4. ZIP 파일로 옮기는 방법
1. 프로젝트 복사본 생성
2. 민감 폴더 삭제
3. ZIP 압축
4. 개인 PC에서 압축 해제
5. 개인 Git 또는 개인 백업 위치로 이동

## 5. 개인 계정에서 새로 만들어야 하는 것
- [ ] 개인 GitHub 저장소
- [ ] 개인 Vercel 프로젝트
- [ ] 개인 `.env`
- [ ] 개인 API key
- [ ] 기존 노출 key 폐기 또는 재발급 판단

## 6. 다시 설정해야 하는 환경변수
- [ ] `BIZROUTER_API_KEY`
- [ ] `BIZROUTER_BASE_URL`
- [ ] `BIZROUTER_MODEL`

## 7. 첫 검증 명령 / 확인
- [ ] `index.html` 직접 열기 또는 정적 서버 실행
- [ ] 1단계 입력 흐름 확인
- [ ] 추천안 3개 확인
- [ ] `result-1.html` 이동 확인
- [ ] `apply-step-1.html` 이동 확인
- [ ] `test\smoke-result.md`와 비교

## 8. 정상 이관 판단 기준
- [ ] 최종 프로토타입 폴더가 누락 없이 복사됨
- [ ] 폰트와 이미지가 정상 로드됨
- [ ] 1단계/2단계/3단계 화면 이동이 됨
- [ ] 민감정보가 새 저장소에 포함되지 않음
- [ ] 개인 Vercel에서 새 URL 배포 가능

## 9. 문제 생겼을 때 확인 순서
1. `_handoff/folder_map.md`
2. `_handoff/README.md`
3. `_handoff/handoff.md`
4. `test/smoke-result.md`
5. `ref img`와 실제 화면 비교

## 10. 추천 이관 구조

### 옵션 A. 한 저장소로 유지
- 장점: 자료 찾기 쉬움
- 단점: 프로토타입과 보고서가 섞임

### 옵션 B. 두 저장소로 분리 (추천)
- 저장소 1: `pack-ai-agent-stage1`
- 저장소 2: `report-for-leader`
- 장점: 목적별 관리 쉬움
- 단점: 초기 정리 1회 필요

추천안: 옵션 B
