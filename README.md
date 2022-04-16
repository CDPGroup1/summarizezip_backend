# summarizezip_backend

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
