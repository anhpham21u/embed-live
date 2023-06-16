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
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect) return next(createError(400, "Wrong password!!!"));

    res.status(200).send("User is logged!");
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login };
