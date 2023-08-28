/* eslint-disable prettier/prettier */
const express = require('express');
const pool = require('../dbConnection');

const router = express.Router();

router.put('/:id', (req, res) => {
    if (!(req.role === '1')) {
        res.status(403).send('Forbidden');
        return;
    }

    const id = parseInt(req.params.id, 10);
    const { name, designation } = req.body;

    if (name && !designation) {
        pool.query('UPDATE employee SET name = $1 WHERE id = $2', [name, id], (error) => {
            try {
                if (error) throw error;

                res.send('Successfully updated the information of the employee!');
            // eslint-disable-next-line no-shadow
            } catch (error) {
                console.log(error.message);
                res.status(500).send(error.message);
            }
        });
    } else if (designation && !name) {
        pool.query('UPDATE employee SET designation = $1 WHERE id = $2', [designation, id], (error) => {
            try {
                if (error) throw error;

                res.send('Successfully updated the information of the employee!');
            // eslint-disable-next-line no-shadow
            } catch (error) {
                console.log(error.message);
                res.status(500).send(error.message);
            }
        });
    } else if (name && designation) {
        pool.query('UPDATE employee SET name = $1, designation = $2 WHERE id = $3', [name, designation, id], (error) => {
            try {
                if (error) throw error;

                res.send('Successfully updated the information of the employee!');
            // eslint-disable-next-line no-shadow
            } catch (error) {
                console.log(error.message);
                res.status(500).send(error.message);
            }
        });
    }
});

module.exports = router;
