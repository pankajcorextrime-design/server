const UserModel = require("../model/userSchema");
const jwt = require("jsonwebtoken");

// const register = async (req, res) => {
//   const { name, email, password } = req.body;

//   const foundUser = await UserModel.find({ email });
//   if (foundUser) {
//     return res.status(409).json({
//       error: "User already exists",
//       message:
//         "A user with this email address already exists. Please try logging in or use a different email.",
//     });
//   }
//   try {
//     const user = new UserModel({
//       name,
//       email,
//       password,
//     });
//     await user.save();
//     res.status(200).json({
//       message: "User registered successfully",
//       user,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };
const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const foundUser = await UserModel.findOne({ email });

    if (foundUser) {
      return res.status(409).json({
        error: "User already exists",
        message:
          "A user with this email address already exists. Please try logging in or use a different email.",
      });
    }

    // Create new user
    const user = new UserModel({
      name,
      email,
      password,
    });

    await user.save();

    res.status(200).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user already exists
    const user = await UserModel.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(404).json({
        message: "Invalid credentials",
      });
    }
    // console.log(user);
    const token = jwt.sign(
      {
        id: user._id,
      },
      "abcdef",
      {
        expiresIn: "1h",
      },
    );

    res.cookie("uid", token, {
      httpOnly: true,
      secure: true, // IMPORTANT for HTTPS
      sameSite: "none", // IMPORTANT for cross-site cookies
      maxAge: 60 * 1000 * 60 * 24 * 7,
    });

    res.json({
      message: "user login successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getuser = async (req, res) => {
  const user = await UserModel.find();
  console.log(user);
  res.json({
    name: "i am pankaj",
    user,
  });
};

module.exports = {
  register,
  login,
  getuser,
};
