import jwt from 'jsonwebtoken';
import { errorHandler } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token; // get token

  if (!token) return next(errorHandler(401, "Unauthorized"));
    // if no error return

    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(errorHandler(403, 'forbiden'));

        req.user = user;
        next();
    });

};
