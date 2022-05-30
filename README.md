# summarizezip_backend

## 🛠 사용법

1. backend 폴더를 클론하세요.

<img width="355" alt="image" src="https://user-images.githubusercontent.com/53992007/163669182-d3757a5e-dd1d-40b7-85f9-a7fc30a7a134.png">

2. 이후 설치한 폴더에서 `npm install` 명령어를 입력하세요.

<img width="308" alt="image" src="https://user-images.githubusercontent.com/53992007/163669199-4a3e733c-5127-4d0a-a550-0ab6c00d12bb.png">

3. `pip install trafilatura` 명령어를 입력하여 `trafilatura` 패키지를 설치하세요.

4. 폴더안에 `.env` 파일을 만들어 그곳에 다음과 같이 입력해주세요.

<img width="174" alt="image" src="https://user-images.githubusercontent.com/53992007/163669220-0a3affbc-0964-4075-8791-53899a4064bd.png">

```
KEY_ID=콘솔에서 받은 Client ID
KEY=콘솔에서 받은 Client Secret

Client_ID=파파고 무료 API에서 받은 Client ID
Client_Secret=파파고 무료 API에서 받은 Client Secret
```

> 네이버 클라우드 콘솔에서 받은 API 키들과 파파고 무료 API에서 받은 키들을 입력해주세요

4. `node app.js` 명령어로 앱을 실행하세요.

<img width="539" alt="image" src="https://user-images.githubusercontent.com/53992007/163669240-b2ce38a3-0ba4-4a7a-977f-787e1095697b.png">

5. API 호출을 하면 됩니다.

## 📝 API

### baseUrl

`http://localhost:3000`

### 본문 추출하기

| method | uri     |
| ------ | ------- |
| POST   | /python |

```js
{
    requestBody: {
        "url": "string",
    },
    response: 'content'
}
```

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
