const express = require("express");
const mongoose = require("mongoose");
// const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
// const fs = require('fs');
// const path = require('path');
const dotenv = require('dotenv');
dotenv.config();


//middlewares
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true, 
    limit: '100mb'
}));

app.use(cors());

// const userLogs = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})


// app.use(morgan("combined", { stream: userLogs }))

// app.get('/', (req, res)=>{
//     res.send("Connected successfully");
// });

const userRouter = require('./routers/userRouter.js');

app.use('/user', userRouter)

mongoose.connect('mongodb://127.0.0.1:27017/new').then(()=>{
    console.log("mongodb connected successfully")
}).catch((err)=>{
    console.log(`${err}`)

})

const PORT = 6222;
    //connection string
    app.listen(PORT, ()=>{
        console.log(`Server is running on ${PORT}`)
    })









