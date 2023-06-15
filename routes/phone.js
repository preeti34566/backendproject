import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../model/user.js';
// import { authToken } from './signin.js';
// import secretKey from './secrete.js';
// Now you can use the authToken variable in other files as needed
// console.log(authToken);


const router = express.Router();

const authUser = (req, res, next) => {
  const authToken = req.headers.authorization;
  console.log("hye");
  if (authToken) {
    try {
      const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET);
      req.userEmail = decodedToken.user;
      next();
    } catch (error) {
      return res.status(401).json({ success: false, message: 'Invalid auth token' });
    }
  } else {
    return res.status(401).json({ success: false, message: 'Missing auth token' });
  }
};

router.put('/edit/phonenumber', authUser, async (req, res) => {
  try {
    const { phone_number } = req.body;
    const userEmail = req.userEmail;

    const user = await User.findOne({ email: userEmail });

    if (user) {
      // Update phone number
      user.phone_number = phone_number;
      await user.save();
      return res.status(200).json({ success: true, message: 'Phone number changed successfully' });
    } else {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    console.error('An error occurred during phone number update:', error);
    return res.status(500).json({ success: false, message: 'An error occurred during phone number update' });
  }
});

export default router;
