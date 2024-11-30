
const mongoose = require('mongoose');


const UserRegSchema = new mongoose.Schema({


    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 10
        },
        lastname: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 10
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },
    socketId: {
        type: String,
    }
})

module.exports = mongoose.model('UserReg', UserRegSchema);