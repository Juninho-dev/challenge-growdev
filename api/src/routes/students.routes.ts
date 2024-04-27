import { Router } from "express";

import { StudentsController } from "../controllers/StudentsController";
import { authenticateToken } from "../middleware/authenticateToken";
import StudentsValidator from "../validators/StudentsValidator";

const router = Router();
const studentsController = new StudentsController();

router.get(
  "/students",
  StudentsValidator.validate("indexStudent"),
  authenticateToken,
  studentsController.index
);
router.get(
  "/students/:id",
  authenticateToken,
  studentsController.show,
);
router.post(
  "/students",
  StudentsValidator.validate("createStudent"),
  authenticateToken,
  studentsController.create,
);
router.put(
  "/students/:id",
  StudentsValidator.validate("updateStudent"),
  authenticateToken,
  studentsController.update,
);
router.delete("/students/:id", authenticateToken, studentsController.delete);

export default router;
