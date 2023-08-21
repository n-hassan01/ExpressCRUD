require('dotenv').config();
const express = require('express');
const cors = require('cors');
const getUsersRouter = require('./controllers/getUsers');
const addUsersRouter = require('./controllers/addUser');
const deleteUsersRouter = require('./controllers/deleteUser');
const updateUsersRouter = require('./controllers/updateUser');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/', getUsersRouter);
app.use('/add', addUsersRouter);
app.use('/delete', deleteUsersRouter);
app.use('/update', updateUsersRouter);

// error handling middleware
app.use((req, res, next) => {
    next('Requested url not found!');
});

app.use((err, req, res, next) => {
    if (err.message) {
        res.status(500).send(err.message);
        next();
    } else {
        res.status(500).send('Server side error!');
        next();
    }
});

// environment variable
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
