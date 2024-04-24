import { AuthRepositoryInMemory } from "../in-memory/AuthRepositoryInMemory";
import { StudentRepositoryInMemory } from "../in-memory/StudentRepositoryInMemory";

let studentRepository: StudentRepositoryInMemory;
let authRepository: AuthRepositoryInMemory;

describe("Update Student", () => {
  beforeEach(() => {
    studentRepository = new StudentRepositoryInMemory();
    authRepository = new AuthRepositoryInMemory();
  });

  it("should be able to update a student", async () => {
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

    const studentUpdated = await studentRepository.update({
      name: "John Doe Updated",
      email: "teste@teste.com",
      id: createdStudent.id,
      user_id: userCreated.id,
    });

    expect(studentUpdated.name).toEqual("John Doe Updated");
    expect(createdStudent.id).toEqual(studentUpdated.id);
  });

  it("should not be able to update a student with not exists", async () => {
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

      await studentRepository.update({
        name: "John Doe Updated",
        email: "teste@teste.com",
        id: 10,
        user_id: userCreated.id,
      });
    }).rejects.toEqual(Error("Aluno não encontrado"));
  });
});
