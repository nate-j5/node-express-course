const express = require("express");

const router = express.Router();

const { login, dashboard } = require("../controllers/main");

const authMiddleware = require("../middleware/auth");

// when a get request is sent to the dashboard route they hit the auth middleware
router.route("/dashboard").get(authMiddleware, dashboard);
router.route("/login").post(login);

module.exports = router;
