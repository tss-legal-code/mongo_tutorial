/**
 * TUTORIAL SOURCE
 * Build A REST API With Node.js, Express, & MongoDB - Quick
 * https://www.youtube.com/watch?v=fgTGADljAeg
 * Web Dev Simplified
 */

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.set('strictQuery', true); // suppress deprecation warnings
mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;
db.on('error', (err) => console.error(err));
db.once('open', () => console.log('connected to database'));

// accept json data
app.use(express.json());

const subscriberRouter = require('./routes/subscribers');
app.use('/subscribers', subscriberRouter) // 127.0.0.1:3000/subscribers

app.listen(3000, () => console.log('server started'));
