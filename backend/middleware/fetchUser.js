const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const fetchUser = (req, res, next) => {
    // Get the User from JWT token and add id to req object
    const token = req.header('auth-token');
    if(!token){
        return res.status(401).send({error: "Please Authenticate using a valid token"});
    }

    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        return res.status(401).send({error: "Please Authenticate using a valid token"});
    }

}
module.exports = fetchUser;