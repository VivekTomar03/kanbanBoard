const express = require("express")
const { connection } = require("./config/db")
const { userRouter } = require("./routes/user.route")
const { userLogger } = require("./middleware/userLogger")
var cors = require('cors')
const { authenticator } = require("./middleware/authenticator")
const { productRouter } = require("./routes/products.route")
const app = express()
app.use(cors())
app.use(express.json())
app.use("/product" , productRouter)
app.use(authenticator)
app.use(userLogger)
app.use("/user" , userRouter)

app.listen(8080, async()=> {
     try {
        await connection 
        console.log("database connected");

     } catch (error) {
        console.log(error)
     }
     console.log("server started on port 8080")
})