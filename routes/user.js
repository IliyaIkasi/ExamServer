const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { User, validate } = require('../models/users');
const bcrypt = require('bcrypt');

router.get('/', async(req, res) => {
    // const user = await User.find(req.user.id).select('-password');
    // res.send(user);
});

router.post('/', async (req, res) => {
    const { name, username, email, password } = req.body;
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).json({ message: error.details });

        let user = await User.findOne({ 
            email: email 
        });
        if (user) return res.status(400).send('User Already Exists...');

        user = new User({
            name: name,
            username: username,
            email: email,
            password: password
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        user = await user.save();
        console.log("Successful...");
        return res.status(200).json({ user});

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something Went Wrong...",
        });
    }
});

module.exports = router;