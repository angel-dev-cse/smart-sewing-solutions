import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface CustomRequest extends Request {
  user?: any;
}

const authAccessJWT = (req: CustomRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET as string, (err, decodedToken:any) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token!' });
      }

      if(decodedToken.tokenType !== 'access') {
        return res.status(403).json({ message: 'Invalid token type!' });
      }

      req.user = decodedToken;
      next();
    });
  } else {
    return res.status(403).json({ message: 'Invalid authentication header!' });
  }
}

const authSysAdmin= (req: CustomRequest, res: Response, next: NextFunction) => {
  if(!req.user.SYSTEM_ADMIN) {
    return res.status(403).json({ message: 'Unauthorized access!' });
  }

  next();
}

export { authAccessJWT, authSysAdmin };