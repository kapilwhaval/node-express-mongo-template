var jwt = require('jsonwebtoken');

exports.validateToken = (req, res, next) => {
    const authHeader = req.headers.authorization.split(' ')
    if (authHeader.length === 2) {
        jwt.verify(authHeader[1], process.env.JWT_SECRET, (err, data) => {
            if (err) return res.send(401).send({ message: 'Unauthorized' })
            req.body.user_id = data.user;
            next();
        });
    }
}

exports.generateToken = () => {
    var token = jwt.sign({ user: '134654165651354564' }, process.env.JWT_SECRET);
    return token;
}