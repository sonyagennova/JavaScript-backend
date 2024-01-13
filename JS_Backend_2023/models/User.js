const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    email: {
        type: String,
        minLength: 10,
        required: [true, 'Email is required.'],
    },
    password: {
        type: String,
        minLength: 4,
        required: [true, 'Password is required.'],
    }
}, 
// {
//     virtuals: {
//         repeatPassword: {
//             set(value) {
//                 if (this.password !== value) {
//                     throw new mongoose.Error('Passwords are not the same!');
//                 }
//             }
//         }
//     }

//     }
    );

const User = mongoose.model('User', userSchema);

module.exports = User;