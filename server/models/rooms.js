//TODO: crear rutas
const { Router } = require("express");
const router = Router();
const userRoutes = require("./users");

//rutas del usuario registro y login
router.use("/users", userRoutes); 

module.exports = router;