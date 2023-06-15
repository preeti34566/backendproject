import express from 'express';
import Test from '../model/Test.js';

const router = express.Router();

router.post('/saveTests', async (req, res) => {
  try {
    const tests = [
      {
        testId: 'test1',
        questions: [
          {
            questionId: '60c9671d4569b6390cc8b24a', // Replace with the correct ObjectId for question1
            response: ['Answer 1', 'Answer 2']
          },
          {
            questionId: '60c9671d4569b6390cc8b24b', // Replace with the correct ObjectId for question2
            response: ['Answer 2']
          }
        ]
      },
      {
        testId: 'test2',
        questions: [
          {
            questionId: '60c9671d4569b6390cc8b24c', // Replace with the correct ObjectId for question1
            response: ['Answer 3', 'Answer 4']
          },
          {
            questionId: '60c9671d4569b6390cc8b24d', // Replace with the correct ObjectId for question2
            response: ['Answer 5']
          }
        ]
      },
      {
        testId: 'test3',
        questions: [
          {
            questionId: '60c9671d4569b6390cc8b24e', // Replace with the correct ObjectId for question1
            response: ['Answer 6']
          },
          {
            questionId: '60c9671d4569b6390cc8b24f', // Replace with the correct ObjectId for question2
            response: ['Answer 7', 'Answer 8']
          }
        ]
      }
    ];

    for (const test of tests) {
      const newTest = new Test(test);
      await newTest.save();
    }

    console.log('Tests saved successfully');
    res.status(201).json({ success: true, message: 'Successfully saved tests.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

export default router;
