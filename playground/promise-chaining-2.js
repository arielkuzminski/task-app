import '../src/db/mongoose.js';
import { Task } from '../src/models/task.js';

// 6151f0e93476d3193875fb17

// Task.findByIdAndDelete('6151ec6510189b23f8bfb00c').then((removedTask) => {
//     console.log(removedTask);
//     return Task.countDocuments({'completed' : 'false'});
// }).then((uncompletedTasksCount) => {
//     console.log(uncompletedTasksCount);
// }).catch((error) => {
//     console.log(error);
// });

const deleteTaskAndCount = async (id) => {
    await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({completed: false});
    return count;
};

deleteTaskAndCount('6151ddab5fda4441b497ffe4').then((count) => {
    console.log(count);
}).catch((e) => {
    console.log(e);
});

