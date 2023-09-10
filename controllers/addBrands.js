/* eslint-disable prettier/prettier */
const Joi = require('joi');
const express = require('express');
const pool = require('../dbConnection');

const router = express.Router();

router.post('/', (req, res) => {
    if (!(req.role === '1')) {
        res.status(403).send('Forbidden');
        return;
    }

    const schema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string(),
        logo: Joi.string(),
        url: Joi.string(),
    });
    const validation = schema.validate(req.body);
    const {
 title, description, logo, url,
} = req.body;
console.log(req.body);

    if (validation.error) {
        res.status(400).send('Invalid inputs');
        return;
    }

    pool.query(
      'insert into brands(title, description, logo, url) values($1, $2, $3, $4) RETURNING *',
      [title, description, logo, url],
      (error, results) => {
        if (error) throw error;

        res
          .status(200)
          .send(
            `Successfully added ${results.rows[0].title} to the brand list!`,
          );
      },
    );
});

module.exports = router;
