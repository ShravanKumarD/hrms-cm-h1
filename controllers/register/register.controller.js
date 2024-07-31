const db = require("../../models");
const {
  user: User,
  userPersonalInfo: UserPersonalInfo,
  userFinancialInfo: UserFinancialInfo,
  userDocuments: UserDocuments,
} = db;
const bcrypt = require("bcrypt");

// Create and Save a new User
exports.create = async (req, res) => {
  try {
    // Validate request
    if (
      !req.body ||
      !req.body.username ||
      !req.body.password ||
      !req.body.fullname
    ) {
      return res.status(400).json({ message: "Content cannot be empty!" });
    }

    // Hash password if provided
    const hash = req.body.password
      ? await bcrypt.hash(req.body.password.toString(), 10)
      : null;

    // Create a User object
    const user = {
      username: req.body.username,
      password: hash,
      fullName: req.body.fullname,
      role: "ROLE_EMPLOYEE",
      active: false,
    };

    // Check if user already exists
    const userExists = await User.findOne({
      where: { username: user.username },
    });
    if (userExists) {
      return res.status(403).json({ message: "Username already exists" });
    }

    // Create the user
    const createdUser = await User.create(user);

    // Create associated user personal and financial info
    const userData = { userId: createdUser.id };
    await UserPersonalInfo.create(userData);
    await UserFinancialInfo.create(userData);
    await UserDocuments.create(userData);

    return res.status(201).json(createdUser);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: err.message || "Some error occurred while creating the User.",
    });
  }
};
