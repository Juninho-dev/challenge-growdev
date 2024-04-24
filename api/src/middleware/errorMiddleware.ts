import { Request, Response } from "express";

import { apiMessage } from "../helpers/error";

export function errorMiddleware(error: any, req: Request, res: Response) {
  if (error instanceof Error) {
    return res.status(400).send(apiMessage(false, 400, error.message));
  }

  return res.status(500).send(apiMessage(false, 500, error.message));
}
