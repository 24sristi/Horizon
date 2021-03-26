const { json } = require("express");
const jwt = require("jsonwebtoken");
const SECRET_KEY  = process.env.SECRET_KEY;

async function logout(req, res) {
    try {
      
        res.clearCookie("jwt");
        res.redirect("/");
        

    } catch (error) {
        res.status(501).json({
            error,
        });
    }
}

async function protectRoute(req, res, next) {
    try {
      const token = req.cookies.jwt;
      const payload = jwt.verify(token, SECRET_KEY);
      if (payload) {
        req.id = payload.id;
        next();
      } else {
        res.status(501).json({
          message: "Please Log in !!",
        });
      }
    } catch (error) {
      res.status(501).json({
        message: "Please Log in !!",
        error,
      });
    }
}

module.exports.logout = logout;
module.exports.protectRoute = protectRoute;

  