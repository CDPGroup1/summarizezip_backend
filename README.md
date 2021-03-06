# summarizezip_backend

## ๐  ์ฌ์ฉ๋ฒ

1. backend ํด๋๋ฅผ ํด๋ก ํ์ธ์.

<img width="355" alt="image" src="https://user-images.githubusercontent.com/53992007/163669182-d3757a5e-dd1d-40b7-85f9-a7fc30a7a134.png">

2. ์ดํ ์ค์นํ ํด๋์์ `npm install` ๋ช๋ น์ด๋ฅผ ์๋ ฅํ์ธ์.

<img width="308" alt="image" src="https://user-images.githubusercontent.com/53992007/163669199-4a3e733c-5127-4d0a-a550-0ab6c00d12bb.png">

3. `pip install trafilatura` ๋ช๋ น์ด๋ฅผ ์๋ ฅํ์ฌ `trafilatura` ํจํค์ง๋ฅผ ์ค์นํ์ธ์.

4. ํด๋์์ `.env` ํ์ผ์ ๋ง๋ค์ด ๊ทธ๊ณณ์ ๋ค์๊ณผ ๊ฐ์ด ์๋ ฅํด์ฃผ์ธ์.

<img width="174" alt="image" src="https://user-images.githubusercontent.com/53992007/163669220-0a3affbc-0964-4075-8791-53899a4064bd.png">

```
KEY_ID=์ฝ์์์ ๋ฐ์ Client ID
KEY=์ฝ์์์ ๋ฐ์ Client Secret

Client_ID=ํํ๊ณ  ๋ฌด๋ฃ API์์ ๋ฐ์ Client ID
Client_Secret=ํํ๊ณ  ๋ฌด๋ฃ API์์ ๋ฐ์ Client Secret
```

> ๋ค์ด๋ฒ ํด๋ผ์ฐ๋ ์ฝ์์์ ๋ฐ์ API ํค๋ค๊ณผ ํํ๊ณ  ๋ฌด๋ฃ API์์ ๋ฐ์ ํค๋ค์ ์๋ ฅํด์ฃผ์ธ์

4. `node app.js` ๋ช๋ น์ด๋ก ์ฑ์ ์คํํ์ธ์.

<img width="539" alt="image" src="https://user-images.githubusercontent.com/53992007/163669240-b2ce38a3-0ba4-4a7a-977f-787e1095697b.png">

5. API ํธ์ถ์ ํ๋ฉด ๋ฉ๋๋ค.

## ๐ API

### baseUrl

`http://localhost:3000`

### ๋ณธ๋ฌธ ์ถ์ถํ๊ธฐ

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

### ๋ฌธ๋จ ์์ฝํ๊ธฐ

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

### ๋ฌธ๋จ ๋ฒ์ญํ๊ธฐ

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
