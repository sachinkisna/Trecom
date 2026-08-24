const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const {
  validateRegisterBody,
  validateLoginBody,
  sendValidationErrors,
} = require("../utils/validators");

async function register(req, res, next) {
  try {
    const errors = validateRegisterBody(req.body);
    if (errors.length) return sendValidationErrors(res, errors);

    const { name, email, phone, password, role } = req.body;
    const existing = await User.findOne({ email: email.toLowerCase() });

    if (existing) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    const allowedRoles = ["buyer", "tenant", "owner", "agent", "builder"];
    const userRole = allowedRoles.includes(role) ? role : "buyer";

    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone?.trim(),
      password,
      role: userRole,
    });

    res.status(201).json({
      success: true,
      data: {
        user: user.toPublicJSON(),
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const errors = validateLoginBody(req.body);
    if (errors.length) return sendValidationErrors(res, errors);

    const user = await User.findOne({
      email: req.body.email.toLowerCase().trim(),
    }).select("+password");

    if (!user || !(await user.matchPassword(req.body.password))) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    res.json({
      success: true,
      data: {
        user: user.toPublicJSON(),
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    next(error);
  }
}

async function getMe(req, res) {
  res.json({
    success: true,
    data: req.user.toPublicJSON(),
  });
}

module.exports = { register, login, getMe };
