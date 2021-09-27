import './../src/db/mongoose.js';
import { User } from './../src/models/user.js';

// 6151e9b3a5207e485c06b749

// User.findByIdAndUpdate('6151e9b3a5207e485c06b749', { age: 1}).then((myUser) => {
//     console.log(myUser);
//     return User.countDocuments({age: 1});
// }).then((countedUsers) => {
//     console.log(countedUsers)
// }).catch((error) => {
//     console.log(error);
// });

const updateAgeAndUpdate = async (id, age) => {
    await User.findByIdAndUpdate(id, {age});
    const count = await User.countDocuments({age});
    return count;
};

updateAgeAndUpdate('6151e9b2a5207e485c06b747', 1).then((count) => {
    console.log(count);
}).catch((e) => {
    console.log(e);
});

