const { ServerMessage, Status } = require('../utils/Constant');
const User = require('../schema/user');
const env = require('../utils/env');
const jwt = require('jsonwebtoken');

module.exports.userRegister = async (req, res) => {
    try {
        let { username, password, date, email } = req.body; 
        if (!username || !password || !email || !date) return res.status(Status.BAD_REQUEST).json('Username or Password is missing');
        let user = await User.findOne({ username: username });
        if (user) return res.status(Status.BAD_REQUEST).json('This username already exists');
        user = await User.findOne({ email: email }); 
        if (user) return res.status(Status.BAD_REQUEST).json('This email already exists');
        user = await (new User({
            username: username, 
            password: password,
            date: date, 
            email: email
        })).save();
        return res.status(Status.STATUS_ACCEPTED).send(user);
    } catch(e) {
        console.log(e);
        return res.status(Status.SERVER_ERROR).json(ServerMessage.SERVER_ERROR);
    }
}

module.exports.userLogin = async(req, res) => {
    try {
        let { username, password } = req.body; 
        if (!username || !password) return res.status(Status.BAD_REQUEST).json('Username or Password is missing');
        let user = await User.findOne({ username: username });
        if (!user || user.password != password) return res.status(Status.FORBIDDEN).json('Incorrect username or password');
        let token = jwt.sign({ username: username, password: password }, env.jwtString); 
        return res.status(Status.STATUS_ACCEPTED).json(token);
    } catch (e) {
        console.log(e);
        return res.status(Status.SERVER_ERROR).json(ServerMessage.SERVER_ERROR);
    }
}