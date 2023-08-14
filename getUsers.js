/* eslint-disable prettier/prettier */
const express = require('express');
const pool = require('./dbConnection');

const router = express.Router();

router.get('/', (req, res) => {
    pool.query('SELECT * FROM employee ORDER BY id ASC;', (error, results) => {
        if (error) throw error;

        res.status(200).json(results.rows);
    });
});

router.get('/:id', (req, res) => {
    pool.query(`Select * from employee where id = ${req.params.id};`, (error, results) => {
        if (error) throw error;

        res.status(200).json(results.rows);
    });
});

module.exports = router;
