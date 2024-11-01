const express = require('express')
const app = express()
const cors = require("cors")
const weather = require("./routes/weatherFetch")

app.use(cors())
app.use(express.json())

app.use('/', weather)

app.listen(5003, () => {
    console.log("Server has started on port 5003")
})