const jwt = require("jsonwebtoken");

// JWT_SECRET = "mysecretjwt";
// JWT_EXP = "2h";

const secret = "mysecretjwt";
const expiration = "2h";

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
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log("invalid token");
    }

    return req;
  },
  signToken: function ({ email, username, _id }) {
    const payload = { email, username, _id };
    console.log(payload);
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
