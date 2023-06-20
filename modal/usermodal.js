const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    email:String,
    password:String
}, {
    vsersionKey:false
})

const UserModal = mongoose.model("/user" , userSchema)
module.exports = {
    UserModal
}