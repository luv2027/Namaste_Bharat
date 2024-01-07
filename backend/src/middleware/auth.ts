import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express{
    interface Request {
      userId: string;
    }
  }
}

//extended express request interface to include userId property

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies["auth_token"];
  if(!token){
    return res.status(401).json({message: "Unauthorized"});
  }

  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);

    req.userId = (decoded as JwtPayload).userId;
    next();
  }
  catch(error){
    return res.status(401).json({message: "Unaruthorized"});
  }
};

export default verifyToken;