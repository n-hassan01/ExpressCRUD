require('dotenv').config();
const express = require('express');
const cors = require('cors');
const getUsersRouter = require('./controllers/getUsers');
const addUsersRouter = require('./controllers/addUser');
const deleteUsersRouter = require('./controllers/deleteUser');
const updateUsersRouter = require('./controllers/updateUser');
const loginRouter = require('./controllers/loginService');
const checkLogin = require('./middlewares/authGuard');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/login', loginRouter);
app.use('/users', checkLogin, getUsersRouter);
app.use('/users/add', checkLogin, addUsersRouter);
app.use('/users/delete', checkLogin, deleteUsersRouter);
app.use('/users/update', checkLogin, updateUsersRouter);

// error handling middleware
app.use((req, res, next) => {
    next('Requested url not found!');
});

// app.use((err, req, res, next) => {
//     if (err.message) {
//         res.send(err.message);
//         next();
//     } else {
//         res.send('Server side error!');
//         next();
//     }
// });

// environment variable
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
