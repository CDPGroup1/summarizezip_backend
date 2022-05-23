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
  const emoticonRegex =
    /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
  const specialRegex = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;

  // content.replace(emoticonRegex, '');
  // content.replace(specialRegex, '');
  if (content.length < 2000 && content.length > 200) {
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
  let { text } = req.body;
  const englishFilter = /[^a-zA-Z,. ]/g;

  let text1 = text.replace(englishFilter, '');
  console.log(text1);
  const postData = {
    source: 'en',
    target: 'ko',
    text1,
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
