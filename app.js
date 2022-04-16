const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 3000;

require('dotenv').config();

axios.defaults.headers.common = {
  'X-NCP-APIGW-API-KEY-ID': `${process.env.KEY_ID}`,
  'X-NCP-APIGW-API-KEY': `${process.env.KEY}`,
  'Content-Type': 'application/json',
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const Clova_baseUrl = 'https://naveropenapi.apigw.ntruss.com/text-summary/v1/summarize';
const Papago_baseUrl = 'https://naveropenapi.apigw.ntruss.com/nmt/v1/translation';

app.get('/', (req, res) => {
  res.send('hello');
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
    const { data } = await axios.post(Clova_baseUrl, postData);
    res.send(data);
  } catch (error) {
    throw new Error('에러가 발생했습니다', error);
  }
});

app.post('/api/translate', async (req, res) => {
  const { text } = req.body;

  const postData = {
    source: 'en',
    target: 'ko',
    text,
  };
  try {
    const { data } = await axios.post(Papago_baseUrl, postData);
    res.send(data.message.result);
  } catch (error) {
    throw new Error(error);
  }
});

app.listen(port, () => {
  console.log(`http://localhost:${port}에서 서버가 실행중입니다.`);
});
