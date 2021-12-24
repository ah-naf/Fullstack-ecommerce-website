const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    const jwtToken = req.header("token");
    if (!jwtToken) {
      return res.status(403).json({ message: "Not authorized" });
    } else {
      const data = jwt.verify(jwtToken, process.env.JWT_SECRET);
      req.user = data.user;
      if(data.admin) {
        next();
      }
    }
  } catch (error) {
    return res.status(403).json({ message: "Not authorized" });
  }

  next();
}; 