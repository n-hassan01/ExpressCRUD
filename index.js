const express = require('express');
const app = express();

let users = [
    {
        "id": 1,
        "name": "Niloy",
        "phone": "01521888"
    },
    {
        "id": 2,
        "name": "Antora",
        "phone": "01513677"
    },
    {
        "id": 3,
        "name": "Rakib",
        "phone": "017223899"
    }
]
app.get('/remark/api/users', (req, res) => {
    res.send(users);
});

// environment variable
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));