const { Router } = require("express");
const router = Router();
const {signUp} = require("../controllers/users");
const {login} = require("../controllers/users");

//registro usuario
router.post("/signup", signUp);
//login usuario
router.post("/login", login);

module.exports = router;