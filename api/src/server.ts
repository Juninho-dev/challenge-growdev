import cors from "cors";
import express from "express";
import "express-async-errors";

import { errorMiddleware } from "./middleware/errorMiddleware";
import AuthRoutes from "./routes/auth.routes";
import StudentsRoutes from "./routes/students.routes";

const app = express();

app.use(express.json());
app.use(cors());

app.use(AuthRoutes);
app.use(StudentsRoutes);

app.use(errorMiddleware);

if (process.env.NODE_ENV === "test") {
  app.listen(3333, () => {
    console.log("Server started on port 3333");
  });
} else {
  app.listen(3000, () => console.log("Server is running on port 3000"));
}

export default app;
