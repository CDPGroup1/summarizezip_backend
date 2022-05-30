const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3000;

/**
 * @description mac에서 실행될때는 단순히 data.toString()로 가능
 * windows에서 실행시 buffer로 들어오는 데이터를 받기 위해 iconv 필요
 */
// const { Iconv } = require('iconv');
const { spawn } = require('child_process');

app.use(cors());
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const Clova_baseUrl = 'https://naveropenapi.apigw.ntruss.com/text-summary/v1/summarize';
const Papago_baseUrl = 'https://openapi.naver.com/v1/papago/n2mt';

app.get('/', (req, res) => {
  res.send('hello');
});

app.post('/python', (req, res) => {
  const href = req.body.url;
  const pyProg = spawn('python3', ['extract.py', href]);

  let sendData = '';

  pyProg.stdout.on('data', data => {
    sendData += data.toString();
  });

  pyProg.on('close', () => {
    res.send(JSON.stringify(sendData));
  });

  /**
   * @description window에서 작동하는 코드
   */
  // const buffer1 = Buffer.from(data);
  // const iconv = new Iconv('euc-kr', 'UTF8');
  // const pythonReturn = iconv.convert(buffer1).toString();
  // res.send(JSON.stringify(pythonReturn));

  // pyProg.stderr.on('data', data => res.send(JSON.stringify('trafilatura 라이브러리에서 오류 발생', data.toString())));
});

app.post('/api/summarize', async (req, res) => {
  const { title, content, model = 'news', summaryCount = 3 } = req.body;

  const postData = {
    document: {
      title,
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
    res.send(data.message.result);
  } catch (error) {
    throw new Error(error);
  }
});

app.listen(port, () => {
  console.log(`http://localhost:${port}에서 서버가 실행중입니다.`);
});
