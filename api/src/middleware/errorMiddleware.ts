import { Request, Response } from "express";

import { apiMessage } from "../helpers/error";

export function errorMiddleware(req: Request, res: Response) {
  return res.status(404).send(apiMessage(false, 500, "Route not found"));
}
