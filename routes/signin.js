import jwt from 'jsonwebtoken';
import express from 'express';
import User from '../model/user.js';
import bcrypt from 'bcrypt';
import axios from 'axios';

const signinRouter = express.Router();

let authToken = ''; // Declare a variable to store the authentication token

signinRouter.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      const passwordMatches = await bcrypt.compare(password, user.password);
      const apiResponse = await axios.get('https://api.catboys.com/catboy');

      if (passwordMatches) {
        authToken = jwt.sign({ user: user.email },process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log(authToken); // Log the authentication token
        const message = apiResponse.data.response;
        return res.status(200).json({ success: true, message: message });
      } else {
        const error = apiResponse.data.error;
        return res.status(401).json({ success: false, message: error });
      }
    }
  } catch (error) {
    console.error('An error occurred during login:', error);
    return res.status(500).json({ success: false, message: 'An error occurred during login' });
  }
});

export { signinRouter , authToken };
