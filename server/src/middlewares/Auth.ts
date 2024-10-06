import { auth } from "express-oauth2-jwt-bearer";
import dotenv from "dotenv";
import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";
import User from "../models/userModel";

dotenv.config();

declare global {
  namespace Express {
    interface Request {
      userId: string;
      auth0Id: string;
    }
  }
}

export const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: "RS256",
});

export const jwtParse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer "))
      throw new Error("Authentication failed...🔐");

    const token = authorization?.split(" ")[1];
    const decode = jwt.decode(token) as jwt.JwtPayload;

    const auth0Id = decode.sub;

    const user = await User.findOne({ auth0Id });
    if (!user) throw new Error("User not found...🤦‍♂️");

    req.auth0Id = auth0Id as string;
    req.userId = user._id.toString();

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      error: true,
      message: (error as Error).message,
    });
  }
};
