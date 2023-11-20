class Status {
    static STATUS_ACCEPTED = 200;
    static SERVER_ERROR = 500;
    static BAD_REQUEST = 400;
    static UNAUTHORISED = 401;
    static REDIRECTION = 301;
    static FORBIDDEN = 403;
};

class ServerMessage {
    static SERVER_ERROR = "Internal Server Error";
    static FORBIDDEN = "Forbidden!";
};


module.exports = { Status, ServerMessage };