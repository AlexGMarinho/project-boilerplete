import express, { NextFunction, Request, Response } from "express";
import "dotenv/config";
import { errors } from "celebrate";
import { AppError } from "../errors/AppError";
import { router } from "./routers/routes";

const app = express();

app.use(express.json());
app.use(router);

app.use(errors());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }
  next();
  return res.status(500).json({
    status: "error",
    message: `Internal server error - ${err.message}`,
  });
});

app.listen(3030, () => {
  console.log("http://localhost:3030");
});
