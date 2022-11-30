import { Router } from "express";
import { loginRouter } from "../../../modules/users/services/routes/login.router";
import { usersRouter } from "../../../modules/users/services/routes/user.router";

export const router = Router();

router.use("/user", usersRouter);
router.use("/", loginRouter);
