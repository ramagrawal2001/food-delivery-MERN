const User = require("../models/UserModel");

module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, username, name } = req.body;

    const existingUser = await User.findOne({ username }).exec();
    if (existingUser) {
      return res.json({ message: "Username already exists", success: false });
    }

    const existingEmail = await User.findOne({ email }).exec();
    if (existingEmail) {
      return res.json({ message: "Email already exists", success: false });
    }

    const user = await User.create({ email, password, username, name });

    res
      .status(201)
      .json({ message: "User signed up successfully", success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "All fields are required", success: false });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        message: "Incorrect password or email",
        success: false,
      });
    }
    const auth = password == user.password;
    if (!auth) {
      return res.json({
        message: "Incorrect password or email",
        success: false,
      });
    }

    res.status(201).json({
      message: "User logged in successfully",
      success: true,
      user,
    });

    next();
  } catch (error) {
    console.error(error);
  }
};
