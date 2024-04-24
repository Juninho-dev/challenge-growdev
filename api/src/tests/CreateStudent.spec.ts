import { AuthRepositoryInMemory } from "../in-memory/AuthRepositoryInMemory";
import { StudentRepositoryInMemory } from "../in-memory/StudentRepositoryInMemory";

let studentRepository: StudentRepositoryInMemory;
let authRepository: AuthRepositoryInMemory;

describe("Create Student", () => {
  beforeEach(() => {
    studentRepository = new StudentRepositoryInMemory();
    authRepository = new AuthRepositoryInMemory();
  });

  it("should be able to create a new student", async () => {
    const user = {
      name: "John Doe",
      email: "teste@teste.com",
      password: "123456",
    };

    const userCreated = await authRepository.register(user);

    const student = {
      name: "John Doe",
      email: "teste@teste.com",
      cpf: "12345678910",
      ra: "123456",
      user_id: userCreated.id,
    };

    const createdStudent = await studentRepository.create(student);

    expect(createdStudent)
      .toHaveProperty("id");
  });

  it("should not be able to create a new student with same ra", async () => {
    await expect(async () => {
      const user = {
        name: "John Doe",
        email: "teste@teste.com",
        password: "123456",
      };

      const userCreated = await authRepository.register(user);

      const student = {
        name: "John Doe",
        email: "teste@teste.com",
        cpf: "12345678910",
        ra: "123456",
        user_id: userCreated.id,
      };

      await studentRepository.create(student);
      await studentRepository.create(student);
    })
      .rejects
      .toEqual(Error("Aluno já cadastrado"));
  });
});
