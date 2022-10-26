const jwt = require("jsonwebtoken");

const createJWT = async ( create ) => {
    return jwt.sign( create, process.env.JWT_SECRET, {
        expiresIn: "40d"
    });
}

module.exports = { createJWT }