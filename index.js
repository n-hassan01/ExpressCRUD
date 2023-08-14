const express = require('express');
const cors = require('cors');
const getUsersRouter = require('./getUsers');
const addUsersRouter = require('./addUser');
const deleteUsersRouter = require('./deleteUser');
const updateUsersRouter = require('./updateUser');

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

app.use((err, req, res) => {
    if (err.message) {
        res.status(500).send(err.message);
    } else {
        res.status(500).send('Server side error!');
    }
});

// environment variable
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
