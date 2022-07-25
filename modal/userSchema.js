const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let user = new Schema({
    userName: { type: String, required: [true, "name is required"] },
    email: {
        type: String,
        require: true
    }

}, { collection: 'User' });

module.exports = mongoose.model('User', user);