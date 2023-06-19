const User = require("./../models/User.js");
const createError = require("./../utils/error.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();

    res.status(200).json({ message: "Đăng ký thành công." });
  } catch (err) {
    next(createError(400, "User not found"));
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: req.body.email });

    if (!user) return next(createError(404, "User not found"));

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) return next(createError(400, "Wrong password"));

    console.log(process.env.MY_SECRET_KEY);

    const token = jwt.sign({ email }, process.env.MY_SECRET_KEY);

    console.log(token);

    res.status(200).json({ message: "User is logged", token });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login };
