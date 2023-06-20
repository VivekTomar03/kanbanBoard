const express = require("express")
const bcrypt = require('bcrypt');
const { UserModal } = require("../modal/usermodal");
var jwt = require('jsonwebtoken');
const userRouter = express.Router()


userRouter.post("/signup" , async(req,res) => {
    const {email,password} = req.body
    try {
        bcrypt.hash(password, 5, async(err, hash) =>{
            if(err){
                res.send({
                    msg:"something went wrong",
                   
                }) 
            }
            else {
                const user = new UserModal({email, password:hash})
                await user.save()
                res.send("Account Created")
            }
        });
    } catch (error) {
        res.send({
            msg:"something went wrong",
            err:error.message
        })
    }
})

userRouter.post("/login" , async(req, res) => {
    const {email, password} = req.body
    try {
        const data = await UserModal.findOne({email})
        if(data){
            var token = jwt.sign({ owner:data.email }, 'kandan');
            bcrypt.compare(password, data.password, (err, result) =>{
                if(result){
                   res.send({
                    msg:"user login successfully",
                    token,
                   })
                }
                else {
                    res.send({
                        msg:"something went wrong",
                        
                    })  
                }
            });
        }
        else {
            res.send({
                msg:"something went wrong",
               
            })  
        }
    } catch (error) {
        res.send({
            msg:"something went wrong",
            err:error.message
        })
    }
})
module.exports = {
    userRouter
}