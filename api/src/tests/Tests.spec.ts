import requestApp from "./request";

describe("Login User", () => {
  it("should be able to login a user", async () => {
    const user = {
      name: "John Doe",
      email: "teste@teste.com",
      password: "123456",
    };

    const response = await requestApp
      .post("/login")
      .send(user);

    expect(response.status)
      .toBe(200);
    expect(response.body.payload)
      .toHaveProperty("token");
    expect(response.body.payload)
      .toHaveProperty("user");
  });

  it("should not be able to login a non existing user", async () => {
    const user = {
      email: "teste1@teste.com",
      password: "123456",
    };

    const response = await requestApp
      .post("/login")
      .send(user);

    expect(response.status)
      .toBe(404);
    expect(response.body.message)
      .toBe("Usuário não existe");
  });

  it("should be able return auth user", async () => {
    const user = {
      name: "John Doe",
      email: "teste@teste.com",
      password: "123456",
    };

    const response = await requestApp
      .post("/login")
      .send(user);

    const authUser = await requestApp.get("/auth")
      .set("Authorization", `Bearer ${response.body.payload.token}`);

    expect(authUser.body.payload)
      .toHaveProperty("id");
  });
});

describe("Register User", () => {
  it("should be able to register a new user", async () => {
    const user = {
      name: "John Doe",
      email: `teste${Math.random()}@teste.com`,
      password: "123456",
    };

    const newUser = await requestApp.post("/register")
      .send(user);

    expect(newUser.body.payload)
      .toHaveProperty("id");
  });

  it("should not be able to register a new user with an existing email", async () => {
    const user = {
      name: "John Doe",
      email: "teste@teste.com",
      password: "123456",
    };

    const response = await requestApp.post("/register")
      .send(user);

    expect(response.status)
      .toBe(400);
  });
});

describe("Create Student", () => {
  it("should be able to create a new student", async () => {
    const user = {
      name: "John Doe",
      email: "teste@teste.com",
      password: "123456",
    };

    const { body } = await requestApp.post("/login")
      .send(user);

    const student = {
      name: "John Doe",
      email: `teste${Math.random()}@teste.com`,
      cpf: Math.random()
        .toString(36)
        .substring(11),
      ra: Math.random()
        .toString(36)
        .substring(7),
      user_id: body.payload.id,
    };

    const createdStudent = await requestApp.post("/students")
      .set("Authorization", `Bearer ${body.payload.token}`)
      .send(student);

    expect(createdStudent.body.payload)
      .toHaveProperty("id");
  });

  it("should not be able to create a new student with same ra", async () => {
    const user = {
      name: "John Doe",
      email: "teste@teste.com",
      password: "123456",
    };

    const { body } = await requestApp.post("/login")
      .send(user);

    const student = {
      name: "John Doe",
      email: "teste@teste.com",
      cpf: "12345678910",
      ra: "123456",
      user_id: body.payload.id,
    };

    const requestError = await requestApp.post("/students")
      .set("Authorization", `Bearer ${body.payload.token}`)
      .send(student);

    expect(requestError.status)
      .toBe(400);
    expect(requestError.body.message)
      .toBe("Aluno já cadastrado");
  });
});

describe("Update Student", () => {
  it("should be able to update a student", async () => {
    const user = {
      name: "John Doe",
      email: "teste@teste.com",
      password: "123456",
    };

    const { body } = await requestApp.post("/login")
      .send(user);

    const student = {
      name: "John Doe",
      email: `teste${Math.random()}@teste.com`,
      cpf: Math.random()
        .toString(36)
        .substring(11),
      ra: Math.random()
        .toString(36)
        .substring(7),
      user_id: body.payload.id,
    };

    const createdStudent = await requestApp.post("/students")
      .set("Authorization", `Bearer ${body.payload.token}`)
      .send(student);

    const dataUpdate = {
      name: "John Doe Updated",
      email: `teste${Math.random()}@teste.com`,
    };

    const studentUpdated = await requestApp.put(`/students/${createdStudent.body.payload.id}`)
      .set("Authorization", `Bearer ${body.payload.token}`)
      .send(dataUpdate);

    expect(studentUpdated.body.payload.name)
      .toEqual("John Doe Updated");
    expect(createdStudent.body.payload.id)
      .toEqual(studentUpdated.body.payload.id);
  });

  it("should not be able to update a student with not exists", async () => {
    const user = {
      name: "John Doe",
      email: "teste@teste.com",
      password: "123456",
    };

    const { body } = await requestApp.post("/login")
      .send(user);

    const dataUpdate = {
      name: "John Doe Updated",
      email: `teste${Math.random()}@teste.com`,
    };

    const studentUpdated = await requestApp.put("/students/10")
      .set("Authorization", `Bearer ${body.payload.token}`)
      .send(dataUpdate);

    expect(studentUpdated.status)
      .toBe(404);
    expect(studentUpdated.body.message)
      .toBe("Aluno não encontrado");
  });
});

describe("Delete Student", () => {
  it("should be able to delete a student", async () => {
    const user = {
      name: "John Doe",
      email: "teste@teste.com",
      password: "123456",
    };

    const { body } = await requestApp.post("/login")
      .send(user);

    const student = {
      name: "John Doe",
      email: `teste${Math.random()}@teste.com`,
      cpf: Math.random()
        .toString(36)
        .substring(11),
      ra: Math.random()
        .toString(36)
        .substring(7),
      user_id: body.payload.id,
    };

    const createdStudent = await requestApp.post("/students")
      .set("Authorization", `Bearer ${body.payload.token}`)
      .send(student);

    const studentDeleted = await requestApp.delete(`/students/${createdStudent.body.payload.id}`)
      .set("Authorization", `Bearer ${body.payload.token}`);

    expect(studentDeleted.status)
      .toBe(200);
    expect(studentDeleted.body.message)
      .toEqual("Aluno deletado");
  });

  it("should not be able to delete a student with not exists", async () => {
    const user = {
      name: "John Doe",
      email: "teste@teste.com",
      password: "123456",
    };

    const { body } = await requestApp.post("/login")
      .send(user);

    const errorStudentDeleted = await requestApp.delete("/students/1000")
      .set("Authorization", `Bearer ${body.payload.token}`);

    expect(errorStudentDeleted.status)
      .toBe(404);
    expect(errorStudentDeleted.body.message)
      .toBe("Aluno não encontrado");
  });
});
