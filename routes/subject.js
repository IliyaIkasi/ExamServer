const auth = require('../middleware/auth');
const { Subject, validate } = require('../models/subjects');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const subjects = await Subject.find().sort('subjectName');
    return res.status(200).json({
        message: "Successful...",
        subjects});
});

router.post('/', auth, async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        let subject = new Subject({ subjectName: req.body.subjectName });
        subject = await subject.save();

        return res.json({
            message: "Uploaded Successfully",
            subject
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something Went Wrong...",
        })
    }
});

router.put('/:id', auth, async (req, res) => {
    const _id = req.params.id;
    const { subjectName } = req.body;

    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const subject = await Subject.findByIdAndUpdate(_id);
        if (!subject) {
            return res.status(404).send('Subject with ID was not found...');
        } else {
            subject.subjectName = subjectName;
        }

        const save = await subject.save()
        res.json({
            messgase: "Updated Successfully...",
            save
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            messgase: 'Something Went Wrong'
        })
    };
});

router.delete('/:id', auth, async (req, res) => {
    try {
        const subject = await Subject.findByIdAndRemove(req.params.id);
    
        if (!subject) {
            return res.status(404).send('Subject with given ID not found...');
        } else {
            return res.status(200).json({
                message: "Deleted Successfully..."
            });
        };    
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message: "Something Went wrong...",
            message: error.message
        })
    }
});

router.get('/:id', async (req, res) => {
    const subject = await Subject.findById(req.params.id);

    if (!subject) {
        return res.status(404).send('Subject with the given ID was ot found...');
    } else {
        return res.json({
            subject
        })
    }
});

module.exports = router;