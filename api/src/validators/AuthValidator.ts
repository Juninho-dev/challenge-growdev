import { body } from "express-validator";

type ValidationType = "login" | "register";

class AuthValidator {
  validate = (method: ValidationType) => {
    switch (method) {
      case "login": {
        return [
          body("email").isEmail().withMessage("Email é obrigatório"),
          body("password").notEmpty().withMessage("Senha é obrigatória"),
        ];
      }
      case "register": {
        return [
          body("name").notEmpty().withMessage("Nome é obrigatório"),
          body("email").notEmpty().withMessage("Email é obrigatório"),
          body("email").isEmail().withMessage("Email é inválido"),
          body("password").notEmpty().withMessage("Senha é obrigatória"),
        ];
      }
      default: {
        return [];
      }
    }
  };
}

export default new AuthValidator();
