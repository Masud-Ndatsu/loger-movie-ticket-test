const { verifyAccessToken } = require("../utils/encryption");
const userRepo = require("../repository/user.repository");

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        status: false,
        data: null,
        message: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1];
    const decodedToken = verifyAccessToken(token);
    const user = await userRepo.GetUserById(decodedToken.userId);

    if (!user) {
      return res.status(401).json({
        status: false,
        data: null,
        message: "Unauthorized",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      status: false,
      data: null,
      message: "Unauthorized",
    });
  }
};

module.exports = { authenticate };
