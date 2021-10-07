const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const router = express.Router();
const { User, validate } = require('../models/users');
const bcrypt = require('bcrypt');
const { assert, string } = require('joi');

router.get('/', async (req, res) => {
    // const user = await User.find(req.user.id).select('-password');
    // res.send(user);
});

router.post('/login', async (req, res) => {
    const { username, email, password } = req.body;
    const { error } = validation(req.body);
    if (error) return res.status(400).json({ error: error.message });

    const userByEmail = await User.findOne({ email });
    const userByUserName = await User.findOne({ username });

    if (!userByEmail || !userByUserName) return res.status(400).json({ error: error.message });

    const validPassword = await bcrypt.compare(password, userByEmail.password);
    if (!validPassword) return res.status(400).json({ error: error.message });

    const token = userByEmail.generateAuthToken();
    res.json({
        token,
        message: "Welcome..."
    });


});

router.post('/signup', async (req, res) => {
    // fetching user data
    const { name, username, email, password } = req.body;

    // validating user form data
    const { error } = validate(req.body);

    // checking if a field validation is wrong then throw error
    if (error) return res.status(400).json({ message: error.details });

    // fetching records by username and email
    const userByEmail = await User.findOne({ email })
    const B = await User.findOne({ username })

    // if it is false throw an exception
    if (userByEmail) return res.status(400).json({ error: "Email already registered" })
    if (B) return res.status(400).json({ error: "UserName already registered" })

    // hashing the password
    const hashedPassword = await bcrypt.hash(password, 10)

    const responseBody = {
        name,
        username,
        email,
        password: hashedPassword
    }

    let user = new User(responseBody)
    try {
        user = await user.save()
        const token = user.generateAuthToken()
        return res.status(200).json({ token })
    } catch (err) {
        res.status(400).json({ error: "Something went wrong" })
        console.trace(err.message)
    }
});


function validation(req) {
    const schema = Joi.object({
        username: Joi.string().min(3).max(15),
        email: Joi.string().min(5).max(255).required().email().lowercase(),
        password: Joi.string().min(5).max(50).required(),
    });

    return schema.validate(req);
}


module.exports = router;