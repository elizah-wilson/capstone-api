// imports
require('dotenv').config()
const Pool = require('pg').Pool
const tokenManager = require('./token-manager.js')

const pool = new Pool({     
    user: process.env.USER, 
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.DATABASE,
    post: 5432
})

function currentDate() {
    const current = new Date();
    const date = `${current.getMonth() + 1}-${current.getDate()}-${current.getFullYear()}`;
    return date
  }

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

async function createPost(req, res) {
    const userid = req.user
    const response = req.body.response 
    const prompt = req.body.prompt
    const page = `${process.env.BASEURL}/${currentDate()}/${userid}.svg`
    const date = currentDate()
    
    await pool.query('INSERT INTO posts (userid, page, prompt, response, date) VALUES ($1, $2, $3, $4, $5)', [userid, page, prompt, response, date], (error, results) => {
        if(error) {
            throw error
        }
        res.status(201).send('post was added to posts table')
    })    

}

// get username from users table, which is related to posts table using userid foreign key
async function getPosts(req, res) {
    pool.query('SELECT posts.prompt, posts.response, posts.page, posts.likes, posts.date, users.username FROM posts LEFT JOIN users ON posts.userid = users.userid WHERE posts.date = $1', [currentDate()], (error, results) => {
        if(error) {
            throw error
        }
        res.status(200).send(results.rows)
    })
}

async function likePost(req, res) {
    const postId = req.params.postid
    
}

module.exports = {
    login,
    createPost, 
    getPosts,
    likePost
}