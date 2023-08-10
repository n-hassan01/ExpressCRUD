/* eslint-disable prettier/prettier */
const express = require('express');
const pool = require('./dbConnection');

const router = express.Router();

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { name, designation } = req.body;

    if (name && !designation) {
        pool.query('UPDATE employee SET name = $1, WHERE id = $2', [name, id], (error) => {
            if (error) throw error;

            res.send('Successfully updated the information of the employee!');
        });
    } else if (designation && !name) {
        pool.query('UPDATE employee SET designation = $1 WHERE id = $2', [designation, id], (error) => {
            if (error) throw error;

            res.send('Successfully updated the information of the employee!');
        });
    } else if (name && designation) {
        pool.query('UPDATE employee SET name = $1, designation = $2 WHERE id = $3', [name, designation, id], (error) => {
            if (error) throw error;

            res.send('Successfully updated the information of the employee!');
        });
    }
});

module.exports = router;
