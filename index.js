const express = require('express');
const getUsersRouter = require('./getUsers');
const addUsersRouter = require('./addUser');
const deleteUsersRouter = require('./deleteUser');
const updateUsersRouter = require('./updateUser');

const app = express();

app.use(express.json());

app.use('/', getUsersRouter);
app.use('/add', addUsersRouter);
app.use('/delete', deleteUsersRouter);
app.use('/update', updateUsersRouter);

// environment variable
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
