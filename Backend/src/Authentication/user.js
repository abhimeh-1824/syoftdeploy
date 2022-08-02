const UsersData = require("../models/users.model");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const registration = async (req, res) => {
    console.log("alert")
  const { username,phone,email, password, conforme_password,role} = req.body
  console.log(req.body)

  if (username && phone && email && password && conforme_password && role) {
    const user = await UsersData.findOne({ email: email }).lean().exec();
    if (user) {
      res
        .status(400)
        .send({ status: "failed", meassge: "email is already exit" });
    } else {
      try {
        if (password === conforme_password) {
          const salt = await bcrypt.genSalt(10);
          const hashpassword = await bcrypt.hash(password, salt);
          const payload = new UsersData({
            username,
            phone,
            email,
            password: hashpassword,
            role
          });
          await payload.save();
          const user_data = await UsersData.create(payload);
          const token = await jwt.sign(
            { tokenId: user_data._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "5d" }
          );
          res.status(200).send({
            status: "success",
            message: "register success full created",
            user: user_data,
            token,
          });
        } else {
          res.status(400).send({
            status: "failed",
            meassge: "password and conform password not match",
          });
        }
      } catch (error) {
        console.log(error);
        res.status(400).send({
          status: "failed",
          meassge: error,
        });
      }
    }
  } else {
    res.status(400).send({
      status: "failed",
      meassge: "All failed Required!!!!",
    });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const user = await UsersData.findOne({ email: email }).lean().exec();
      if (user) {
        const isLogin = await bcrypt.compare(password, user.password);
        if (email === user.email && isLogin) {
          const token = await jwt.sign(
            { tokenId: user._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "5d" }
          );
          res
            .status(201)
            .send({
              status: "success",
              message: "login success full",
              user,
              token,
            });
        } else {
          res
            .status(400)
            .send({ status: "failed", message: "email password not match!!" });
        }
      } else {
        res
          .status(400)
          .send({ status: "failed", message: "email password not match!!" });
      }
    } else {
      res
        .status(400)
        .send({ status: "failed", message: "all failed required!!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "failed", error });
  }
};
module.exports = { registration, login };
