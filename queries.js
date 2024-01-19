// imports
require('dotenv').config()
const Pool = require('pg').Pool
const tokenManager = require('./token-manager')

const pool = new Pool({     
    user: process.env.USER, 
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.DATABASE,
    post: 5432
})


// aws cloud that stores the svg for the pages of the day 
// pool query for username, call the fetch function for the prompt of the day, their response to prompt

async function login(req, res) {
    const email = req.body.email
    const password = req.body.password

    await pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password], (error, results) => {
        if (error) {
            throw error
        }
        const token = tokenManager.generateAccessToken(results.rows[0].userid)
        res.status(200).json(token)

    })
}

module.exports = {
    login
}