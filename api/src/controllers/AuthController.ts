// User controller
import { User } from "@prisma/client";
import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { apiMessage } from "../helpers/error";
import { AuthRepository } from "../repositories/AuthRepository";

export class AuthController {
  async register(req: Request, res: Response) {
    const authRepository = new AuthRepository();
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(422)
        .send(apiMessage(false, 422, "Validation error", errors.array()));
    }

    const {
      name,
      email,
      password
    } = req.body;
    const user: User = await authRepository.register({
      name,
      email,
      password,
    });

    return res.send(apiMessage(true, 200, "User registered", user));
  }

  async login(req: Request, res: Response) {
    const errors = validationResult(req);
    const authRepository = new AuthRepository();

    if (!errors.isEmpty()) {
      return res
        .status(422)
        .send(apiMessage(false, 422, "Validation error", errors.array()));
    }

    const {
      email,
      password
    } = req.body;

    const user = await authRepository.login({
      email,
      password,
    });

    return res.send(apiMessage(true, 200, "Login successful", user));
  }

  async auth(req: Request, res: Response) {
    const { user_id } = req;
    const authRepository = new AuthRepository();

    const user = await authRepository.auth(Number(user_id));

    return res.send(apiMessage(true, 200, "User authenticated", user));
  }
}
