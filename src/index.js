import express from 'express';
import './db/mongoose.js';
import {User} from "./models/user.js";
import {Task} from "./models/task.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/users', (req, res) => {
    const user = new User(req.body);
    user.save().then(() => {
        res.status(201).send(user);
    }).catch((error) => {
        res.status(400).send(error);
    });
});

app.get('/users', (req, res) => {
    User.find({}).then((myUsers) => {
        res.send(myUsers);
    }).catch((error) => {
        res.status(500).send();
    });
});

app.get('/users/:id', (req, res) => {
    User.findById(req.params.id).then((user) => {
        if(!user) {
            res.status(404).send();
        }
        res.send(user);
    }).catch(() => {
        res.status(500).send();
    });
});

app.post('/tasks', (req, res) => {
    const task = new Task(req.body);
    task.save().then(() => {
        res.status(201).send(task);
    }).catch((error) => {
        res.status(400).send(error.message);
    })
});

app.get('/tasks', (req, res) => {
    Task.find({}).then((tasks) => {
        res.send(tasks);
    }).catch((error) => {
        res.status(500).send();
    });
})

app.get('/tasks/:id', (req, res) => {
    Task.findById(req.params.id).then((task) => {
        if (!task) {
            res.status(404).send();
        }
        res.send(task);
    }).catch((error) => {
        res.status(500).send();
    });
})

app.listen(port, () => {
    console.log('Server is up on port: ' + port);
});