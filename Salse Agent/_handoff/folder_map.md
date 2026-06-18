# 폴더 이관 지도

이 문서는 `C:\Users\user\Desktop\AI assistant for Pack` 하위 폴더를 개인 계정으로 이관하기 위해 정리한 지도입니다.

## 분류 기준
- 확인된 사실: 실제 폴더/파일 구조를 보고 확인
- 추정: 파일명, 위치, 산출물 조합을 보고 판단
- 사용자 확인 필요: 최종 의도가 파일만으로 확정되지 않음

---

폴더: `C:\Users\user\Desktop\AI assistant for Pack\codex-current`
역할: Codex 작업 중 생성된 원본 작업 루트
상태: 최종본
근거: `files-mentioned-by-the-user-pptx\outputs\pack-ai-agent-stage1` 아래에 `index.html`, `result-1.html`, `apply-step-1.html`, `assets`, `.vercel`이 함께 있어 배포 단위로 보임. 이전 대화 흐름에서도 이 경로가 실제 배포와 수정의 중심이었다.
이관 여부: 가져가기 권장
주의사항: `.vercel`은 포함하지 말고 제외. `server.log`, `preview.log`는 선택 사항.

폴더: `C:\Users\user\Desktop\AI assistant for Pack\codex-current\files-mentioned-by-the-user-pptx\outputs\pack-ai-agent-stage1`
역할: 팩 건강보험 AI 추천 프로토타입 최종 산출물
상태: 최종본
근거: HTML 3종, 폰트, 이미지, 로딩 애니메이션 자산, 배포 연결 흔적이 한곳에 모여 있음. 최신 배포 URL 생성에 사용된 폴더로 판단.
이관 여부: 반드시 가져가기
주의사항: `.vercel` 제외. `assets\fonts\NotoSansKR-100..900.ttf` 용량이 크므로 ZIP 이관 권장.

폴더: `C:\Users\user\Desktop\AI assistant for Pack\memo`
역할: 작업 메모, 프롬프트, 보장항목 정리 자료
상태: 중간 산출물
근거: 텍스트 메모 위주이며 실행 산출물은 없음.
이관 여부: 가져가기 권장
주의사항: 메모 안에 회사 내부 문맥이 있을 수 있으니 외부 공유 전 1회 검토 권장.

폴더: `C:\Users\user\Desktop\AI assistant for Pack\output`
역할: 최종 확인용 이미지와 별도 보고서 산출물 저장 위치
상태: 중간 산출물
근거: `output\images`와 PPTX 산출물이 존재함.
이관 여부: 가져가기 권장
주의사항: 프로토타입 실행 필수 폴더는 아니지만, 검수 흔적 보존용으로 가치가 있음.

폴더: `C:\Users\user\Desktop\AI assistant for Pack\ref docs`
역할: 참고 문서, 원본 PPT, 보장항목 엑셀, 마이그레이션 문서
상태: 확인 필요
근거: 참조용 자료와 실제 작업 입력물이 섞여 있음.
이관 여부: 가져가기 권장
주의사항: 외부 공유용이 아니라 개인 작업 재개용으로만 보관 권장.

폴더: `C:\Users\user\Desktop\AI assistant for Pack\ref img`
역할: 1단계/2단계/3단계 화면 참조 이미지
상태: 중간 산출물
근거: 실제 HTML 화면 구현의 디자인 기준 이미지로 사용됨.
이관 여부: 반드시 가져가기
주의사항: 프로토타입 수정 시 계속 필요함.

폴더: `C:\Users\user\Desktop\AI assistant for Pack\Report_for Leader`
역할: 별도 리더 보고용 3장짜리 Sales Agent 보고서 작업물
상태: 최종본
근거: `outputs\pack_health_sales_agent_3pages.pptx`, `output\images\*.png`, `build_sales_agent_deck.cjs`가 존재함.
이관 여부: 가져가기 권장
주의사항: 본 폴더는 프로토타입 본체와는 별도 프로젝트 성격. 개인 계정으로도 함께 가져가되 별도 저장소 분리 고려 가능.

폴더: `C:\Users\user\Desktop\AI assistant for Pack\test`
역할: 테스트케이스와 스모크 테스트 결과
상태: 최종본
근거: `testcase.md`, `run-smoke-test.mjs`, `smoke-result.md`, `smoke-result.json` 존재.
이관 여부: 반드시 가져가기
주의사항: 회귀 테스트 재실행 기준이므로 유지 권장.

폴더: `C:\Users\user\Desktop\AI assistant for Pack\_handoff`
역할: 개인 계정 이관 문서
상태: 최종본
근거: 이번 문서 세트
이관 여부: 반드시 가져가기
주의사항: 실제 secret 값은 포함하지 않음.

---

## 가져가야 할 핵심 폴더
1. `codex-current\files-mentioned-by-the-user-pptx\outputs\pack-ai-agent-stage1`
2. `ref img`
3. `ref docs`
4. `test`
5. `Report_for Leader`
6. `memo`
7. `output`
8. `_handoff`

## 가져가지 않아도 되는 항목
- `server.log`
- `preview.log`
- `~$참고용 피피티.pptx`
- `~$합리적보험료 Agent.pptx`

## 가져가면 위험한 파일 또는 폴더
- `.env`
- `codex-current\files-mentioned-by-the-user-pptx\outputs\pack-ai-agent-stage1\.vercel`
- `memo\api설정.txt`
- `ref docs\api설정.txt`
- 향후 생성될 수 있는 캐시 폴더(`node_modules`, `.venv`, `__pycache__` 등)

## 사용자 확인 필요
- `ref docs` 안의 문서 중 외부 반출이 제한되는 회사 내부 자료가 있는지
- `Report_for Leader`를 프로토타입과 같은 저장소로 가져갈지, 별도 저장소로 분리할지
- 루트 `.env`와 별개로 `memo\api설정.txt`, `ref docs\api설정.txt`까지 함께 정리할지
