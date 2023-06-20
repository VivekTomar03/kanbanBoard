const express = require("express")
const cors = require("cors")
const { connection } = require("./config/db")
const { userRouter } = require("./routes/userRoutes")
require("dotenv").config()
const app = express()
const PORT = process.env.PORT || 8080
app.use(cors())
app.use(express.json())

app.use("/" , userRouter)
app.listen(PORT, async()=> {
    try {
        await connection
        console.log("connected to DB")
    } catch (error) {
        console.log(error)
    }
    console.log(PORT, "running")
})