import { compare, hash } from "bcrypt";
import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { apiMessage } from "../helpers/error";
import { generateToken } from "../helpers/generateToken";
import { UserRepository } from "../repositories/UserRepository";

export class AuthController {
  async register(req: Request, res: Response) {
    const userRepository = new UserRepository();
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

    try {
      const userAlreadyExists = await userRepository.findByEmail(email);

      if (userAlreadyExists) {
        return res.status(400)
          .send(apiMessage(false, 500, "Usuário já existe"));
      }

      const hashedPassword = await hash(password, 10);

      const user = await userRepository.create({
        name,
        email,
        password: hashedPassword
      });

      return res.send(apiMessage(true, 200, "User registered", user));
    } catch (err: any) {
      return res.status(500)
        .send(apiMessage(false, 500, err.message));
    }
  }

  async login(req: Request, res: Response) {
    const errors = validationResult(req);
    const userRepository = new UserRepository();

    if (!errors.isEmpty()) {
      return res
        .status(422)
        .send(apiMessage(false, 422, "Validation error", errors.array()));
    }

    const {
      email,
      password
    } = req.body;

    try {
      const user = await userRepository.findByEmail(email);

      if (!user) {
        return res.status(404)
          .send(apiMessage(false, 500, "Usuário não existe"));
      }

      const passwordMatch = await compare(password, user.password);

      if (!passwordMatch) {
        return res.status(400)
          .send(apiMessage(false, 500, "Senha incorreta"));
      }

      const token = generateToken(String(user.id), { email });

      return res.send(apiMessage(true, 200, "Login successful", {
        token,
        user
      }));
    } catch (err: any) {
      return res.status(500)
        .send(apiMessage(false, 500, err.message));
    }
  }

  async auth(req: Request, res: Response) {
    const { user_id } = req;
    const userRepository = new UserRepository();

    try {
      const user = await userRepository.findById(Number(user_id));

      return res.send(apiMessage(true, 200, "User authenticated", user));
    } catch (err: any) {
      return res.status(500)
        .send(apiMessage(false, 500, err.message));
    }
  }
}
