import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import env from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

// initiate app
const app = express();

// set env config
env.config();

// set up middlewares
app.use(cors());
app.use(bodyParser.json());

// confiure openai api
const configuration = new Configuration({
  organization: 'org-1Tr77iTVyDRf34uWhpTmPZgL', // gotten from settings section of openai.com site
  apiKey: process.env.API_KEY,
});

// initiate openai with configuration parameters
const openai = new OpenAIApi(configuration);

//  llsitening on port 3080
app.listen('3080', () => console.log('Listening on port 3080'));

// dummy route for test
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// set up post route for making request
app.post('/', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `${message}`,
      max_tokens: 100,
      temperature: 0.5,
    });

    res.json({ message: response.data.choices[0].text });
  } catch (e) {
    console.log(e);
    res.send(e).status(400);
  }
});
