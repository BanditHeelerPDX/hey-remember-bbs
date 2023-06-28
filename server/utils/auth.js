require("dotenv").config();
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;
const expiry = "2h";

const authorized = (req, res, next) => {
  let token = req.query.token || req.body.token || req.headers.authorization;

  if (req.headers.authorization) {
    token = token.split(" ").pop().trim();
  }

  if (!token) {
    return res
      .status(401)
      .json({ message: "Uh uh uhhh, you didn't say the magic word!" });
  }

  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiry });
    req.user = data;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token, please try again" });
  }
};

const signToken = ({ username, email, _id }) => {
  const payload = { username, email, _id };

  return jwt.sign({ data: payload }, secret, { expiresIn: expiry });
};

module.exports = { authorized, signToken };
