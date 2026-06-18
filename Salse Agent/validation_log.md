# 검증 기록

## 이번 정리에서 실제 확인한 명령

```powershell
Get-ChildItem -Force "C:\Users\user\Desktop\AI assistant for Pack"
```

```powershell
Get-ChildItem -Recurse -Force "C:\Users\user\Desktop\AI assistant for Pack\codex-current\files-mentioned-by-the-user-pptx\outputs\pack-ai-agent-stage1"
```

```powershell
Get-ChildItem -Recurse -Force "C:\Users\user\Desktop\AI assistant for Pack\Report_for Leader"
```

```powershell
Get-Content -Encoding utf8 "C:\Users\user\Desktop\AI assistant for Pack\test\testcase.md"
```

```powershell
Get-Content -Encoding utf8 "C:\Users\user\Desktop\AI assistant for Pack\test\smoke-result.md"
```

```powershell
Get-Content -Encoding utf8 "C:\Users\user\Desktop\AI assistant for Pack\codex-current\files-mentioned-by-the-user-pptx\outputs\pack-ai-agent-stage1\CODEX_HANDOFF.md"
```

```powershell
Get-Content -Encoding utf8 "C:\Users\user\Desktop\AI assistant for Pack\.env" | ForEach-Object { if ($_ -match '^\s*([A-Za-z0-9_]+)\s*=') { $matches[1] } } | Sort-Object -Unique
```

```powershell
rg -n --hidden --glob "!_handoff/**" --glob "!**/.vercel/**" "BIZROUTER_API_KEY|OpenAI key pattern" "C:\Users\user\Desktop\AI assistant for Pack"
```

## 통과한 검증
- 프로젝트 루트 폴더 구조 확인
- 최종 프로토타입 후보 폴더 확인
- 리더 보고서 산출물 폴더 확인
- 테스트케이스 문서 존재 확인
- 스모크 테스트 결과 문서 존재 확인
- 환경변수 변수명만 추출 확인
- 민감정보 검색 결과, 실제 key 보관 파일 위치 확인

## 기존 작업에서 이미 통과한 검증
- 스모크 테스트 12개 모두 통과
- 추천 설계 3안 노출
- 상세 팝업 노출
- `상세설계 확인/변경` -> 2단계 이동
- `직접 설계` -> 2단계 이동
- 2단계 보험료 일치 확인

## 실패한 검증
- 없음

## 실행하지 못한 검증
- 개인 계정 기준 새 Vercel 배포
- 실제 개인 API key 연결
- 폰 실기기 브라우저 재검증

## 실행하지 않은 이유
- 외부 계정 연결, 배포, secret 재설정은 사용자 승인 및 개인 계정 정보가 필요함

## 다음 검증 단계
1. 개인 계정 `.env` 생성
2. `memo\api설정.txt`, `ref docs\api설정.txt` 정리 또는 제외
3. 개인 Vercel 재연결
4. `index.html` 실기기 브라우저 확인
5. `test\run-smoke-test.mjs` 재실행
6. 배포 URL에서 1단계/2단계/3단계 흐름 확인

## 사용자 승인 필요
- 개인 GitHub private repo 생성
- 개인 Vercel 연결/배포
- 외부 API key 발급 및 연결
