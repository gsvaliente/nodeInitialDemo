const jwt = require("jsonwebtoken");

const compareJWT = (req, res, next) => {
  const inputToken = req.header("authorization") || req.query.inputToken;
  if (!inputToken) {
    res.status(400).send({
      succes: false,
      error: "Acces denied",
    });
  }
  jwt.verify(inputToken, process.env.JWT_SECRET, (error, user) => {
    if (error) {
      return res.status(403).send({
        succes: false,
        error: "Acces denied token",
      });
    } else {
      next();
    }
  });
};

module.exports = compareJWT;