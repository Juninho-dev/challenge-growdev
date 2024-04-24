import { body } from "express-validator";

type ValidationType = "createStudent" | "updateStudent";

class StudentsValidator {
  validate = (method: ValidationType) => {
    switch (method) {
      case "createStudent": {
        return [
          body("name").notEmpty().withMessage("Nome é obrigatório"),
          body("name").isString().withMessage("Nome deve ser uma string"),
          body("email").notEmpty().withMessage("Email é obrigatório"),
          body("email").isString().withMessage("Email deve ser uma string"),
          body("email").isEmail().withMessage("Email é inválido"),
          body("cpf").notEmpty().withMessage("CPF é obrigatório"),
          body("cpf").isString().withMessage("CPF deve ser uma string"),
          body("ra").notEmpty().withMessage("RA é obrigatório"),
          body("ra").isString().withMessage("RA deve ser uma string"),
        ];
      }
      case "updateStudent": {
        return [
          body("name").notEmpty().withMessage("Nome é obrigatório"),
          body("name").isString().withMessage("Nome deve ser uma string"),
          body("email").notEmpty().withMessage("Email é obrigatório"),
          body("email").isEmail().withMessage("Email é inválido"),
          body("email").isString().withMessage("Email deve ser uma string"),
        ];
      }
      default: {
        return [];
      }
    }
  };
}

export default new StudentsValidator();
