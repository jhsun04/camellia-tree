# 동백나무 (Camellia Tree)

대학교를 선택하고 닉네임을 정하면 나무 화면으로 이동하고, O/X 퀴즈를 풀면 학교별 동백나무에 꽃이 한 송이씩 피는 모바일 웹페이지입니다. HTML, CSS, JavaScript와 Firebase Realtime Database로 만들었습니다.

## 프로젝트 배경

Co-PBL 팀 프로젝트(제주 4·3을 기억하는 활동)에서 기획한 "함께 만드는 동백나무숲"을 직접 웹페이지로 구현했습니다. 퀴즈에 참여하면 학교별 나무에 동백꽃이 한 송이씩 피고, 참여가 쌓일수록 나무숲이 완성되는 구조입니다.

## 화면 흐름

1. `index.html` : 닉네임 입력 + 대학교 검색/선택
2. `result.html` : 나무 이미지와 "동백꽃 만들기" 버튼
3. `make-flower.html` : O/X 퀴즈
4. `flower-result.html` : 꽃이 핀 나무
5. `final-tree.html` : 학교별로 꽃이 누적되는 나무 (실시간)

## 사용한 기술

- HTML / CSS / JavaScript (작은 화면용 반응형)
- `localStorage` : 닉네임과 학교를 브라우저에만 저장
- Firebase Realtime Database : 학교별 꽃 위치(top, left)와 생성 시각만 저장 (닉네임은 저장하지 않음)

## 실행 방법

1. 저장소를 내려받습니다.
2. `firebase-config.example.js`를 `firebase-config.js`로 복사하고 본인 Firebase 프로젝트 값으로 채웁니다.
3. VS Code의 Live Server 등으로 `index.html`을 엽니다.

`firebase-config.js`는 `.gitignore`에 들어 있어 저장소에 올라가지 않습니다.

## Firebase 규칙 예시

```json
{
  "rules": {
    ".read": false,
    ".write": false,
    "trees": {
      "$univ": {
        ".read": true,
        "$flower": {
          ".write": "!data.exists() && newData.exists()",
          ".validate": "newData.hasChildren(['top','left','createdAt'])",
          "top": { ".validate": "newData.isNumber() && newData.val() >= 0 && newData.val() <= 100" },
          "left": { ".validate": "newData.isNumber() && newData.val() >= 0 && newData.val() <= 100" },
          "createdAt": { ".validate": "newData.isNumber()" },
          "$other": { ".validate": false }
        }
      }
    }
  }
}
```

## 참고

- 닉네임은 이 브라우저에서만 쓰이고 서버로 보내지 않습니다.
- 퀴즈 내용은 제주 4·3 관련 예시 문항 3개입니다.
