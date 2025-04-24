const prisma = require("../config/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const { token } = require("morgan");

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body; // Destructure email and password from req.body

    // Check if email is provided
    if (!email) {
      return res.status(400).json({ message: "Please provide email" });
    }

    // Check if password is provided
    if (!password) {
      return res.status(400).json({ message: "Please provide password" });
    }

    // check email in database
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (user) {
      return res.status(409).json({ message: "user already exist" });
    }

    // Hash password for security
    const hashPassword = await bcrypt.hash(password, 10);

    // Create user
    await prisma.user.create({
      data: {
        email: email,
        password: hashPassword,
      },
    }); //

    res.send("Register Success");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error", err: err });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email is provided
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user || user.enabled === false) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check if password is provided
    const isMatch = await bcrypt.compare(password, user.password); // Compare password
    if (!isMatch) {
      return res.status(400).json({ message: "Password Invalid!" });
    }

    // Create token
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    // Generate token
    jwt.sign(payload, process.env.SECRET, { expiresIn: "1d" }, (err, token) => {
      if (err) {
        return res.status(500).json({ message: "Server Error" });
      }
      res.json({ payload, token });
    });

    console.log(payload);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.currentuser = async (req, res) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: req.user.email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};
