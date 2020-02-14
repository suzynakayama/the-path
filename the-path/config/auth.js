const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

module.exports = function(req, res, next) {
    //add the header
    let token = req.query.token || req.body.token;
    if (token) {
        jwt.verify(token, SECRET, (err, decoded) => {
            if (err) {
                next(err);
            } else {
                req.user = decoded.user;
                next();
            }
        });
    } else {
        next();
    }
};
