const db = require("../../models");
const User = db.user;
const Department = db.department;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Login
exports.authenticate = async (req, res) => {
  try {
    // Validate request
    if (!req.body || !req.body.username || !req.body.password) {
      return res.status(400).json({ message: "Content can not be empty!" });
    }

    const user = await User.findOne({
      where: { username: req.body.username },
      include: [{ model: Department }],
    });

    if (!user) {
      return res.status(403).json({ message: "Incorrect Credentials!" });
    }

    if (!user.active) {
      return res.status(403).json({ message: "Account is not active!" });
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(403).json({ message: "Incorrect Credentials!" });
    }

    const userData = {
      id: user.id,
      username: user.username,
      fullname: user.fullName,
      role: user.role,
      departmentId: user.department ? user.department.id : null,
    };

    const token = jwt.sign({ user: userData }, process.env.SECRET_KEY, {
      expiresIn: "30m",
    });
    res.cookie("token", token);

    return res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred during authentication." });
  }
};
