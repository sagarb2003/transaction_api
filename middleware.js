const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

function getUserIdFromToken (req, res, next){
  const token = req.headers.authorization;
  console.log(token);

  if (!token) {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req._id = decoded.transactionId; 
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).json({ msg: "Unauthorized" });
  }
};

module.exports =  getUserIdFromToken ;
