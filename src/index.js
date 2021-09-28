import express from 'express';
import './db/mongoose.js';
import { User } from "./models/user.js";
import { Task } from "./models/task.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get('/users', async (req, res) => {
    try {
        const myUsers = await User.find({});
        res.send(myUsers);
    } catch (e) {
        res.status(500).send();
    };
});

app.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            res.status(404).send();
        }
        res.send(user);
    } catch (e) {
        res.status(500).send();
    }
});

app.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!user) {
            res.status(404).send();
        }
        res.send(user);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

app.post('/tasks', async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    try {
        res.status(201).send(task);
    } catch (e) {
        res.status(400).send(error.message);
    }
});

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.send(tasks);
    } catch (e) {
        res.status(500).send();
    }
})

app.get('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            res.status(404).send();
        }
        res.send(task);
    } catch (e) {
        res.status(500).send();
    }
})

app.patch('/tasks/:id', async (req, res) => {

    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send('error: Invalid updates!');
    }

    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

app.listen(port, () => {
    console.log('Server is up on port: ' + port);
});