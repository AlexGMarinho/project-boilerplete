import { NextFunction, Request, Response } from "express";
import { AppError } from "../shared/errors/AppError";
import { verify } from "jsonwebtoken";
import authConfig from "../config/auth";
import { prismaClient } from "../databases/prismaClient";

interface DecodeToken {
  iat: number;
  exp: number;
  sub: string;
}

export async function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers.authorization;

  if (!authHeader) return next(new AppError("JWT Token is missing"));

  const [, token] = authHeader.split(" ");

  try {
    const decodeToken = verify(token, authConfig.jwt.secret) as DecodeToken;

    const user = await prismaClient.user.findUnique({
      where: { id: decodeToken.sub },
    });

    if (!user) return next(new AppError("User not exist"));
    
    req.user = user

    return next()
  } catch (error) {
    return next(new AppError("Invalid JWT Token"));
  }
}
