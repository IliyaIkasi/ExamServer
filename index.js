const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const question = require('./routes/question');
const subject = require('./routes/subject');

app.use(cors());
app.use(express.json());
app.use('/questions', question);
app.use('/subjects', subject);


mongoose.connect('mongodb://localhost/Exams')
    .then(() => console.log('Connected to Mongodb...'))
    .catch(err => console.error('Could Not Connect to MongoDB', err));


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on Port ${port}...`));