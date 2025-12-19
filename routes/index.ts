import type { Request, Response } from "express";
import exporess from "express";
import APIResponse from "../lib/APIResponse";
import auth from "../middlewares/auth";
import admin from "../middlewares/admin";

const router = exporess.Router();

router.get("/", [admin, auth], async (req: Request, res: Response) => {
  res.status(200).send(new APIResponse(true, "Hello World"));
});

export default router;
