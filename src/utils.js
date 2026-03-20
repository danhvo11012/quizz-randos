import 'dotenv/config';
import fs from 'fs';
import { stringify } from 'querystring';

export async function DiscordRequest(endpoint, options) {
  // append endpoint to root API URL
  const url = 'https://discord.com/api/v10/' + endpoint;
  // Stringify payloads
  if (options.body) options.body = JSON.stringify(options.body);
  // Use fetch to make requests
  const res = await fetch(url, {
    headers: {
      Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
      'Content-Type': 'application/json; charset=UTF-8',
      'User-Agent': 'DiscordBot (https://github.com/discord/discord-example-app, 1.0.0)',
    },
    ...options
  });
  // throw API errors
  if (!res.ok) {
    const data = await res.json();
    console.log(res.status);
    throw new Error(JSON.stringify(data));
  }
  // return original response
  return res;
}

export async function InstallGlobalCommands(appId, commands) {
  // API endpoint to overwrite global commands
  const endpoint = `applications/${appId}/commands`;

  try {
    // This is calling the bulk overwrite endpoint: https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-global-application-commands
    await DiscordRequest(endpoint, { method: 'PUT', body: commands });
  } catch (err) {
    console.error(err);
  }
}

// Simple method that returns a random emoji from list
export function getRandomEmoji() {
  const emojiList = ['😭','😄','😌','🤓','😎','😤','🤖','😶‍🌫️','🌏','📸','💿','👋','🌊','✨'];
  return emojiList[Math.floor(Math.random() * emojiList.length)];
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getRandomQuiz() {
  const RowDelimiter = 'AAAA';
  const LineDelimiter = 'BBBB';
  let data1;
  try {
    data1 = fs.readFileSync('./src/data/quiz-bank-final.txt', 'utf8');
  } catch (err) {
    console.error("Error reading quiz bank file:", err);
    return ["Error loading quiz. Please try again later."];
  }
    const dataBank1 = data1.split('\n');
    let quiz1 = '*Topic: Final Exam*\n' + dataBank1[Math.floor(Math.random() * dataBank1.length)]

    // Temporarily only using one quiz bank, but can easily add more by uncommenting code below and adding more quiz bank txt files
    // const data2 = fs.readFileSync('./data/quiz-bank-2.txt', 'utf8');  
    // const dataBank2 = data2.split(LineDelimiter);
    // let quiz2 = '*Topic: General*' + dataBank2[Math.floor(Math.random() * dataBank2.length)]
    // const quiz = [quiz1, quiz2][Math.floor(Math.random() * 2)].split(RowDelimiter);

    const quiz = quiz1.split(RowDelimiter);
  

  return quiz;
}
