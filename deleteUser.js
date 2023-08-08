/* eslint-disable prettier/prettier */
const express = require('express');
const users = require('./userInfo');

const router = express.Router();

router.delete('/:id', (req, res) => {
    const user = users.find((c) => c.id === parseInt(req.params.id, 10));
    if (!user) res.status(404).send('User not found for the given id');

    const index = users.indexOf(user);
    users.splice(index, 1);

    res.send(users);
});

module.exports = router;
