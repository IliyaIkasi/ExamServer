const mongoose = require('mongoose');
const { Question, validate } = require('../models/questions');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const question = await Question.find();
        return res.status(200).json({
            message: "Successful...",
            questions: question
        })
    } catch (error) {
        return res.status(500).json({
            "message": error
        });
    }
    // get all questions available in the database.
});

router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const allQuestions = await Question.find({ subjectId: id });
        if (!allQuestions) return res.status(404).json({
            message: "not found"
        })
        return res.status(200).json({
            questions: allQuestions
        });
    } catch (error) {
        return res.status(500).json({error: "Something went wrong"})
    }
    // gets the subject id and displays all questions relating to the id.
});

router.post('/', async (req, res) => {
    const { subjectId, description, A, B, C, D, isCorrect } = req.body;
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });
        let question = new Question({
            subjectId: subjectId,
            description: description,
            A: A,
            B: B,
            C: C,
            D: D,
            isCorrect: isCorrect
        });
        question = await question.save();

        return res.status(200).send(question);

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message: "Something Went Wrong...",
        });
    }
    // post adds questions into a specific subject using the subjectId.
});

router.put('/:id', async (req, res) => {
    const _id = req.params.id
    const { subjectId, description, A, B, C, D, isCorrect } = req.body;
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        let question = await Question.findOne({ _id });
        if (!question) {
            return res.status(400).send('Invalid Question...');
        } else {
            question.subjectId = subjectId;
            question.description = description;
            question.A = A;
            question.B = B;
            question.C = C;
            question.D = D;
            question.isCorrect = isCorrect;
        }
        const save = await question.save()
        return res.status(200).json({
            message: "Updated Successfully...",
            save
        });
    } catch (error) {
        console.log(error),
            res.status(500).json({
                message: "Something Went Wrong..."
            })
    }
    // updates a question using the questionId.
});

router.delete('/:id', async (req, res) => {
    try {
        const _id = req.params.body;
        const question = await Question.findByIdAndDelete(_id);

        if (!question) {
            console.log(_id);
            return res.status(400).json({ question, message: "Question Not Found..." });
        } else {
            return res.status(200).json({
                message: "Deleted Successfully...",
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something Went Wrong..."
        })
    }
    // deletes a question using the questionId.
});

router.get('/', async (req, res) => {
    res.send('Hello World...');
    // default page incase of bad routing or wrong routing.
});


module.exports = router;