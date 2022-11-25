import { Request, Response } from "express";
import { LoginUserService } from "../services/LoginUserService";

export class LoginController {
  async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    try {
      const loginUser = new LoginUserService();

      const login = await loginUser.execute({
        email,
        password,
      });
      return res.json(login);
    } catch (error) {
      return res.json(error);
    }
  }
}
