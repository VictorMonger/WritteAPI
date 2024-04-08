const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const createUserToken = (user) => {
  try {
    const token = jwt.sign({ user: JSON.stringify(user) }, JWT_SECRET, {
      expiresIn: "1d",
    });

    return token;
  } catch (error) {
    throw new Error();
  }
};

const verifyToken = (token) => {
  try {
    const payload = jwt.verify(token, JWT_SECRET);

    return payload;
  } catch (error) {
    throw new Error();
  }
};

module.exports = {
  createUserToken,
  verifyToken,
};
