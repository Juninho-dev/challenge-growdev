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

app.listen(3000, () => console.log("Server is running on port 3000"));
