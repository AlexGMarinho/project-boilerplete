import { prismaClient } from "../../../databases/prismaClient";
import { AppError } from "../../../shared/errors/AppError";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import authConfig from "../../../config/auth";
import { formatUserResponse, UserResponse } from "../../../shared/userHelper";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: UserResponse;
  token: string;
}

export class LoginUserService {
  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await prismaClient.user.findUnique({ where: { email } });

    if (!user) throw new AppError("Email or Password are wrong");

    const isValidPassword = await compare(password, user.password);

    if (!isValidPassword) throw new AppError("Email or Password are wrong");

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return {user: formatUserResponse(user), token};
  }
}
