const express = require("express");
const {route} = require("express/lib/application")
const router = express.Router();
const {protect} = require("../middleware/authMiddleware")

const {registerUser,loginUser, getMe} = require("../controllers/userController")

router.post("/", registerUser);

router.post("/login",loginUser);

router.get("/me", protect, getMe)

module.exports = router;
