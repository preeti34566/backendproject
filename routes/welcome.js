import express from 'express';

const router = express.Router();

router.get('/welcome', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API successfully called'
  });
});

export default router;
