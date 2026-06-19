// const jwt = require("jsonwebtoken");
// const UserModel = require("../model/userSchema");
// const checkAuth = async function (req, res, next) {
//   try {
//     const token = req.cookies.uid;
//     const user = UserModel.find({ _id });
//     if (!user) {
//       return res.status(401).json({ error: "Not Logged!" });
//     }

//     console.log("tokendnj", token);
//     if (!token) {
//       return res.status(401).json({
//         message: "Token is not generated check the token",
//       });
//     }
//     const decoded = jwt.verify(token, "abcdef");
//     console.log("decoded user data", decoded);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(401).json({
//       message: "Invalid token",
//     });
//   }
// };
// module.exports = checkAuth;
const jwt = require("jsonwebtoken");
const UserModel = require("../model/userSchema");

const checkAuth = async (req, res, next) => {
  try {
    // Get token from cookie
    console.log("cookies:", req.cookies);
    const token = req.cookies.uid;
    console.log(token);
    if (!token) {
      return res.status(401).json({
        message: "Not logged in",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, "abcdef");
    console.log("decoded user data:", decoded);

    // Find user in database
    const user = await UserModel.findById(decoded.id);

    if (!user || !token) {
      return res.status(401).json({
        error: "User not found",
      });
    }

    // Attach user to request
    req.user = user;

    next();
  } catch (error) {
    console.log(error);

    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

module.exports = checkAuth;
