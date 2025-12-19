import { verifyToken } from "@clerk/clerk-sdk-node";
import type { NextFunction, Request, Response } from "express";
import Error from "../lib/Error";

interface User {
  id: string;
}

export interface AuthRequest extends Request {
  user: User;
}

export default async function auth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.header("x-auth-token") as string;

  if (token) throw new Error(401, "Access denied. No token provided.");

  try {
    const decoded = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY as string,
    });

    (req as AuthRequest).user = { id: decoded.sub };
    next();
  } catch (error) {
    throw new Error(401, "Invalid or expired token.");
  }
}
