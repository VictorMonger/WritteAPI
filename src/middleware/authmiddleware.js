const { verifyToken } = require("../lib/auth");

const validateToken = (request, response, next) => {
  try {
    const { authorization } = request.headers;

    if (!authorization) {
      return response.status(400).json({ msg: "Token not provided" });
    }

    const [, token] = authorization.split(" ");

    const payload = verifyToken(token);

    if (!payload) {
      return response.status(400).json({ msg: "Token not valid" });
    }

    const { user } = payload;

    request.headers["user"] = user;

    return next();
  } catch (error) {
    throw new Error();
  }
};

module.exports = validateToken;
