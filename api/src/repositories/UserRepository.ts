import { prisma } from "../database/client";

export interface ICreateUser {
  name: string;
  email: string;
  password: string;
}

export class UserRepository {
  async create({ name, email, password }: ICreateUser) {
    return prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findById(userId: number) {
    return prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
  }
}
