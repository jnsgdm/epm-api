require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());

const UserController = require('./controllers/UserController.js');
app.use('/users',(UserController));

const ProjectController = require('./controllers/ProjectCrontoller.js');
app.use('/projects',(ProjectController));

mongoose.connect(process.env.MONGO_URL).then(()=>{
    app.listen(process.env.PORT || 8080,(err)=>{
        if(err){
            return console.log(err);
        }
        console.log("*DATABASE connect and SERVER running*\nlocal url: http://localhost:8080/");
    })
}).catch(err => {
    console.log(err);
});