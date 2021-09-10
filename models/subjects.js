const Joi = require('joi');
const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    subjectName: {
        type: String,
        required: true,
        trim: true,
    }
});

const Subject = mongoose.model('Subject', subjectSchema);

function validateSubject(subject) {
    const schema = Joi.object ({
        subjectName: Joi.string().required()
    });

    return schema.validate(subject);
}

exports.validate = validateSubject;
exports.Subject = Subject;