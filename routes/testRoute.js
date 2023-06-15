import express from 'express';
import mongoose from 'mongoose';
import UserResponse from '../model/UserResponse.js';
import Test from '../model/Test.js';

const router = express.Router();

router.post('/submit-test', async (req, res) => {
  try {
    const { userId, testId, questions } = req.body;

    // Check if the user ID is provided
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required.' });
    }

    // Check if the test ID is provided
    if (!testId) {
      return res.status(400).json({ error: 'Test ID is required.' });
    }

    // Check if the questions are provided
    if (!questions || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ error: 'Questions are required and must be a non-empty array.' });
    }

    // Check if the user has already taken the test
    const existingResponse = await UserResponse.findOne({ userId, testId });
    if (existingResponse) {
      return res.status(409).json({ error: 'User has already taken the test.' });
    }
    console.log("break");
 // Fetch the test document from the database
const test = await Test.findOne({testId});

if (!test) {
  return res.status(404).json({ error: 'Test not found.' });
}

// Rest of the code...


    // Calculate the score based on the correct answers in the test document
    let score = 0;
    questions.forEach((question) => {
      const questionData = test.questions.find((q) => q.questionId.toString() === question.questionId);

      if (questionData) {
        // Check if the user's answer is correct
        const isAnswerCorrect = questionData.correctAnswers.every((correctAnswer) =>
          question.answers.includes(correctAnswer)
        );

        if (isAnswerCorrect) {
          score++;
        }
      }
    });

    // Create a new user response object
    const userResponse = new UserResponse({
      userId,
      testId,
      questions,
    });

    // Save the user response to the database
    await userResponse.save();

    // Return the user ID, test ID, and score in the response
    res.json({
      userId,
      testId,
      score,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

export default router;
