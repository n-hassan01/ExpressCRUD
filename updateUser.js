/* eslint-disable prettier/prettier */
const Joi = require('joi');
const express = require('express');
const pool = require('./dbConnection');

const router = express.Router();

router.put('/:id', (req, res) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        designation: Joi.string(),
    });
    const id = parseInt(req.params.id, 10);
    const { name, designation } = req.body;
    const validation = schema.validate(req.body);

    if (validation.error) {
        res.status(400).send('Invalid inputs');
    }

    pool.query('UPDATE employee SET name = $1, designation = $2 WHERE id = $3', [name, designation, id], (error) => {
        if (error) throw error;

        res.send('Successfully updated the information of the employee!');
    });
});

module.exports = router;
