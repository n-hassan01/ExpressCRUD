/* eslint-disable prettier/prettier */
const express = require('express');
const users = require('./userInfo');

const router = express.Router();

router.get('/', (req, res) => {
    console.log(users);
    res.send(users);
});

router.get('/:id', (req, res) => {
    const user = users.find((c) => c.id === parseInt(req.params.id, 10));
    if (!user) res.status(404).send('User not found for the given id');
    res.send(user);
});

module.exports = router;
