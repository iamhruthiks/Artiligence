const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const bodyParser = require("body-parser")
const colors = require("colors")
const dotenv = require("dotenv")
const connectDB = require("./config/db")


// dotenv
dotenv.config()

// mongo DB
connectDB()

// rest obj
const app = express()

// middleware
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'))

const PORT = process.env.PORT || 3000
//listen server
app.listen(PORT, () => {
    console.log(`server running in ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white)
})