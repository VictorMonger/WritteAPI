const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const createUserToken = (user) => {
  const token = jwt.sign({ user: JSON.stringify(user) }, JWT_SECRET, {
    expiresIn: "1d",
  });

  return token;
};

const verifyToken = (token) => {
  const payload = jwt.verify(token, JWT_SECRET);
  
  return payload;
};

module.exports = {
  createUserToken,
  verifyToken,
};
