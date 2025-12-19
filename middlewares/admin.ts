import type { NextFunction, Request, Response } from "express";
import Error from "../lib/Error";

export default (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("x-api-token");
  if (!token) throw new Error(403, "Access denied. No token provided.");
  if (token !== process.env.AUTH_TOKEN)
    throw new Error(403, "Access denied. Invalid Token.");
  next();
};
