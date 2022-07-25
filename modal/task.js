const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Task = new Schema({
    clientName: { type: Schema.Types.ObjectId, ref: 'User'},
    dueDate: {
        type: Date, default: Date.now
    },
    notes: {
        type: String,
        require: true
    },
    emailNotes: {
        type: String,
        require: true
    },
    createdBy: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    task: {
        type: String,
        require: true
    },
    project: {
        type: String,
        require: true
    },
    status: {
        type: String,
        enum: [
            'pending', 'completed', 'In work'
        ],
        default: 'pending'
    },
    assignee: {
        type: Schema.Types.ObjectId, ref: 'User'
    },

    taskType:{
        type:String,
        require:true
    },
    priority:{
        type:String,
        enum:['important','High','Low'],
        default:'important'

    },
    sendMail:{
        type:Boolean,
    }
}, { collection: 'Task' });

module.exports = mongoose.model('Task', Task);