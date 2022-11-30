import { prismaClient } from "../../../databases/prismaClient";
import { AppError } from "../../../shared/errors/AppError";
import authConfig from "../../../config/auth";
import { sign } from "jsonwebtoken";

interface IRequest {
  email: string;
}

export class SendForgotPasswordEmailService {
  async execute({ email }: IRequest): Promise<void> {
    const user = await prismaClient.user.findUnique({ where: { email } });

    if (!user) throw new AppError("User does not exists");

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    console.log(token);
  }
}
