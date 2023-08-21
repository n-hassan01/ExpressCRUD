/* eslint-disable prettier/prettier */
const Joi = require('joi');
const express = require('express');
const pool = require('../dbConnection');

const router = express.Router();

router.post('/', (req, res) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        designation: Joi.string(),
    });
    const { name, designation } = req.body;
    const validation = schema.validate(req.body);

    if (validation.error) {
        res.status(400).send('Invalid inputs');
        return;
    }

    pool.query('insert into employee(name, designation) values($1, $2) RETURNING *', [name, designation], (error, results) => {
        if (error) throw error;

        res.status(200).send(`Successfully added ${results.rows[0].name} to the employee list!`);
    });
});

module.exports = router;
