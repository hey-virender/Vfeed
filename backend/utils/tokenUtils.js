import jwt from "jsonwebtoken";

const generateToken = (user) => {
  return jwt.sign(
    { email: user.email, username: user.username, id: user._id },
    "secretKey"
  );
};

const verifyToken = async (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, "secretKey", (err, decoded) => {
      try {
        resolve(decoded);
      } catch {
        console.error(err);
      }
    });
  });
};

export { generateToken, verifyToken };
