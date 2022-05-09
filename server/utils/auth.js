const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, process.env.JWT_SECRET, { maxAge: process.env.JWT_EXP });
      req.user = data;
    } catch {
      console.log("invalid token");
    }
  },
};
