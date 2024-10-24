import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

class AuthenticationMiddleware {
  authenticateUser = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
    const token = req.headers.authorization?.split(" ")[1];
   
    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    let decoded;
    try{
      decoded = jwt.verify(
        token,
      process.env.ACCESS_TOKEN_SECRET as string,
      );
       console.log("decoded: ", decoded);
    } catch (error) {
      console.log(error);
      res.status(401).json({ message: "Unauthorized", error: (error as Error).message });
      return;
    }
    if(typeof decoded === 'object' && 'id' in decoded){
      req.body.userId = decoded.id;
      console.log("userId in authenticateUser in middleware: ", req.body.userId);
    }
    if (!decoded) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    next();
  }

  authenticateAIMicroservice = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
    const token = req.headers.authorization;
    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    if (token !== process.env.AI_MICROSERVICE_TOKEN) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    next();
  }
};

export default AuthenticationMiddleware;
