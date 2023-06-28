const { UserModel } = require("../model/user.model");


async function authenticator(req, res, next) {
  if (req.path == "/user/login") {
  
    try {
      let data = await UserModel.find(req.body);
      if (data.length > 0) {
        next();
      } else {
        res.send({
          message: "username or password are wrong",
        });
      }
    } catch (error) {
      res.send({
        message: error.message,
      });
    }
  } else {
    next();
  }
}

module.exports = { authenticator };