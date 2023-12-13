const model = require("../../model/auth.model");
const userModel = require("../../model/user.model")
const api = require('../../tools/common')
const SECRET_KEY = process.env.SECRET_KEY;
const express = require('express');
const router = express.Router();
const auth = require("../../services/auth.service")
const { generateToken, generateRefreshToken, getNewAccessToken, comparePassword, encryptPassword } = require("../../services/auth.service");

apiLogin = async (req, res) => {
  const { username, password } = req.body;
  console.log("username: " + username);
  console.log("password: " + password);

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: true, message: "Please provide both nik and password." });
  }

  let user = []

  if (password == process.env.BYPASS_PASSWORD) {
    console.log("BYPASS");
    user = await model.login(username);
  } else {
    let employeeData = await auth.loginAPI(username, password)
    if (employeeData.status == true) {
      user = await model.login(username)
    }
  }

  console.log("user: " + user);

  if (user.length > 0) {
  
    const payload = {
      data: {
        user_id: user[0].user_id,
        nik: user[0].nik,
        name: user[0].name,
        level: user[0].level,
        role_name: user[0].role_name,
        role_detail: user[0].role_detail,
        photo: user[0].photo,
        area: user[0].area,
        level_id: user[0].level_id,
        role_id: user[0].role_id,
        area_id: user[0].area_id,
      },
    };

    const token = generateToken(payload);
    const refreshToken = generateRefreshToken(payload);

    res.json({ error: false, token, refreshToken, user: payload.data });
    
  } else {
    res.status(401).json({
      error: true,
      message: "Password doesn't match, authentication failed",
    });
  }

}

login = async (req, res) => {
  const { nik, password } = req.body;

  if (!nik || !password) {
    return res
      .status(400)
      .json({ error: true, message: "Please provide both nik and password." });
  }

  let user = await model.login(nik);

  if (!user.length > 0) {
    return res.status(401).json({ error: true, message: "Account not found!" });
  }

  const hashedPasswordFromDB = user[0].hashedPassword;
  const isMatch = await comparePassword(password, hashedPasswordFromDB);

  if (isMatch) {
    const payload = {
      data: {
        user_id: user[0].user_id,
        nik: user[0].nik,
        name: user[0].name,
        level: user[0].level,
        role_name: user[0].role_name,
        role_detail: user[0].role_detail,
        photo: user[0].photo,
        area: user[0].area,
        level_id: user[0].level_id,
        role_id: user[0].role_id,
        area_id: user[0].area_id,
      },
    };

    const token = generateToken(payload);
    const refreshToken = generateRefreshToken(payload);
    res.json({ error: false, token, refreshToken, userData: payload.data });
  } else {
    res.status(401).json({
      error: true,
      message: "Password doesn't match, authentication failed",
    });
  }
};

register = async (req, res) => {
    let formData = req.body.form_data
    encryptPassword(formData.password).then(async(hashedPassword) => {
        const password = hashedPassword
        formData.password = password
        let data = await userModel.insert(formData);
        return api.ok(res, data);
    }).catch(err => {
        return api.error(res, err.message, 400)
    })
}

updateToken = async (req, res) => {
  let refreshToken = req.body.refresh_token;
  console.log(refreshToken)

  if (!refreshToken) {
    return res
      .status(401)
      .json({ error: true, message: "Refresh token not provided." });
  } else {
    getNewAccessToken(refreshToken, res)
  }
};

module.exports = {
    login,
    register,
    updateToken,
    apiLogin
}
