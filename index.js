const express=require('express')
const app=express()
require("./dbConnection")
const bodyParser = require('body-parser')
require('./emailTransporter/transporter')


PORT=3008

app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

//router

var usersRouter = require("./routes/routes");


app.use("/user", usersRouter);

app.listen(PORT,()=>{
    console.log(`your server is runnig on port ${PORT}`);
})