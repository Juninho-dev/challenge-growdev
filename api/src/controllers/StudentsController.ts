import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { apiMessage } from "../helpers/error";
import { StudentsRepository } from "../repositories/StudentsRepository";

export class StudentsController {
  async index(req: Request, res: Response) {
    const errors = validationResult(req);
    const { user_id } = req;

    if (!errors.isEmpty()) {
      return res
        .status(422)
        .send(apiMessage(false, 422, "Validation error", errors.array()));
    }
    const filters = {
      ra: req.query.ra as string,
      name: req.query.name as string,
      cpf: req.query.cpf as string,
      order: req.query.order as string,
      sort: req.query.sort as string,
    };
    const studentsRepository = new StudentsRepository();

    try {
      const students = await studentsRepository.listByUserId(Number(user_id), filters);

      return res.send(apiMessage(true, 200, "Students", students));
    } catch (error) {
      return res.status(500)
        .send(apiMessage(false, 500, "Ocorreu um erro ao buscar os alunos"));
    }
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

    try {
      const findStudent = await studentsRepository.findByRa(ra);

      if (findStudent) {
        return res.status(400)
          .send(apiMessage(false, 400, "Aluno já cadastrado"));
      }

      const student = await studentsRepository.create({
        name,
        user_id: Number(user_id),
        email,
        cpf,
        ra,
      });

      return res.send(apiMessage(true, 201, "Aluno criado", student));
    } catch (error) {
      return res.status(500)
        .send(apiMessage(false, 500, "Ocorreu um erro ao criar o aluno"));
    }
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;
    const { user_id } = req;

    const studentsRepository = new StudentsRepository();

    try {
      const student = await studentsRepository.findByIdAndUserId(Number(id), Number(user_id));

      return res.send(apiMessage(true, 200, "Student", student));
    } catch (error) {
      return res.status(500)
        .send(apiMessage(false, 500, "Ocorreu um erro ao buscar o aluno"));
    }
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

    try {
      const findStudent = await studentsRepository.findByIdAndUserId(Number(id), Number(user_id));

      if (!findStudent) {
        return res.status(404)
          .send(apiMessage(false, 404, "Aluno não encontrado"));
      }

      const student = await studentsRepository.update({
        name,
        user_id: Number(user_id),
        email,
        id: Number(id),
      });

      return res.send(apiMessage(true, 200, "Aluno atualizado", student));
    } catch (error) {
      return res.status(500)
        .send(apiMessage(false, 500, "Ocorreu um erro ao atualizar o aluno"));
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const { user_id } = req;

    const studentsRepository = new StudentsRepository();

    try {
      const findStudent = await studentsRepository.findByIdAndUserId(Number(id), Number(user_id));

      if (!findStudent) {
        return res.status(404)
          .send(apiMessage(false, 404, "Aluno não encontrado"));
      }

      const student = await studentsRepository.delete(
        Number(id),
        Number(user_id),
      );

      return res.send(apiMessage(true, 200, "Aluno deletado", student));
    } catch (error) {
      return res.status(500)
        .send(apiMessage(false, 500, "Ocorreu um erro ao deletar o aluno"));
    }
  }
}
