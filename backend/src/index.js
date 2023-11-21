const express = require('express'); 
const app = express(); 
const mongoose = require('mongoose'); 
const env = require('./utils/env');
const UserRouter = require('./router/user');
const TableRouter = require('./router/table');
const cors = require('cors');

app.use(cors());
app.use(express.json()); 
//all routes related to user login or register
app.use('/api/user', UserRouter); 
//if user has validated his token then he can view the table
app.use('/api/table', TableRouter);

app.listen(env.port, () => { 
    mongoose.connect(env.mongoosestr)
    .then(() => {
        console.log('mongoose connected');
    })
    .catch((e) => {
        console.log('error occured while connecting to database'); 
        console.log(e);
    })
    console.log('working on port 8000')
})