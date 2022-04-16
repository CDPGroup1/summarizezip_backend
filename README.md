# summarizezip_backend

## 🛠 사용법

1. backend 폴더를 클론하세요.

2. `npm install` 명령어를 입력하세요.

3. `.env` 파일을 만들어 그곳에 다음과 같이 입력해주세요.

```
KEY_ID=콘솔에서 받은 Cliend ID
KEY=콘솔에서 받은 Client Secret
```

> 네이버 클라우드 콘솔에서 받은 API 키들을 입력해주세요

4. `node app.js` 명령어로 앱을 실행하세요.

## 📝 API

### baseUrl

`http://localhost:3000`

### 문단 요약하기

| method | uri            |
| ------ | -------------- |
| POST   | /api/summarize |

```js
{
    requestBody: {
        "title": "string",
        "content": "string",
        "model"?: "news" | "general",
        "summaryCount"?: "number",
    },
    response: {
        "summary": "string",
    }
}
```

### 문단 번역하기

| method | uri            |
| ------ | -------------- |
| POST   | /api/translate |

```js
{
    requestBody: {
        "text": "string",
    },
    response: {
        "srcLangType": "en",
        "tarLangType": "ko",
        "translatedText": "string",
    }
}
```
