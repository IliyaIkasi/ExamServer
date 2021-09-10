const { string } = require('joi');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema ({
    subjectId: {
        type: String,
        required: true
    },
    description: String,
        A: {
            type: String,
            required: true
        },
        B: {
            type: String,
            required: true
        },
        C: {
            type: String,
            required: true
        },
        D: {
            type: String,
            required: true
        },
        isCorrect: {
            type: String,
            required: true,
            default: false
        }
});

function validateQuestion(questions) {
    const schema = Joi.object({
        subjectId: Joi.objectId().required(),
        description: Joi.string().required(),
        A: Joi.string().required(),
        B: Joi.string().required(),
        C: Joi.string().required(),
        D: Joi.string().required(),
        isCorrect: Joi.string().required()
    });

    return schema.validate(questions);

}

const Question = mongoose.model('Question', QuestionSchema);

exports.validate = validateQuestion;
exports.Question = Question;