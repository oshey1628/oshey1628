# 개인 계정 실행 안내

## 프로젝트 개요
- 프로젝트명: Pack AI Agent 프로토타입
- 성격: 모바일 UX 검증용 정적 HTML 프로토타입
- 핵심 화면:
  - 1단계 상품상세/입력/추천 흐름
  - 2단계 계산결과화면
  - 3단계 청약시작 화면

## 필요한 프로그램
- 웹 브라우저 1종 이상
- Windows 파일 탐색기
- 선택 사항:
  - Python 또는 정적 파일 서버
  - Git
  - Vercel CLI

## 필요한 외부 계정
- 개인 GitHub 계정
- 개인 Vercel 계정
- 필요 시 개인 OpenAI/BizRouter 계정

## 설치/준비 방법
1. 이 프로젝트 폴더를 개인 PC로 복사한다.
2. 아래 민감 폴더는 제외한다.
   - `.env`
   - `.vercel`
   - 캐시/가상환경 폴더
3. 개인 저장소를 새로 만들고 업로드한다.

## 실행 방법

### 방법 A. 파일 직접 열기
- `codex-current\files-mentioned-by-the-user-pptx\outputs\pack-ai-agent-stage1\index.html`을 브라우저로 연다.

### 방법 B. 정적 서버로 열기
- 권장 위치:
  - `codex-current\files-mentioned-by-the-user-pptx\outputs\pack-ai-agent-stage1`
- 예시:
  - `python -m http.server 8765`
- 접속:
  - `http://127.0.0.1:8765/index.html`

## 환경변수 설정 방법
- 실제 값은 기존 `.env`를 옮기지 말고 개인 계정 값으로 새로 만든다.
- `memo\api설정.txt`, `ref docs\api설정.txt`에도 실제 키가 남아 있을 수 있으므로 그대로 보관소에 올리지 말고 삭제 또는 마스킹 후 보관한다.
- 현재 확인된 변수명:
  - `BIZROUTER_API_KEY`
  - `BIZROUTER_BASE_URL`
  - `BIZROUTER_MODEL`

## 개인 계정에서 새로 만들어야 하는 것
- 개인 OpenAI/BizRouter API key
- 개인 Vercel 프로젝트 연결
- 필요 시 새 `.env`

예시:
```text
BIZROUTER_API_KEY=개인 계정에서 새로 발급
BIZROUTER_BASE_URL=개인 계정 기준 API 엔드포인트
BIZROUTER_MODEL=개인 계정에서 사용할 모델명
```

## 다시 연결해야 하는 서비스
- Vercel 프로젝트 연결
- GitHub 원격 저장소
- 브라우저 북마크/배포 도메인 기록이 필요하면 수동 재설정

## 자주 막히는 지점
- `.vercel`을 그대로 가져가도 개인 계정과 연결이 맞지 않을 수 있음
- 예전 메모 파일 안에 실제 API key가 남아 있으면 실수로 커밋될 수 있음
- 모바일 브라우저 주소창 때문에 상단이 가려져 보일 수 있음
- 대형 폰트 파일과 이미지 자산 때문에 ZIP 없이 복사하면 누락될 수 있음
- 파일 직접 열기와 정적 서버 열기에서 상대경로 동작 차이가 생길 수 있음

## 첫 실행 확인 방법
1. `index.html`이 열린다.
2. 생년월일/성별/보험료/보장 선택이 된다.
3. 추천안 3개가 보인다.
4. `상세설계 확인/변경`으로 `result-1.html` 이동이 된다.
5. `가입시작`으로 `apply-step-1.html` 이동이 된다.

## 추천 이관 단위
- 프로토타입용 저장소:
  - `pack-ai-agent-stage1`
- 보고서용 저장소(선택):
  - `Report_for Leader`
