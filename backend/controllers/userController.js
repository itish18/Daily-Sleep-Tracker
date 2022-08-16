const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImg: user.profileImg,
      token: generateToken(user._id),
    });
  } else {
    return res.status(400).json({
      message: "Invalid credentials",
    });
  }
};

const registerUser = async (req, res) => {
  const { name, email, password, isAdmin } = req.body;
  const url = req.protocol + "://" + req.get("host");

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Please fill all details",
    });
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    profileImg: req.file
      ? url + "/public/" + req.file.filename
      : "http://localhost:5000/public/0223f208-a076-49c8-9708-ea62c5a12cb6-userprofile.png",
    isAdmin,
  });

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImg: user.profileImg,
      token: generateToken(user._id),
    });
  } else {
    return res.status(400).json({
      message: "Invalid user data",
    });
  }
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  loginUser,
  registerUser,
};
