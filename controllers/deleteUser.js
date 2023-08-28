/* eslint-disable prettier/prettier */
const express = require('express');
const pool = require('../dbConnection');

const router = express.Router();

router.delete('/:id', (req, res) => {
    if (!(req.role === '1')) {
        res.status(403).send('Forbidden');
        return;
    }

    pool.query(`delete from employee where id = ${req.params.id}`, (error) => {
        if (error) throw error;

        res.send('Successfully remove the employee from the employee list!');
    });
});

module.exports = router;
