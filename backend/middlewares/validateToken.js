import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
export const CheckToken = (req, resp, next) => {
  let auth = req.headers.authorization;
  if (auth) {
    try {
      let key = process.env.SECRETKEY;
      jwt.verify(auth, key, (err, validToken) => {
        if (err)
          return resp.json({
            isTokenValid: true,
            msg: err.message,
          });
        if (!validToken) return resp.json({ msg: "Token is not valid" });
        next();
      });
    } catch (error) {
      console.log({ msg: error.message, status: 500 });
      return resp.json({ status: 500, msg: "something went wrong in token" });
    }
  } else {
    resp.json({ msg: "Please send valid token" });
  }
};
