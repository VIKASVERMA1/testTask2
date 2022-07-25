const Task = require("../modal/task")
const User = require('../modal/userSchema')
const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const sendEmail = require("../emailTransporter/transporter")


cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
    secure: process.env.secure
})


exports.taskAssigened = async (req, res) => {
    try {
        const { dueDate, createdBy, clientName, task, status, Assignee, taskType, priority, notes, emailNotes } = req.body;
        const sendMail1 = req.body.sendMail;
        console.log(sendMail1)
        const data = req.file.path;
        let uploadImage = await cloudinary.uploader.upload(data)
        let users = {};
        users.dueDate = dueDate,
            users.createdBy = createdBy,
            users.clientName = clientName,
            users.project = uploadImage.secure_url
        users.task = task,
            users.status = status,
            users.Assignee = Assignee,
            users.taskType = taskType,
            users.priority = priority,
            users.notes = notes,
            users.emailNotes = emailNotes
        let userModel = new Task(users);
        const data1 = await userModel.save();
        const email = await User.findById({ _id: Assignee })
        const userEmail = email.email
        if (sendMail1 == "true") {
            sendEmail(
                userEmail, "registration", "data to send"
            )
        } else {
            console.log("error")
        }
        res.status(200).send("your data has been saved successfully")
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
};


exports.registered = async (req, res) => {
    const userName = req.body.userName;
    const email = req.body.email
    try {
        let users = {};
        users.userName = userName,
            users.email = email
        let userModel = new User(users);
        await userModel.save();
        res.status(200).send("user has been created successfully")

    } catch (error) {
        res.status(400).send({ message: error.message })
    }
};

exports.getdata = async (req, res) => {
    try {
        const data = await Task.find({_id:req.query.id})
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
};

