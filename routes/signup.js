import express from 'express';
import User from '../model/user.js';


const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, phone_number } = req.body;

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }

    const user = new User({ name, email, password, phone_number });
    await user.save();
    authToken = jwt.sign({ user: user.email },process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log(authToken); // Log the authentication token
    res.status(201).json({ success: true, message: 'Signed up successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

export default router;
