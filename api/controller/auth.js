const User = require("./../models/User.js");
const createError = require("./../utils/error.js");
const bcrypt = require("bcryptjs");

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
    const user = await User.findOne({ username: req.body.username });

    if (!user) return next(createError(404, "User not found"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect) return next(createError(400, "Wrong password"));

    const userData = { username: user.username, email: user.email };

    res.status(200).json({ message: "User is logged", userData });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login };
