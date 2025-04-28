import fs from 'fs';
import path from 'path';
import db from "../config/connection.js";
import Question from "../models/Question.js";
import cleanDB from "./cleanDb.js";

db.once('open', async () => {
  try {
    const filePath = path.resolve('src/seeds/pythonQuestions.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const pythonQuestions = JSON.parse(fileContent);

    await cleanDB('Question', 'questions');
    await Question.insertMany(pythonQuestions);

    console.log('Questions seeded!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding the database:', err);
    process.exit(1);
  }
});