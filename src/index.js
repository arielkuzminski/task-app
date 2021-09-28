import express from 'express';
import './db/mongoose.js';
import userRouter from './routers/user.js';
import taskRouter from './routers/task.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
    console.log('Server is up on port: ' + port);
});


// const myFunction = async () => {
//     const password = 'Red12345!';
//     const hashedPassword = await bcrypt.hash(password, 8);

//     console.log(password);
//     console.log(hashedPassword);

//     const isMatch = await bcrypt.compare(password, hashedPassword);
//     console.log(isMatch);
// };

// myFunction();