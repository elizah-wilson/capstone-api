const express = require('express')
const port = (3000)
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
const queries = require('./queries.js')
const fetch = require('./scripts/script.js')
const awsFunctions = require('./scripts/aws.js')
const tokenManager = require('./token-manager.js')

app.use(cors()) 
app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.send("alive")
})

app.post("/login", queries.login)

app.get("/daily-quote", async (req, res) => {
    const quote = await fetch.getQuote()
    res.send(quote)
})

app.put("/upload", tokenManager.authenticateToken, awsFunctions.putSVG, queries.createPost)
 
// gets information needed for posts from our users and posts dbs
app.get("/get-posts", tokenManager.authenticateToken, queries.getPosts)


app.put("/like-post", tokenManager.authenticateToken, queries.likePost)



app.listen(port, () => {
    console.log(`Express app listening on port ${port}`)
})
