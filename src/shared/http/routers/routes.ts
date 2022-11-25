import { Router } from "express";
import { loginRouter } from "../../../modules/users/routes/login.router";
import { usersRouter } from "../../../modules/users/routes/user.router";

export const router = Router();

router.use("/user", usersRouter);
router.use("/", loginRouter);
