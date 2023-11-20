const  { model,  Schema } = require('mongoose');

const user = new Schema({
    username: {
        type: String, 
        required: true
    }, 
    password: {
        type: String, 
        required: true
    }, 
    date: {
        type: String, 
        required: true,
    }, 
    email: {
        type: String, 
        required: true
    }
})

module.exports =  model('user', user);