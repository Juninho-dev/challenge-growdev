import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { apiMessage } from "../helpers/error";
import { StudentsRepository } from "../repositories/StudentsRepository";

export class StudentsController {
  async index(req: Request, res: Response) {
    const { user_id } = req;

    const studentsRepository = new StudentsRepository();
    const students = await studentsRepository.index(Number(user_id));

    return res.send(apiMessage(true, 200, "Students", students));
  }

  async create(req: Request, res: Response) {
    const errors = validationResult(req);
    const { user_id } = req;
    const {
      name,
      email,
      cpf,
      ra,
    } = req.body;

    if (!errors.isEmpty()) {
      return res
        .status(422)
        .send(apiMessage(false, 422, "Validation error", errors.array()));
    }

    const studentsRepository = new StudentsRepository();
    const student = await studentsRepository.create({
      name,
      user_id: Number(user_id),
      email,
      cpf,
      ra,
    });

    return res.send(apiMessage(true, 201, "Aluno criado", student));
  }

  async update(req: Request, res: Response) {
    const errors = validationResult(req);
    const { user_id } = req;
    const {
      name,
      email
    } = req.body;
    const { id } = req.params;

    if (!errors.isEmpty()) {
      return res
        .status(422)
        .send(apiMessage(false, 422, "Validation error", errors.array()));
    }

    const studentsRepository = new StudentsRepository();
    const student = await studentsRepository.update({
      name,
      user_id: Number(user_id),
      email,
      id: Number(id),
    });

    return res.send(apiMessage(true, 200, "Aluno atualizado", student));
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const { user_id } = req;

    const studentsRepository = new StudentsRepository();
    const student = await studentsRepository.delete(
      Number(id),
      Number(user_id),
    );

    return res.send(apiMessage(true, 200, "Aluno deletado", student));
  }
}
