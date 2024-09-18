import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

interface CustomRequest extends Request {
  user?: any;
}

const authAccessJWT = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(
      token,
      process.env.JWT_SECRET as string,
      async (err, decodedToken: any) => {
        if (err) {
          return res.status(403).json({ message: "Invalid token!" });
        }

        if (decodedToken.tokenType !== "access") {
          return res.status(403).json({ message: "Invalid token type!" });
        }

        try {
          const user = await User.findById(decodedToken.userId);
          if (!user) {
            return res.status(404).json({ message: "User not found!" });
          }

          req.user = user;
          next();
        } catch (error) {
          return res.status(500).json({ message: "Internal server error!" });
        }
      }
    );
  } else {
    return res.status(403).json({ message: "Invalid authentication header!" });
  }
};

const authSysAdmin = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user.SYSTEM_ADMIN) {
    return res.status(403).json({ message: "Unauthorized access!" });
  }

  next();
};

export { authAccessJWT, authSysAdmin };
