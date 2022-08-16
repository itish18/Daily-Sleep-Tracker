const express = require("express");
const router = express.Router();
const { upload } = require("../middleware/imageMiddleware");

const { loginUser, registerUser } = require("../controllers/userController");

router.post("/login", loginUser);
router.post("/register", upload.single("profileImg"), registerUser);

module.exports = router;
