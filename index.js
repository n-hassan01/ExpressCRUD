const Joi = require('joi');
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
    const schema = Joi.object({
        name: Joi.string().required(),
        phone: Joi.string().min(11)
    });
    const validation = schema.validate(req.body);

    if(validation.error) {
        res.status(400).send("Invalid inputs");
        return;
    }

    const user = {
        id: users.length + 1,
        name: req.body.name,
        phone: req.body.phone
    };
    users.push(user);

    res.send(user);
});

app.delete('/remark/api/user/delete/:id', (req, res) => {
    const user = users.find(c => c.id === parseInt(req.params.id));
    if(!user) res.status(404).send('User not found for the given id');

    const index = users.indexOf(user);
    users.splice(index, 1);

    res.send(users);
});

app.put('/remark/api/user/update/:id', (req, res) => {
    const schema = Joi.object({
        phone: Joi.string().min(11)
    });
    const validation = schema.validate(req.body);

    if(validation.error) {
        res.status(400).send("Invalid inputs");
        return;
    }

    const user = users.find(c => c.id === parseInt(req.params.id));
    if(!user) res.status(404).send('User not found for the given id');

    if(req.body.name) {
        user.name = req.body.name;
    }

    if(req.body.phone) {
        user.phone = req.body.phone;
    }

    res.send(user);
});

// environment variable
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));