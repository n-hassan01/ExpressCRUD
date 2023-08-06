const express = require('express');
const app = express();

app.use(express.json())

let users = [
    {
        id: 1,
        name: "Niloy",
        phone: "01521888"
    },
    {
        id: 2,
        name: "Antora",
        phone: "01513677"
    },
    {
        id: 3,
        name: "Rakib",
        phone: "017223899"
    }
]

app.get('/remark/api/users', (req, res) => {
    res.send(users);
});

app.get('/remark/api/user/:id', (req, res) => {
    const user = users.find(c => c.id === parseInt(req.params.id));
    if(!user) res.status(404).send('User not found for the given id');
    res.send(user);
});

app.post('/remark/api/user/add', (req, res) => {
    const user = {
        id: users.length + 1,
        name: req.body.name,
        phone: req.body.phone
    };
    users.push(user);

    res.send(user);
});

// environment variable
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));