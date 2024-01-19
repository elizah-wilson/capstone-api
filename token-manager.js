require('dotenv').config()
const jwt = require('jsonwebtoken')

function generateAccessToken(userId) {
   return jwt.sign(userId, process.env.TOKEN_SECRET, {}) 
}

// middleware function to use on all endpts except login (which will create token) so that only authorized users can do things in the app
function authenticateToken(req, res, next) {
    const token = req.get('Authorization')
    if(token === null) {
        return res.status(401)
    }
    jwt.verify(token, process.env.TOKEN_SECRET, (error, user) => {
        if(error) {
            return res.sendStatus(405)
        }
        //as a middleware func, if the token is valid, it will take the userid out of the token and assign the user(id) from the token to the req user (which is empty by default) --> allows us to user req.user instead of req.body.userid
        req.user = user
        next()
    })
}

module.exports = {
    generateAccessToken,
    authenticateToken
}