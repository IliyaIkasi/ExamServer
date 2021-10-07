const jwt = require('jsonwebtoken');
const config = require('config');

function auth (req, res, next) {
    const token = req.headers['exam-token'];
    if (!token)
        return res.status(401).json({error: 'Token not provided'});

    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decoded;
        next();
    } catch(err){
        res.status(400).send("Invalid Token Provided...")
    }
}


module.exports = auth;