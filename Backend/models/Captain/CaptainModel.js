
const mongoose = require('mongoose');


const CaptainSchema = new mongoose.Schema({


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
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive',
    },
    vehicle: {
        color: {
            type: String,
            required: true,

        },
        plate: {
            type: String,
            required: true,
            unique: true,
        },
        capacity: {
            type: Number,
            required: true,
            min: [1,'capacity must be atleast 1']
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ['car', 'motorcycle', 'auto']
        }
    },
    location: {
        lat: {
            type:Number,
        },
        log: {
            type: Number,
        }
    }
})

module.exports = mongoose.model('Captain', CaptainSchema);