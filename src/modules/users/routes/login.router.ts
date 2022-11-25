import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import { LoginController } from "../controllers/LoginController";

export const loginRouter = Router();
const loginController = new LoginController();

loginRouter.post(
  "/login",
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required().min(8),
    },
  }),
  loginController.create
);
