/* eslint-disable prettier/prettier */
const express = require('express');

const router = express.Router();

router.delete('/', (req, res) => {
    res.clearCookie(process.env.COOKIE_NAME);
    res.send('Logged out');
});

module.exports = router;
