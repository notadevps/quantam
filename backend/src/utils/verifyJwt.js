
const { Status } = require('./Constant');
const jwt = require('jsonwebtoken');
const env = require('./env');

const verifyJwt = async (req, res, next) => {
    let { token } = req.body; 
    if (!token) return res.status(Status.BAD_REQUEST).json('Missing token');
    try {
        let user = jwt.decode(token, env.jwtString);
        console.log(user);
        if (!user) {
            return res.status(Status.FORBIDDEN).json('Login again!');
        }
        req.user = user; 
        next(); 
    } catch(e) {
        console.log(e);
        return res.status(Status.FORBIDDEN).json('Login again!');
    }
}

module.exports = verifyJwt;

