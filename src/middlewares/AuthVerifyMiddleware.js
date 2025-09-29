// lib for JWT
const jwt = require("jsonwebtoken");
module.exports = async (Request, Response, Next) => {
  // getting token from headers
  const Token = Request.headers["token"];

  // verify token using jwt and secret key
  jwt.verify(Token, "SecretKey123456789", (err, decoded) => {
    if (err) {
      // Token verification failed
      Response.status(401).json({
        status: "unauthorized",
        data: err.toString(),
      });
    } else {
      // Token is valid Extract email from decoded token
      const email = decoded["data"];

      console.log(email);
      // Attach email to request headers for further use
      Request.headers["email"] = email;
      Next();
    }
  });
};
