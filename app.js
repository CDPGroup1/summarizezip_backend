const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3000;
const Iconv = require('iconv').Iconv;
const { spawn } = require('child_process');

app.use(cors());
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const Clova_baseUrl = 'https://naveropenapi.apigw.ntruss.com/text-summary/v1/summarize';
const Papago_baseUrl = 'https://openapi.naver.com/v1/papago/n2mt';

function filter(content) {
  const reg = /[^a-zA-Z,. ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g;
  const filterContent = content.replace(reg, '');
  if (filterContent.length < 2000 && filterContent.length > 200) {
    return 1;
  }
  return 0;
}
app.get('/', (req, res) => {
  res.send('hello');
});

app.post('/python', (req, res) => {
  const href = req.body.url;
  const pyProg = spawn('python', ['extract.py', href]);

  pyProg.stdout.on('data', function (data) {
    const buffer1 = Buffer.from(data);
    const iconv = new Iconv('euc-kr', 'UTF8');
    const pythonReturn = iconv.convert(buffer1).toString();
    const ptyhonText = { answer: pythonReturn };
    res.send(ptyhonText);
  });
});

app.post('/api/summarize', async (req, res) => {
  const { title, content, model = 'news', summaryCount = 3 } = req.body;
  if (filter(content)) {
    const postData = {
      document: {
        title: 'title',
        content,
      },
      option: {
        language: 'ko',
        model,
        tone: 2,
        summaryCount,
      },
    };

    try {
      const { data } = await axios.post(Clova_baseUrl, postData, {
        headers: {
          'X-NCP-APIGW-API-KEY-ID': `${process.env.KEY_ID}`,
          'X-NCP-APIGW-API-KEY': `${process.env.KEY}`,
          'Content-Type': 'application/json',
        },
      });
      res.send(data);
    } catch (error) {
      throw new Error('에러가 발생했습니다', error);
    }
  } else {
    const data = '0';
    res.send(data);
  }
});

app.post('/api/translate', async (req, res) => {
  const { text } = req.body;
  const englishFilter = /[^a-zA-Z,. ]/g;

  const filterText = text.replace(englishFilter, '');
  const postData = {
    source: 'en',
    target: 'ko',
    text: filterText,
  };
  try {
    const { data } = await axios.post(Papago_baseUrl, postData, {
      headers: {
        'X-Naver-Client-Id': `${process.env.Client_ID}`,
        'X-Naver-Client-Secret': `${process.env.Client_Secret}`,
        'Content-Type': 'application/json',
      },
    });
    console.log(data.message.result);
    res.send(data.message.result);
  } catch (error) {
    throw new Error(error);
  }
});

app.listen(port, () => {
  console.log(`http://localhost:${port}에서 서버가 실행중입니다.`);
});
