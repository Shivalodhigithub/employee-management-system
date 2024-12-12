const jwt = require('jsonwebtoken')

const sec_key = require('../config/seckey.config')
const verifyUser = (req, res, next) => {
    
    const token = req.cookies.token;
    // console.log(req.cookies.token)
    // console.log(token)
    if (token) {
        jwt.verify(token, sec_key.sec_key, (err, decoded) => {
            if (err) return res.json({ Status: false, Error: 'wrong credentials' })
            req._id = decoded._id;
            req.role = decoded.role;
            next();
        })
    }
    else {
        return res.json({ Status: false, Error: 'Not authenticated!' })
    }

}

module.exports = {
    verifyUser: verifyUser
}