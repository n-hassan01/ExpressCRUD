/* eslint-disable prettier/prettier */
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../dbConnection');

const router = express.Router();

router.post('/', (req, res) => {
    pool.query(
        'SELECT * FROM signup WHERE username = $1',
        [req.body.username],
        async (error, result) => {
            try {
                if (error) throw error;

                if (result.rowCount > 0) {
                    // eslint-disable-next-line max-len
                    const isValidPassword = await bcrypt.compare(
                        req.body.password,
                        result.rows[0].password,
                    );
                    if (isValidPassword) {
                        const token = jwt.sign(
                            {
                                username: result.rows[0].username,
                                role: result.rows[0].role,
                            },
                            process.env.SECRET_KEY,
                            {
                                expiresIn: '1d',
                            },
                        );

                        res.status(200).json({
                            value: token,
                            message: 'Login successful',
                        });
                    } else {
                        res.status(401).send('Authentication failed!');
                    }
                }
            } catch (err) {
                console.log(err.message);

                res.status(401).send('Authentication failed!');
            }
        },
    );
});

module.exports = router;
