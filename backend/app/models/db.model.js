const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const db = new Schema({
    id: Number,
    area: Number,
    name: String,
    Device: [{
        id: Number,
        name: String,
        category: Number,
        status: Number,
        Schedule: [{
            id: ObjectId,
            timeStart: Date,
            timeEnd: Date,
            status: Number
        }]
    }],
    Data: [{
        id: Number,
        category: Number,
        value: Number,
        time: Date
    }],
    User: [{
        id: Number,
        account: String,
        password: String,
        role: String
    }]
});

module.exports = mongoose.model('Garden', db);