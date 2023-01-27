import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import notesRoutes from "./routes/notes";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use("/api/notes", notesRoutes);

//handle request without routes defined
app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found!"));
});

//handle error handling for all points
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let erroMsg = "An unknown error occured";

  let statusCode = 500;

  if (isHttpError(error)) {
    statusCode = error.status;
    erroMsg = error.message;
  }
  res.status(statusCode).json({ error: erroMsg });
});

export default app;
