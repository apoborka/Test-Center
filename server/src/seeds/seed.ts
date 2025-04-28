import db from "../config/connection.js";
import Question from "../models/Question.js";
import cleanDB from "./cleanDb.js";

db.once('open', async () => {
  try {
    const pythonQuestions = (await import('./pythonQuestions.json', { assert: { type: "json" } })).default;

    await cleanDB('Question', 'questions');
    await Question.insertMany(pythonQuestions);

    console.log('Questions seeded!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding the database:', err);
    process.exit(1);
  }
});