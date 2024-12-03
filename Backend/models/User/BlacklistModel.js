const mongoose = require('mongoose');

const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    created_at: {
        type: Date,
        default: Date.now,
        expires:86400 //24hrs
    }
})

module.exports = mongoose.model('BlacklistToken', blacklistTokenSchema);