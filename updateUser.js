/* eslint-disable prettier/prettier */
const Joi = require('joi');
const express = require('express');
const users = require('./userInfo');

const router = express.Router();

router.put('/:id', (req, res) => {
    const user = users.find((c) => c.id === parseInt(req.params.id, 10));
    if (!user) res.status(404).send('User not found for the given id');

    if (req.body.name) {
        user.name = req.body.name;
    }

    if (req.body.phone) {
        const schema = Joi.object({
            phone: Joi.string().min(11),
        });
        const validation = schema.validate(req.body);

        if (validation.error) {
            res.status(400).send('Invalid inputs');
            return;
        }

        user.phone = req.body.phone;
    }

    res.send(user);
});

module.exports = router;
