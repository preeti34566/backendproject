import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';

import welcomeRouter from './routes/welcome.js';
import signupRouter from './routes/signup.js'
import Connection from './database/db.js';
import { signinRouter } from './routes/signin.js'
import phoneRouter from './routes/phone.js'
import testRoute from './routes/testRoute.js'
import saveTest from './routes/saveTest.js';

const app = express();


dotenv.config();

// To handle HTTP POST requests in Express.js version 4 and above, 
// you need to install the middleware module called body-parser.
// body-parser extracts the entire body portion of an incoming request 
//stream and exposes it on req.body.

app.use(bodyParser.json({extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/api', welcomeRouter);
app.use('/api', signupRouter);
app.use('/api', signinRouter);
app.use('/api', phoneRouter);
app.use('/api',testRoute);
app.use('/api',saveTest);
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const PORT = '8000';

Connection(USERNAME, PASSWORD);
 
app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));