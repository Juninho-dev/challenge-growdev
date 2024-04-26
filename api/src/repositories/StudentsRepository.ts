import { prisma } from "../database/client";

export interface IStudent {
  user_id: number;
  name: string;
  email: string;
  cpf: string;
  ra: string;
  id?: number;
}

export class StudentsRepository {
  async index(userId: number) {
    return prisma.student.findMany({
      where: {
        userId,
      },
    });
  }

  async create({ name, user_id, email, cpf, ra }: IStudent) {
    return prisma.student.create({
      data: {
        name,
        userId: user_id,
        email,
        cpf,
        ra,
      },
    });
  }

  async update({ name, user_id, email, id }: Omit<IStudent, "cpf" | "ra">) {
    return prisma.student.update({
      where: {
        id,
      },
      data: {
        name,
        userId: user_id,
        email,
      },
    });
  }

  async show(id: number, userId: number) {
    return prisma.student.findFirst({
      where: {
        id,
        userId,
      },
    });
  }

  async delete(id: number, userId: number) {
    const student = await prisma.student.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!student) {
      throw new Error("Aluno não encontrado");
    }

    await prisma.student.delete({
      where: {
        id,
      },
    });

    return "ok";
  }

  async findByRa(ra: string) {
    return prisma.student.findFirst({
      where: {
        ra,
      },
    });
  }
}
