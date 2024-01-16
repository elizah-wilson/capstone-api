// imports
require('dotenv').config()
const Pool = require('pg').Pool
// const tokenManager = require('./token-manager')

const pool = new Pool({     
    user: process.env.USER, 
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.DATABASE,
    post: 5432
})


// aws cloud that stores the svg for the pages of the day 
// pool query for username, call the fetch function for the prompt of the day, their response to prompt




module.exports = {

}
