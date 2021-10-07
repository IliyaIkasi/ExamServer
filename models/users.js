const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 200
    },
    username: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 200,
        unique: true
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    }
});


userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, 'jwtPrivateKey');
    return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(200).trim().required(),
        username: Joi.string().min(5).max(200).required(),
        email: Joi.string().min(5).max(255).required().email().lowercase(),
        password: Joi.string().min(5).max(50).required(),
    });

    return schema.validate(user);
}



exports.validate = validateUser;
exports.User = User;