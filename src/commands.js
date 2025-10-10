import 'dotenv/config';
import { getRPSChoices } from './game.js';
import { capitalize, InstallGlobalCommands } from './utils.js';

// Get the game choices from game.js
function createCommandChoices() {
  const choices = getRPSChoices();
  const commandChoices = [];

  for (let choice of choices) {
    commandChoices.push({
      name: capitalize(choice),
      value: choice.toLowerCase(),
    });
  }

  return commandChoices;
}

// Simple test command
const TEST_COMMAND = {
  name: 'test',
  description: 'Basic command',
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};

// Command containing options
const CHALLENGE_COMMAND = {
  name: 'challenge',
  description: 'Challenge to a match of rock paper scissors',
  options: [
    {
      type: 3,
      name: 'object',
      description: 'Pick your object',
      required: true,
      choices: createCommandChoices(),
    },
  ],
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};

// Get a random quiz
const GET_QUIZ_COMMAND = {
  name: 'quiz',
  description: 'Challenge me with a random quiz from local quiz bank',
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
}

const GET_10_QUIZ_COMMAND = {
  name: 'quiz10',
  description: 'Challenge me with ten random quizzes from local quiz bank',
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
}

const ALL_COMMANDS = [TEST_COMMAND, CHALLENGE_COMMAND, GET_QUIZ_COMMAND];
const RANDO_COMMANDS = [GET_QUIZ_COMMAND, GET_10_QUIZ_COMMAND];

InstallGlobalCommands(process.env.APP_ID, RANDO_COMMANDS);
