/* eslint-disable prettier/prettier */
const Joi = require('joi');
const express = require('express');
const users = require('./userInfo');

const router = express.Router();

router.post('/', (req, res) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        phone: Joi.string().min(11),
    });
    const validation = schema.validate(req.body);

    if (validation.error) {
        res.status(400).send('Invalid inputs');
        return;
    }

    const user = {
        id: users.length + 1,
        name: req.body.name,
        phone: req.body.phone,
    };
    users.push(user);

    res.send(users);
});

module.exports = router;
