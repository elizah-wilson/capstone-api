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

// endpoint for daily quote api
app.get("/daily-quote", async (req, res) => {
    const quote = await fetch.getQuote()
    res.send(quote)
})

//endpt for putting objects into s3 bucket
app.put("/upload", tokenManager.authenticateToken, awsFunctions.putSVG)
 

app.get("/get-objects", awsFunctions.getObjects)

app.listen(port, () => {
    console.log(`Express app listening on port ${port}`)
})
