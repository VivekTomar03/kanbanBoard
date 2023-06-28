const express = require("express");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/user.model");
const { userValidator } = require("../middleware/uservalidation");
const { authenticator } = require("../middleware/authenticator");
const { userLogger } = require("../middleware/userLogger");
const { roleValidator } = require("../middleware/roleValidator");
const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  try {
    let data = await UserModel.find();
    res.send(data);
  } catch (error) {
    res.send({
      message: "Users data not found",
    });
  }
});

userRouter.get("/:id", async (req, res) => {
  let { id } = req.params;
  try {
    let data = await UserModel.find({ _id: id });
    // console.log(data);
    if (data.length > 0) {
      res.send({
        message: "User available",
        user: data[0],
      });
    } else {
      res.send({
        message: "User not found",
      });  
    }
  } catch (error) {
    res.send({
      message: "User not found",
    });
  } 
});
 
userRouter.post("/register", userValidator, async (req, res) => {
  try {
    let user = await new UserModel(req.body);
    user.save();
    res.send({
      message: "User register successfully",
    });
  } catch (error) {
    res.send(error);
  }
});

userRouter.post("/login",  async (req, res) => {
  let token = jwt.sign(req.body, "vivek");
  try {
    let data = await UserModel.find(req.body);
    res.send({
      message: "Login Successfull",
      username: data[0].username,
      role: data[0].role,
      token: token,
    });
  } catch (error) {
    res.send({
      message: error.message,
      adminsay: "your username or password are wrong",
    });
  }
});

userRouter.patch("/update/:id", roleValidator, async (req, res) => {
  let { id } = req.params;
  try {
    await UserModel.findByIdAndUpdate({ _id: id }, req.body);
    res.send({
      message: "Data updated",
    });
  } catch (error) {
    res.send(error);
  }
});

userRouter.delete("/delete/:id", roleValidator, async (req, res) => {
  let { id } = req.params;
  try {
    await UserModel.findByIdAndDelete({ _id: id });
    res.send({
      message: "Data has been deleted succesfully",
    });
  } catch (error) {
    res.send(error);
  }
});

module.exports = { userRouter };
