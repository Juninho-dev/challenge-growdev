import { AuthRepositoryInMemory } from "../in-memory/AuthRepositoryInMemory";
import { StudentRepositoryInMemory } from "../in-memory/StudentRepositoryInMemory";

let studentRepository: StudentRepositoryInMemory;
let authRepository: AuthRepositoryInMemory;

describe("Delete Student", () => {
  beforeEach(() => {
    studentRepository = new StudentRepositoryInMemory();
    authRepository = new AuthRepositoryInMemory();
  });

  it("should be able to delete a student", async () => {
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

    const studentDeleted = await studentRepository.delete(
      createdStudent.id,
      userCreated.id
    );

    expect(studentDeleted)
      .toEqual("ok");
  });

  it("should not be able to delete a student with not exists", async () => {
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

      await studentRepository.delete(10, userCreated.id);
    })
      .rejects
      .toEqual(Error("Aluno não encontrado"));
  });
});
